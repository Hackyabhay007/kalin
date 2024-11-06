import React, { useState, useEffect } from 'react';
import Image from 'next/image';

// Dummy data for images and associated text using Figma images
const imagesData = [
  {
    src: "https://s3-alpha-sig.figma.com/img/6f35/d9a5/662f5dc35a389d69874e98ebe696ee7c?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HHA0YRlWQOB975AxwK52-UW1iyXoBezBQZI2Lb9WLwvL-fu21SdrLJPLai1AIitc78R8u2giclGFA-Kz99C1cM4UG83HKdAvoDf6hcVbVbhPA3yJQVwGgJzoWIDTQ7Pb8DtE4VBXKr6giCHmIFfo791cTljAJBquadJG0fvtVGKgEg~sZjaqUoM1BOhZorA--0Wz~zEbkdV0yKn4vPDWvOgzRP9m480o~7-obP7My~sepGVVUBFECY5iERaL5OU2rhxLncYxcKeWTc6~BA~4tU88tnBVNpF0C5VEGii7Z~mOiToLU9~xHWVdpJ9JvQXRwJul4-VSDhJCQygxddlQxQ__",
    title: "Image 1",
    tagline: "Description for Image 1",
  },
  {
    src: "https://s3-alpha-sig.figma.com/img/cef4/138d/295ab44ab9d3b7554da631a5f0f94c65?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cbT-6zfzkU~DNkM9aTDHHdxUDCFiFNMMl6zzBIF9E877c60BzRc~32i9qO9KZCorEqBFJ-cONszsEEqDF6~rAL-~WTL~9GX1oimkrs-s643cI7X04ZmZvfxOGNPzouEwun-uOLFGroqXAyjZ4-BsF6FsgXodVWUh-GVE6wei59e3kChjLM4hGYQ~u5WAl1SBX5Omxk4862dSisjVXsrkpRK7OlpoMZ0lRsEXjl4WsUAbe62bupbHYmTkoa8~pi42WEiEW0~Z1s9ocnsiGA8x0QIi8GX8zFVPrIUZx1wO~gcpGBRkKgJAorOzalqUzOeQoqhfQYoH8eoirqPKYoeYhw__",
    title: "Image 2",
    tagline: "Description for Image 2",
  },
  {
    src: "https://s3-alpha-sig.figma.com/img/6f35/d9a5/662f5dc35a389d69874e98ebe696ee7c?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HHA0YRlWQOB975AxwK52-UW1iyXoBezBQZI2Lb9WLwvL-fu21SdrLJPLai1AIitc78R8u2giclGFA-Kz99C1cM4UG83HKdAvoDf6hcVbVbhPA3yJQVwGgJzoWIDTQ7Pb8DtE4VBXKr6giCHmIFfo791cTljAJBquadJG0fvtVGKgEg~sZjaqUoM1BOhZorA--0Wz~zEbkdV0yKn4vPDWvOgzRP9m480o~7-obP7My~sepGVVUBFECY5iERaL5OU2rhxLncYxcKeWTc6~BA~4tU88tnBVNpF0C5VEGii7Z~mOiToLU9~xHWVdpJ9JvQXRwJul4-VSDhJCQygxddlQxQ__",
    title: "Image 3",
    tagline: "Description for Image 3",
  },
  // Add more images here as needed
];

function HomeImg() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === imagesData.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Clear interval on unmount
  }, []);

  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === imagesData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imagesData.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative flex flex-col justify-center items-center h-96 md:h-screen overflow-hidden">
      <Image
        src={imagesData[currentIndex].src}
        alt={imagesData[currentIndex].title}
        layout="fill"
        objectFit="cover"
        className="z-0" // Send the image to the background
      />
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center text-white z-10">
        <h2 className="text-4xl md:text-6xl lg:text-7xl">{imagesData[currentIndex].title}</h2>
        <p className="mb-2 text-xl md:text-2xl lg:text-4xl my-5">{imagesData[currentIndex].tagline}</p>
        <button className="bg-black my-5 text-white rounded-none px-6 py-1 md:px-10 md:py-2 hover:bg-white hover:text-black transition duration-300">
          Shop
        </button>
      </div>
      <div className="absolute bottom-5 flex space-x-2 z-10">
        {imagesData.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full cursor-pointer transition-all duration-300 ${
              index === currentIndex ? 'bg-white' : 'bg-gray-400'
            }`}
            onClick={() => setCurrentIndex(index)} // Clickable dots to navigate
          ></div>
        ))}
      </div>
      <button
        className="absolute left-5 top-1/2 transform -translate-y-1/2 text-2xl md:text-3xl backdrop-blur-sm bg-white/10 text-white p-2 rounded-full z-10"
        onClick={prevImage}
      >
        &lt;
      </button>
      <button
        className="absolute right-5 top-1/2 transform -translate-y-1/2 text-2xl md:text-3xl backdrop-blur-sm bg-white/10 text-white p-2 rounded-full z-10"
        onClick={nextImage}
      >
        &gt;
      </button>
    </div>
  );
}

export default HomeImg;
