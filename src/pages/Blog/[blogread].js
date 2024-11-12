import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Nav from '@/component/Nav';
import Footer from '@/component/Footer';
import { Client, Databases } from 'appwrite';
import Loader from '../loader/Loader';

// Appwrite client setup
const client = new Client();
client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const databases = new Databases(client);

const BlogRead = () => {
  const router = useRouter();
  const { blogread } = router.query;
  const [blog, setBlog] = useState(null);
  const [blogData, setBlogData] = useState([]);

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

  useEffect(() => {
    if (blogread && blogData.length > 0) {
      const selectedBlog = blogData.find((b) => b.$id === blogread);
      setBlog(selectedBlog);
    }
  }, [blogread, blogData]);

  if (!blog) {
    return (
      <>
        <Nav />
        <Loader/> 
        <Footer />
      </>
    );
  }

  // Construct the image URL
  const imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID}/files/${blog.image}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;

  return (
    <>
      <Nav />
      <div className="bg-white text-black min-h-screen py-10 px-5 md:px-0">
        {/* Banner image for the blog */}
        <div className="w-full flex justify-center mb-10">
          <Image
            src={imageUrl}
            alt={blog.title}
            width={900}
            height={500}
            className="object-cover w-screen h-96"
          />
        </div>

        {/* Title and First Blog Content */}
        <div className="relative py-5 bg-white text-justify leading-relaxed w-full mx-auto max-w-4xl mt-[-100px] rounded-xl shadow-xl">
          <h1 className="text-center text-3xl font-bold mb-6">{blog.title}</h1>
          <p className="px-10">{blog.content[0]}</p>
          <div className="my-20">
            <Image
              src={imageUrl}
              alt={blog.title}
              width={900}
              height={500}
              className="object-cover w-full h-64 my-3"
            />
          </div>
          {blog.content.slice(1).map((paragraph, index) => (
            <p key={index} className="px-10 mt-16">{paragraph}</p>
          ))}
          <div className='px-10 flex justify-between mt-5 text-gray-500 text-sm'>
            <p>Author: {blog.author}</p>
            <p>Created at: {blog.createdAt.slice(0, 10)}</p> 
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogRead;
