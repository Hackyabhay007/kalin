import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Client, Databases } from 'appwrite';
import Loader from '../loader/Loader';

// Initialize Appwrite client
const client = new Client();
const databases = new Databases(client);

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

function HomeImg() {
  const [imagesData, setImagesData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch data from Appwrite on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await databases.listDocuments(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
          process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_HERO_ID
        );
        const data = response.documents.map((doc) => ({
          src: doc.image,
          title: doc.heading,
          tagline: doc.tagline,
          buttonText: doc.button,
          slug: doc.slug,
        }));
        setImagesData(data);
      } catch (error) {
        if (error.name === 'FetchError' || error.message.includes('Failed to fetch')) {
          console.warn('Network issue: Unable to fetch data. Please check your connection.');
        } else {
          console.error('Error fetching data:', error);
        }
      }
    };
  
    fetchData();
  }, []);
  

  // Image slider effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === imagesData.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [imagesData.length]);

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

  if (imagesData.length === 0) {
    return <Loader/>;
  }

  return (
    <div className="relative flex flex-col justify-center items-center h-96 md:h-screen overflow-hidden">
      <Image
        src={imagesData[currentIndex].src}
        alt={imagesData[currentIndex].title}
        layout="fill"
        objectFit="cover"
        className="z-0"
      />
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center text-white z-10">
        <h2 className="text-4xl md:text-6xl lg:text-7xl">{imagesData[currentIndex].title}</h2>
        <p className="mb-2 text-xl md:text-2xl lg:text-4xl my-5">{imagesData[currentIndex].tagline}</p>
        <button
          className="bg-black my-5 text-white rounded-none px-6 py-1 md:px-10 md:py-2 hover:bg-white hover:text-black transition duration-300"
          onClick={() => (window.location.href = `${imagesData[currentIndex].slug}`)}
        >
          {imagesData[currentIndex].buttonText}
        </button>
      </div>
      <div className="absolute bottom-5 flex space-x-2 z-10">
        {imagesData.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full cursor-pointer transition-all duration-300 ${
              index === currentIndex ? 'bg-white' : 'bg-gray-400'
            }`}
            onClick={() => setCurrentIndex(index)}
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
