import Link from 'next/link';
import React from 'react';

function Story() {
  return (
    <div className="flex flex-col md:flex-row md:mx-32 py-10">
      {/* Left Image for Desktop */}
      <div className="hidden md:w-1/6 md:block">
        <img 
          src="https://s3-alpha-sig.figma.com/img/f06c/8d02/1e48bafc4010b3ae7e7159bee626fa5d?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bg5PtBehxVa21EW48REEDgYOav6LRgYnuMAUqzaRxQDlS~d~zKXj6S9wAO3~TeOF3cNOMrvjJ-kB3CxE264dxiacq0ngjucGHTNNypmmfAEQ5QZ1jNQoV5rrY1vQBGL99f9dAsignX1xv~SLLCTJp7r3vHDiR~qJf3ab8BBULKFfpxf9~uRQYSJR7CtNVm-FReiRfQiU4CTIm-FFpsiqDv1vUB5dvyNT2pBHFFRhmsRMSamZkfepjTLeJZDV4BmXUiG45YrfZwXo6-7K9~o76KnrnZrXzXUipfeBh~JcHJdgRQCIvevPej-8q7-s9uU5TtiacvuJVQfQDw3bAiODgg__" 
          alt="Story"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Full-width Image for Mobile */}
      <div className="md:hidden w-screen text-center h-auto relative">
        <img 
          src="https://s3-alpha-sig.figma.com/img/f06c/8d02/1e48bafc4010b3ae7e7159bee626fa5d?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bg5PtBehxVa21EW48REEDgYOav6LRgYnuMAUqzaRxQDlS~d~zKXj6S9wAO3~TeOF3cNOMrvjJ-kB3CxE264dxiacq0ngjucGHTNNypmmfAEQ5QZ1jNQoV5rrY1vQBGL99f9dAsignX1xv~SLLCTJp7r3vHDiR~qJf3ab8BBULKFfpxf9~uRQYSJR7CtNVm-FReiRfQiU4CTIm-FFpsiqDv1vUB5dvyNT2pBHFFRhmsRMSamZkfepjTLeJZDV4BmXUiG45YrfZwXo6-7K9~o76KnrnZrXzXUipfeBh~JcHJdgRQCIvevPej-8q7-s9uU5TtiacvuJVQfQDw3bAiODgg__" 
          alt="Story"
          className="w-full h-full object-cover"
        />
        {/* Overlay Text for Mobile */}
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-40 p-2">
          <p className="text-white font-light">
            Sanurri&apos;s artisan story is one of tradition, craftsmanship, and a deep connection to the earth through the art of rug making. 
            Hailing from a small village known for its weaving heritage, Sanurri learned the craft from generations of artisans before him.
          </p>
          {/* Read More Button */}
         <Link href="/Story"><button className="bg-white text-black w-32 rounded  py-2 px-4 mt-4  ">
            Read More
          </button></Link>
        </div>
      </div>

      {/* Right Story Content for Desktop */}
      <div className="hidden md:flex md:w-5/6 flex-col items-center justify-between px-5">
        {/* Story Text */}
        <div className="flex flex-col justify-between h-full">
          <h2 className="text-black text-center text-xl font-semibold mb-5">Our Story</h2>
          <p className="text-black font-semibold text-center">
            Sanurri&apos;s artisan story is one of tradition, craftsmanship, and a deep connection to the earth through the art of rug making. 
            Hailing from a small village known for its weaving heritage, Sanurri learned the craft from generations of artisans before him. 
            His rugs are not just products; they are stories woven into every thread. Each piece is carefully hand-loomed using natural 
            fibers like wool and cotton, dyed with plant-based, eco-friendly dyes. Inspired by the landscapes of his homeland, Sanurri 
            integrates earthy tones and intricate geometric patterns that reflect both his cultural roots and the natural beauty surrounding
            his village. Through his rugs, Sanurri preserves ancient techniques while adapting to contemporary designs, making each piece
            a bridge between the past and the present. Every rug tells a story of patience, dedication, and the timeless beauty of 
            handcrafted artistry.
          </p>
        </div>

        {/* Read More Button */}
      <Link href="/Story"><button className="bg-black text-white w-36 rounded border hover:border-black py-2 px-4 mt-4 hover:bg-white hover:text-black ">
          Read More
        </button></Link>
      </div>
    </div>
  );
}

export default Story;
