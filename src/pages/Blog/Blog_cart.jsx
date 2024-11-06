import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Dummy data for blogs
const blogData = Array(15).fill({
  imageSrc: "https://s3-alpha-sig.figma.com/img/089d/d7f9/708ba25dce40827d6768cb27c3af603a?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=pfD2Pwg-XwAoofynw9thskTNLYbJufpn4yqX~bAzFzyZMvxfnLEb3BUEn5zlZrTFcbaCMeNX27v9ermEH~5ldrG4OPm5wbHCCJhQyrDyriGPSjPmy18sPcTQslMJ8QNVx6vvAj~ZY42Ei0lmtMCpsCMt-ORxICi3vILZbh2cI-5wgCjyta8Bm~E1lKjmWbN7iEo6Tgsfop-BR11fGfDDhQJsFJTT8QHUy~GYY1LW5V0hCRgbzTpXdEpF-tCCd9V0pNdHGcizDtNSO13d-ISIzQrMtLk6Gn0FHF9g~PgL7g0oSw18U8nMRQlyjBA3CcxMAG-yu~eHvBXA-xM3LlcHRA__",
  title: "Our Blog",
  description: "This is a brief description of the blog post. It provides insight into the content in 15-25 words.",
});

function Blog_Cart() {
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 9;
  const totalPages = Math.ceil(blogData.length / blogsPerPage);

  // Get blogs for the current page
  const currentBlogs = blogData.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage
  );

  return (
    <div className="bg-white text-black min-h-screen py-10">
      <h1 className="text-center text-2xl font-bold mb-10">Our Blog </h1>

      {/* Horizontal Image */}
      <div className="w-full flex justify-center md:h-96 mb-20  md:px-24 ">
        <Image
          src="https://s3-alpha-sig.figma.com/img/089d/d7f9/708ba25dce40827d6768cb27c3af603a?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=pfD2Pwg-XwAoofynw9thskTNLYbJufpn4yqX~bAzFzyZMvxfnLEb3BUEn5zlZrTFcbaCMeNX27v9ermEH~5ldrG4OPm5wbHCCJhQyrDyriGPSjPmy18sPcTQslMJ8QNVx6vvAj~ZY42Ei0lmtMCpsCMt-ORxICi3vILZbh2cI-5wgCjyta8Bm~E1lKjmWbN7iEo6Tgsfop-BR11fGfDDhQJsFJTT8QHUy~GYY1LW5V0hCRgbzTpXdEpF-tCCd9V0pNdHGcizDtNSO13d-ISIzQrMtLk6Gn0FHF9g~PgL7g0oSw18U8nMRQlyjBA3CcxMAG-yu~eHvBXA-xM3LlcHRA__"
          alt="Our Blog Banner"
          width={900}
          height={200}
          className="w-full object-cover"
        />
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-20 px-5 md:px-20">
        {currentBlogs.map((blog, index) => (
          <div key={index} className="no-border bg-transparent p-4">
            <Image
              src={blog.imageSrc}
              alt={blog.title}
              width={500}
              height={300}
              layout="responsive"
              className="object-cover"
            />
            <h2 className="text-lg font-semibold mt-4">{blog.title}</h2>
            <p className="text-sm mt-2">{blog.description}</p>
            <Link
              href={`/Blog/${index + 1}`} // Placeholder for individual blog post link
              className="text-sm underline mt-2 block"
            >
              Read more
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-10 space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-lg font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Blog_Cart;
