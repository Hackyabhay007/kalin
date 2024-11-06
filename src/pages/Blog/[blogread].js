import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Nav from '@/component/Nav';
import Footer from '@/component/Footer';
import blogData from '../../../public/local/Blogdata/blogData';

const BlogRead = () => {
  const router = useRouter();
  const { blogread } = router.query;
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    if (blogread) {
      // Find the specific blog post based on blogread ID
      const selectedBlog = blogData.find((b) => b.id === parseInt(blogread));
      setBlog(selectedBlog);
    }
  }, [blogread]);

  if (!blog) {
    return (
      <>
        <Nav />
        <p className="animate-spin m-80 w-20 h-20 border-t-8 rounded-full border-black"></p>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Nav />
      <div className="bg-white text-black min-h-screen py-10 px-5 md:px-0">
        <h1 className="text-center text-3xl font-bold mb-6">{blog.title}</h1>

        <div className="w-full flex justify-center mb-10">
          <Image
            src={blog.imageSrc}
            alt={blog.title}
            width={900}
            height={500}
            className="object-cover w-screen h-96"
          />
        </div>

        {/* Blog Content with Background */}
        <div className="relative py-5  bg-white  text-justify leading-relaxed  w-full mx-auto max-w-4xl mt-[-100px] rounded-xl shadow-xl">
         <h1 className='text-center my-10 font-bold'>{blog.title}</h1>
          <p className='px-10'>{blog.about}</p>
          <div className="my-20 ">
            <Image
              src={blog.imageSrc}
              alt={blog.title}
              width={900}
              height={500}
              className="object-cover w-full h-64 my-3"
            />
          </div>
          <p className='px-10'>{blog.content}</p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogRead;
