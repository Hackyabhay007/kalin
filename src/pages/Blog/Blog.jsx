import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Client, Databases } from 'appwrite';

const client = new Client();
client.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT).setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);
const databases = new Databases(client);

function Blog() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await databases.listDocuments(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
          process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BLOG_ID
        );
        setBlogs(response.documents);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="py-10">
      <h2 className="text-center text-2xl font-semibold mb-5">Blog</h2>
      <div className="flex flex-col md:flex-row md:justify-center md:space-x-20 px-4">
        {blogs.map((blog) => {
          const imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID}/files/${blog.image}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;

          return (
            <div
              key={blog.$id}
              className="flex flex-col bg-rose-400 w-full md:w-72 pt-5 px-5 mb-5 md:mb-0"
            >
              {/* Card Image */}
              <Image
                src={imageUrl}
                alt={blog.title}
                width={500}
                height={300}
                className="rounded object-cover h-1/2 w-full"
              />
              {/* Card Content */}
              <div className="flex flex-col items-center pt-3">
                <h3 className="text-white font-semibold text-lg mb-0">{blog.title}</h3>
                <p className="text-white text-center mb-2">
                  {blog.content[0] ? blog.content[0].split(" ").slice(0, 10).join(" ") : "No content available"}...
                </p>
                {/* Read More Button */}
                <Link href={`/Blog/${blog.$id}`}>
                  <p className="bg-white text-black rounded mb-3 py-2 px-4">
                    Read More
                  </p>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      {/* Link to Blog Page */}
      {blogs.length >= 3 && (
        <div className="flex justify-center mt-10">
          <Link href="/Blog">
            <p className="bg-black text-white rounded py-2 px-6">Read More</p>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Blog;
