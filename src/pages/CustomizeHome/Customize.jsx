import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

function Customize() {
  // Array of images to be displayed
  const images = [
    {
      src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBkvg6qEw9h3JegDFMgzT69s7I60tja0FVZnsiPLlObBtTJHdwBxsAnGlUfifWkXknVSU&usqp=CAU',

      alt: 'Customization Option 1',
    },
    {
      src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBkvg6qEw9h3JegDFMgzT69s7I60tja0FVZnsiPLlObBtTJHdwBxsAnGlUfifWkXknVSU&usqp=CAU',

      alt: 'Customization Option 2',
    },
    {
      src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBkvg6qEw9h3JegDFMgzT69s7I60tja0FVZnsiPLlObBtTJHdwBxsAnGlUfifWkXknVSU&usqp=CAU',

      alt: 'Customization Option 3',
    },
    {
     src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBkvg6qEw9h3JegDFMgzT69s7I60tja0FVZnsiPLlObBtTJHdwBxsAnGlUfifWkXknVSU&usqp=CAU',
      alt: 'Customization Option 4',
    },
    {
      src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBkvg6qEw9h3JegDFMgzT69s7I60tja0FVZnsiPLlObBtTJHdwBxsAnGlUfifWkXknVSU&usqp=CAU',
      alt: 'Customization Option 5',
      }
  ];

  return (
    <div className="bg-gray-300 py-10 px-4 md:px-14">
      <h2 className="text-center text-2xl font-bold mb-5">Customize</h2>
      <div className="flex gap-0 md:gap-5 flex-wrap md:flex-nowrap justify-center  items-center">
        {images.map((image, index) => (
          <div key={index} className="md:w-1/4 w-1/3 p-2">
            <Image 
              src={image.src}
              alt={image.alt}
              width={500}  // Set appropriate width
              height={300}
              className="w-fit md:h-64 h-32  object-cover rounded-none"
            />
          </div>
        ))}
      </div>
      {/* Customize Now Button */}
      <div className="flex justify-center mt-5">
       <Link href="/customize"><button className="bg-black text-white rounded-lg py-2 px-4 hover:bg-gray-900">
          Customize Now
        </button></Link>
      </div>
    </div>
  );
}

export default Customize;
