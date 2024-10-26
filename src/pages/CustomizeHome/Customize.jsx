import React from 'react';

function Customize() {
  // Array of images to be displayed
  const images = [
    {
        src: 'https://s3-alpha-sig.figma.com/img/f61b/1e12/e65ab99cb128801d22d9cf1b6b9ed22e?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=L6nOMkc~pgP5TXCdS99rvAlIUQWCULvJxMKLVxNWA2UIE7t~7FNmxvePwBw-9DhOIsflElBhsmrQ6F--wMLTI3HJjkwU1iv7SN1W1~MSm7fSGiwT2RFes1wnnvWUPuo4cM1V~Hs~5K1lpVUF-acNdAGwlRPArfVnVqWRz07Dy7hgtF3oyXQ6l1kUe-Ptvxn3I3nEPsVcgzl6Ytbl35IdCkKvztw2FpvPpDb3uU4PH~TJTaEXa9Nszj5K9zQ-VzJpwr26rNW5aMhw6O8upqG9~lQ2Tbn~1PnNqXFxi2RFBeXNLZDJHqK5eYp4AJJwT4f--INByAluY5M3IiE0u00xzg__', // Replace with your image URL

      alt: 'Customization Option 1',
    },
    {
        src: 'https://s3-alpha-sig.figma.com/img/f61b/1e12/e65ab99cb128801d22d9cf1b6b9ed22e?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=L6nOMkc~pgP5TXCdS99rvAlIUQWCULvJxMKLVxNWA2UIE7t~7FNmxvePwBw-9DhOIsflElBhsmrQ6F--wMLTI3HJjkwU1iv7SN1W1~MSm7fSGiwT2RFes1wnnvWUPuo4cM1V~Hs~5K1lpVUF-acNdAGwlRPArfVnVqWRz07Dy7hgtF3oyXQ6l1kUe-Ptvxn3I3nEPsVcgzl6Ytbl35IdCkKvztw2FpvPpDb3uU4PH~TJTaEXa9Nszj5K9zQ-VzJpwr26rNW5aMhw6O8upqG9~lQ2Tbn~1PnNqXFxi2RFBeXNLZDJHqK5eYp4AJJwT4f--INByAluY5M3IiE0u00xzg__', // Replace with your image URL

      alt: 'Customization Option 2',
    },
    {
        src: 'https://s3-alpha-sig.figma.com/img/f61b/1e12/e65ab99cb128801d22d9cf1b6b9ed22e?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=L6nOMkc~pgP5TXCdS99rvAlIUQWCULvJxMKLVxNWA2UIE7t~7FNmxvePwBw-9DhOIsflElBhsmrQ6F--wMLTI3HJjkwU1iv7SN1W1~MSm7fSGiwT2RFes1wnnvWUPuo4cM1V~Hs~5K1lpVUF-acNdAGwlRPArfVnVqWRz07Dy7hgtF3oyXQ6l1kUe-Ptvxn3I3nEPsVcgzl6Ytbl35IdCkKvztw2FpvPpDb3uU4PH~TJTaEXa9Nszj5K9zQ-VzJpwr26rNW5aMhw6O8upqG9~lQ2Tbn~1PnNqXFxi2RFBeXNLZDJHqK5eYp4AJJwT4f--INByAluY5M3IiE0u00xzg__', // Replace with your image URL

      alt: 'Customization Option 3',
    },
    {
     src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBkvg6qEw9h3JegDFMgzT69s7I60tja0FVZnsiPLlObBtTJHdwBxsAnGlUfifWkXknVSU&usqp=CAU',
      alt: 'Customization Option 4',
    },
    {
        src: 'https://s3-alpha-sig.figma.com/img/f61b/1e12/e65ab99cb128801d22d9cf1b6b9ed22e?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=L6nOMkc~pgP5TXCdS99rvAlIUQWCULvJxMKLVxNWA2UIE7t~7FNmxvePwBw-9DhOIsflElBhsmrQ6F--wMLTI3HJjkwU1iv7SN1W1~MSm7fSGiwT2RFes1wnnvWUPuo4cM1V~Hs~5K1lpVUF-acNdAGwlRPArfVnVqWRz07Dy7hgtF3oyXQ6l1kUe-Ptvxn3I3nEPsVcgzl6Ytbl35IdCkKvztw2FpvPpDb3uU4PH~TJTaEXa9Nszj5K9zQ-VzJpwr26rNW5aMhw6O8upqG9~lQ2Tbn~1PnNqXFxi2RFBeXNLZDJHqK5eYp4AJJwT4f--INByAluY5M3IiE0u00xzg__', // Replace with your image URL
        alt: 'Customization Option 5',
      }
  ];

  return (
    <div className="bg-gray-300 py-10 px-4 md:px-14">
      <h2 className="text-center text-2xl font-bold mb-5">Customize</h2>
      <div className="flex gap-0 md:gap-5 flex-wrap md:flex-nowrap justify-center  items-center">
        {images.map((image, index) => (
          <div key={index} className="md:w-1/4 w-1/3 p-2">
            <img 
              src={image.src}
              alt={image.alt}
              className="w-fit md:h-64 h-32  object-cover rounded-none"
            />
          </div>
        ))}
      </div>
      {/* Customize Now Button */}
      <div className="flex justify-center mt-5">
        <button className="bg-black text-white rounded-lg py-2 px-4 hover:bg-gray-900">
          Customize Now
        </button>
      </div>
    </div>
  );
}

export default Customize;
