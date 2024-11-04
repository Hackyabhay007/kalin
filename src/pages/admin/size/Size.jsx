import React, { useState, useEffect } from 'react';
import { Client, Databases } from 'appwrite';

// Initialize Appwrite client
const client = new Client();
const databases = new Databases(client);

client
  .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite endpoint
  .setProject('67269d9a0023bf3ae88a'); // Your project ID

function Size() {
  const [sizes, setSizes] = useState([]); // State for sizes
  const [sizeInput, setSizeInput] = useState({ width: '', height: '' }); // Size inputs
  const [isEditing, setIsEditing] = useState(false); // Track if we're in edit mode
  const [currentSizeId, setCurrentSizeId] = useState(null); // Track the ID of the size being edited

  // Fetch sizes when the component mounts
  useEffect(() => {
    const fetchSizes = async () => {
      try {
        const response = await databases.listDocuments(
          '67269e330009154de759', // Database ID
          '672894d500200dd978d1'  // Collection ID for sizes
        );
        setSizes(response.documents || []); // Update the state with fetched sizes
      } catch (error) {
        console.error('Error fetching sizes:', error);
      }
    };

    // Only fetch if sizes array is empty
    if (sizes.length === 0) {
      fetchSizes();
    }
  }, [sizes.length]); // Dependency on sizes.length

  // Function to add a new size
  const addSize = async () => {
    const { width, height } = sizeInput;
    if (width.toString().trim() && height.toString().trim()) {
      try {
        const newSize = await databases.createDocument(
          '67269e330009154de759', // Database ID
          '672894d500200dd978d1', // Collection ID for sizes
          'unique()', // Generate a unique ID
          { width: parseInt(width), height: parseInt(height) } // Ensure these are integers
        );

        // Update the local state
        setSizes((prevSizes) => [...prevSizes, newSize]);
        setSizeInput({ width: '', height: '' }); // Reset input fields
      } catch (err) {
        console.error('Error adding size:', err);
      }
    }
  };

  // Function to edit an existing size
  const editSize = async () => {
    const { width, height } = sizeInput;
    if (width.toString().trim() && height.toString().trim() && currentSizeId) {
      try {
        await databases.updateDocument(
          '67269e330009154de759', // Database ID
          '672894d500200dd978d1', // Collection ID for sizes
          currentSizeId, // ID of the size to edit
          { width: parseInt(width), height: parseInt(height) } // Ensure these are integers
        );

        // Update the local state
        setSizes((prevSizes) => 
          prevSizes.map(size => 
            size.$id === currentSizeId ? { ...size, width: parseInt(width), height: parseInt(height) } : size
          )
        );

        // Reset form
        setSizeInput({ width: '', height: '' });
        setIsEditing(false);
        setCurrentSizeId(null);
      } catch (err) {
        console.error('Error editing size:', err);
      }
    }
  };

  // Function to delete a size
  const deleteSize = async (id) => {
    try {
      await databases.deleteDocument('67269e330009154de759', '672894d500200dd978d1', id);
      setSizes((prevSizes) => prevSizes.filter(size => size.$id !== id)); // Remove deleted size from state
    } catch (err) {
      console.error('Error deleting size:', err);
    }
  };

  // Function to handle edit button click
  const handleEditClick = (size) => {
    setSizeInput({ width: size.width, height: size.height });
    setIsEditing(true);
    setCurrentSizeId(size.$id); // Set the ID for the size being edited
  };

  return (
    <div className="p-4 bg-white border border-black rounded-sm">
      <h1 className="text-xl mb-4">Manage Sizes</h1>
      
      <div className="mb-4 flex items-center">
        <input
          type="number"
          placeholder="Width"
          value={sizeInput.width}
          onChange={(e) => setSizeInput({ ...sizeInput, width: e.target.value })}
          className="border border-black rounded-sm p-2 mr-2"
        />
        <span className="mr-2">x</span>
        <input
          type="number"
          placeholder="Height"
          value={sizeInput.height}
          onChange={(e) => setSizeInput({ ...sizeInput, height: e.target.value })}
          className="border border-black rounded-sm p-2 mr-2"
        />
        <button
          onClick={isEditing ? editSize : addSize}
          className="bg-blue-500 text-white px-4 py-2 rounded-sm"
        >
          {isEditing ? 'Update Size' : 'Add Size'}
        </button>
      </div>

      <table className="min-w-full border-collapse border border-black">
        <thead>
          <tr>
            <th className="border border-black p-2">Size (Width x Height)</th>
            <th className="border border-black p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sizes && sizes.length > 0 ? (
            sizes.map(size => (
              <tr key={size.$id}>
                <td className="border border-black p-2">{`${size.width} x ${size.height}`}</td>
                <td className="border border-black p-2">
                  <button 
                    onClick={() => handleEditClick(size)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded-sm mr-2"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => deleteSize(size.$id)}
                    className="bg-red-500 text-white px-2 py-1 rounded-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="border border-black p-2 text-center">No sizes available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Size;
