import React, { useState, useEffect } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useRouter } from 'next/router';
import { Client, Databases, Storage } from 'appwrite';
import { Link } from '@tiptap/extension-link'; // For adding links
import { TextStyle } from '@tiptap/extension-text-style'; // For text styles like bold, thin, semibold
import { BulletList } from '@tiptap/extension-bullet-list'; // For unordered lists
import { ListItem } from '@tiptap/extension-list-item'; // For list items

const Blog = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [author, setAuthor] = useState('');
  const [status, setStatus] = useState('');
  const [contentBlocks, setContentBlocks] = useState([]);
  const [newPoint, setNewPoint] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [isListComplete, setIsListComplete] = useState(false);
  const router = useRouter();

  // Initialize Appwrite Client and Services
  const client = new Client();
  const databases = new Databases(client);
  const storage = new Storage(client);

  client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

  useEffect(() => {
    setIsClient(true); // Only run the editor on the client-side
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit, // StarterKit includes essential text editing features like paragraphs, bold, italic, etc.
      Link, // Allow for adding links to content
      TextStyle, // For text styling like bold, semibold, etc.
      BulletList, // For unordered lists
      ListItem, // For list items
    ],
    content: '',
    onUpdate: ({ editor }) => {
      setContentBlocks((prevBlocks) => {
        const updatedBlocks = [...prevBlocks];
        updatedBlocks[updatedBlocks.length - 1] = {
          id: updatedBlocks[updatedBlocks.length - 1]?.id,
          content: editor.getJSON(), // Store the editor content as JSON
        };
        return updatedBlocks;
      });
    },
    immediatelyRender: false, // Prevent SSR mismatch
  });

  const handleSave = async () => {
    if (!title || !coverImage || !author) {
      setStatus('Please fill in all fields.');
      return;
    }
  
    try {
      // Upload cover image to Appwrite storage
      const file = await storage.createFile(
        process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID,
        'unique()', // Generate unique file ID
        coverImage
      );
  
      // Process content blocks and prepare content array for Appwrite
      const contentArray = contentBlocks.map((block) => {
        if (block.type === 'text') {
          return block.content.toString(); // Ensure text is a string
        }
        if (block.type === 'list') {
          return JSON.stringify(block.content); // Convert list to JSON string
        }
        return ''; // Fallback if content type is unknown
      });
  
      // Check and truncate contentArray items to 10,000 characters if needed
      const truncatedContentArray = contentArray.map((content) =>
        content.length > 10000 ? content.slice(0, 10000) : content
      );
  
      // Log to verify the final content array structure
      console.log('Truncated Content Array:', truncatedContentArray);
  
      // Create the document data, including the structured content array
      const documentData = {
        title,
        image: file.$id, // Reference cover image ID
        content: truncatedContentArray, // Save content array with truncated strings
        author,
        createdAt: new Date(),
        list: [
          JSON.stringify({
            author,
            createdAt: new Date().toISOString(),
          }),
        ],
      };
  
      // Create blog document in Appwrite
      await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BLOG_ID,
        'unique()', // Generate unique document ID
        documentData
      );
  
      setStatus('Blog post saved successfully!');
      router.push('/admin/blog');
    } catch (error) {
      setStatus(`Error saving post: ${error.message}`);
      console.error('Error saving content:', error);
    }
  };


  // Function to handle adding a new content block (paragraph, list, etc.)
  const handleAddContentBlock = (type) => {
    setContentBlocks((prevBlocks) => [
      ...prevBlocks,
      {
        id: new Date().getTime(),
        type,
        content: '', // For text blocks, initially empty content
      },
    ]);
  };

  // Function to handle removing content block
  const handleRemoveContentBlock = (id) => {
    setContentBlocks((prevBlocks) => prevBlocks.filter((block) => block.id !== id));
  };

  // Function to handle adding points to the unordered list
  const handleAddPointToList = (blockId) => {
    if (newPoint.trim()) {
      setContentBlocks((prevBlocks) =>
        prevBlocks.map((block) => {
          if (block.id === blockId && block.type === 'list') {
            return {
              ...block,
              content: [...block.content, newPoint.trim()],
            };
          }
          return block;
        })
      );
      setNewPoint(''); // Clear input after adding the point
    }
  };

  // Function to mark list as complete
  const handleListComplete = () => {
    setIsListComplete(true);
  };

  const renderContentBlocks = () => {
    return contentBlocks.map((block) => {
      if (block.type === 'text') {
        return (
          <div key={block.id} className="mb-4">
            <textarea
              value={block.content}
              onChange={(e) => {
                const updatedContent = e.target.value;
                setContentBlocks((prevBlocks) =>
                  prevBlocks.map((prevBlock) =>
                    prevBlock.id === block.id
                      ? { ...prevBlock, content: updatedContent }
                      : prevBlock
                  )
                );
              }}
              placeholder="Add your content here..."
              className="block w-full p-4 text-md border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => handleRemoveContentBlock(block.id)}
              className="mt-2 bg-red-500 text-white py-1 px-4 rounded-none hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        );
      }
      if (block.type === 'list') {
        return (
          <div key={block.id} className="mb-4">
            <button
              onClick={() => editor.commands.toggleBulletList()}
              className="bg-blue-500 text-white py-2 px-4 rounded-none hover:bg-blue-600"
            >
              Add Unordered List
            </button>

            {/* Render existing points in the unordered list */}
            <ul className="list-disc pl-4">
              {block.content &&
                block.content.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
            </ul>

            {/* Input field to add a new point */}
            <input
              type="text"
              value={newPoint}
              onChange={(e) => setNewPoint(e.target.value)}
              placeholder="Add a point"
              className="block w-full p-2 border border-gray-300 rounded-md mt-2"
            />
            <button
              onClick={() => handleAddPointToList(block.id)}
              className="mt-2 bg-yellow-500 text-white py-2 px-4 rounded-none hover:bg-yellow-600"
            >
              Add Point
            </button>

            {/* Button to mark the list as complete */}
            {!isListComplete && (
              <button
                onClick={handleListComplete}
                className="mt-2 bg-green-500 text-white py-2 px-4 rounded-none hover:bg-green-600"
              >
                List Complete
              </button>
            )}

            <button
              onClick={() => handleRemoveContentBlock(block.id)}
              className="mt-2 bg-red-500 text-white py-1 px-4 rounded-none hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        );
      }
      if (block.type === 'image') {
        return (
          <div key={block.id} className="mb-4">
            <input
              type="file"
              onChange={(e) => setCoverImage(e.target.files[0])}
              className="input-cover-image block w-full mt-2 text-sm text-gray-900 border border-gray-300 rounded-md"
            />
            <button
              onClick={() => handleRemoveContentBlock(block.id)}
              className="mt-2 bg-red-500 text-white py-1 px-4 rounded-none hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        );
      }
    });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-xl font-semibold mb-4">Create Blog Post</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter blog title"
        className="block w-full p-4 text-md border border-gray-300 rounded-md mb-4"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter blog description"
        className="block w-full p-4 text-md border border-gray-300 rounded-md mb-4"
      />

      <div className="mb-4">
        <label className="block mb-2">Cover Image</label>
        <input
          type="file"
          onChange={(e) => setCoverImage(e.target.files[0])}
          className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Enter author name"
          className="block w-full p-4 text-md border border-gray-300 rounded-md mb-4"
        />
      </div>

      <div className="content-blocks">
        {renderContentBlocks()}
      </div>

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => handleAddContentBlock('text')}
          className="bg-gray-500 text-white py-2 px-4 rounded-none hover:bg-gray-600"
        >
          Add Text
        </button>
        <button
          onClick={() => handleAddContentBlock('list')}
          className="bg-blue-500 text-white py-2 px-4 rounded-none hover:bg-blue-600"
        >
          Add Unordered List
        </button>
      </div>

      <div className="mt-4">
        <button
          onClick={handleSave}
          className="bg-green-500 text-white py-2 px-4 rounded-none hover:bg-green-600"
        >
          Save Blog
        </button>
      </div>
      <div>{status && <p>{status}</p>}</div>
    </div>
  );
};

export default Blog;
