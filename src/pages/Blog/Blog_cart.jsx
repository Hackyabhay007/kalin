import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Client, Databases } from 'appwrite';

// Appwrite client setup
const client = new Client();
client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const databases = new Databases(client);

function Blog_Cart() {
  const [blogData, setBlogData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 9;
  
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BLOG_ID
      );
      setBlogData(response.documents);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  // Paginate blogs
  const totalPages = Math.ceil(blogData.length / blogsPerPage);
  const currentBlogs = blogData.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage
  );

  const truncateDescription = (contentArray) => {
    if (!contentArray || contentArray.length === 0) return "";
    return contentArray[0].split(' ').slice(0, 30).join(' ') + '...';
  };

  return (
    <div className="bg-white text-black min-h-screen py-10">
      <h1 className="text-center text-2xl font-bold mb-10">Our Blog</h1>

      {/* Horizontal Image */}
      <div className="w-full flex justify-center md:h-96 mb-20 md:px-24">
        <Image
          src="/local/images/blog_home.jpeg"
          alt="Our Blog Banner"
          width={900}
          height={200}
          className="w-full object-cover"
        />
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-20 px-5 md:px-20">
        {currentBlogs.map((blog) => {
          const imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID}/files/${blog.image}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;
          return (
            <div key={blog.$id} className="no-border bg-transparent p-4">
              <Link href={`/Blog/${blog.$id}`} >
              <Image
                src={imageUrl}
                alt={blog.title}
                width={500}
                height={300}
                layout="responsive"
                className="object-cover"
              />
              
              <p className="text-sm mt-2">{truncateDescription(blog.content)}</p>
              
              <p className="text-sm underline mt-2 block">
              Read more
              </p>
                
              </Link>
            </div>
          );
        })}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-10 space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 hover:bg-black hover:text-white border border-black"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className=" border font-semibold border-black py-2 px-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          className="px-4 py-2  hover:bg-black hover:text-white border border-black"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Blog_Cart;
