import React from 'react';
import Image from 'next/image';

function StoryView() {
  return (
    <div className="bg-white text-black  ">
      {/* Our Story Header */}
      <h1 className="text-lg font-bold text-center mb-4">Our Story</h1>
      
      {/* Image Section */}
      <div className="flex justify-center mb-4">
        <Image
          src="/local/images/story_home.jpg" // Replace with your image path
          alt="Our Story"
          width={1000} // Adjust width as needed
          height={400} // Adjust height as needed
          className="w-screen" // Full width
        />
      </div>

      {/* Subheading */}
      <h2 className="text-xl font-semibold text-center mb-4">A Work of Art Made by 180 Hands</h2>

      {/* Description Paragraph */}
      <p className="text-center mb-8 px-4 leading-relaxed">
        Sannuri Rugs is a trademark of quality and design that is renowned across the world. Bringing together the 2500 years-old weaving tradition with state-of-the-art attention to sustainability and design, it is the original Indian rug, made contemporary.
      </p>

      {/* Four Square Images Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-5 mb-8">
        <div>
          <Image
            src="/local/images/man_carpet.jpg" // Replace with your image path
            alt="Square Image 1"
            width={400} // Adjust width as needed
            height={400} // Adjust height as needed
            className="w-full h-56 object-cover"
          />
        </div>
        <div>
          <Image
            src="/local/images/story_sub2.jpg" // Replace with your image path
            alt="Square Image 2"
            width={400} // Adjust width as needed
            height={400} // Adjust height as needed
            className="w-full h-56 object-cover"
          />
        </div>
        <div>
          <Image
            src="/local/images/story_sub3.jpg" // Replace with your image path
            alt="Square Image 3"
            width={400} // Adjust width as needed
            height={400} // Adjust height as needed
            className="w-full h-56 object-cover"
          />
        </div>
        <div>
          <Image
            src="/local/images/story_sub4.jpg" // Replace with your image path
            alt="Square Image 4"
            width={400} // Adjust width as needed
            height={400} // Adjust height as needed
            className="w-full h-56 object-cover"
          />
        </div>
      </div>

      {/* Detailed Paragraph */}
      <p className="text-center mb-8 px-4 leading-relaxed">
        In the 16th century, artisans working in the Jaipur area adopted Persian weaving techniques and reinterpreted them according to their own creativity. A unique style of carpet weaving was born. Today we follow the same virtuous procedure to make our rugs.
      </p>

      {/* Carding & Spinning Section */}
      <div className='px-10 flex-col space-y-20'>
      <div className="flex flex-col md:flex-row-reverse items-center mb-8 px-5">
        <div className="md:w-1/3 md:pr-4 mb-4 md:mb-0">
          <Image
            src="/local/images/carding.png" // Replace with your image path
            alt="Carding & Spinning"
            width={400}
            height={400}
            className="w-full h-56 object-cover"
          />
        </div>
        <div className="md:w-2/3 text-center px-10">
          <h3 className="text-lg font-semibold mb-2">Carding & Spinning</h3>
          <p className="leading-relaxed">
            Our carefully selected wool becomes yarn in the hands of the Katwaris, artisans that layer its strands together, remove dirt and knots, and finally channel centuries of Indian tradition on a charka, a spinning wheel.
          </p>
        </div>
      </div>
       
      <div className="flex flex-col md:flex-row items-center mb-8 px-5">
        <div className="md:w-1/3 md:pr-4 mb-4 md:mb-0">
          <Image
            src="/local/images/dying.png" // Replace with your image path
            alt="Carding & Spinning"
            width={400}
            height={400}
            className="w-full h-56 object-cover"
          />
        </div>
        <div className="md:w-2/3 text-center px-10">
          <h3 className="text-lg font-semibold mb-2">Dying</h3>
          <p className="leading-relaxed">
            Our carefully selected wool becomes yarn in the hands of the Katwaris, artisans that layer its strands together, remove dirt and knots, and finally channel centuries of Indian tradition on a charka, a spinning wheel.
          </p>
        </div>
      </div>
      {/* Weaving Section */}
      <div className="flex flex-col md:flex-row-reverse items-center mb-8 px-5">
        <div className="md:w-1/3 md:pr-4 mb-4 md:mb-0">
          <Image
            src="/local/images/weaving.png" // Replace with your image path
            alt="Weaving"
            width={400}
            height={400}
            className="w-full h-56 object-cover"
          />
        </div>
        <div className="md:w-2/3 text-center px-10">
          <h3 className="text-lg font-semibold mb-2">Weaving</h3>
          <p className="leading-relaxed">
            Our carefully selected wool becomes yarn in the hands of the Katwaris, artisans that layer its strands together, remove dirt and knots, and finally channel centuries of Indian tradition on a charka, a spinning wheel.
          </p>
        </div>
      </div>

      {/* Washing Section */}
      <div className="flex flex-col md:flex-row items-center mb-8 px-5">
        <div className="md:w-1/3 md:pr-4 mb-4 md:mb-0">
          <Image
            src="/local/images/cleaning.png" // Replace with your image path
            alt="Washing"
            width={400}
            height={400}
            className="w-full h-56 object-cover"
          />
        </div>
        <div className="md:w-2/3 text-center px-10">
          <h3 className="text-lg font-semibold mb-2">Washing</h3>
          <p className="leading-relaxed">
            Our carefully selected wool becomes yarn in the hands of the Katwaris, artisans that layer its strands together, remove dirt and knots, and finally channel centuries of Indian tradition on a charka, a spinning wheel.
          </p>
        </div>
      </div>

      {/* Gultarash Section */}
      <div className="flex flex-col md:flex-row-reverse items-center  mb-8 px-5">
        <div className="md:w-1/3 md:pr-4 mb-4 md:mb-0">
          <Image
            src="/local/images/gultarash.png" // Replace with your image path
            alt="Gultarash"
            width={400}
            height={400}
            className="w-full h-56 object-cover"
          />
        </div>
        <div className="md:w-2/3 text-center px-10">
          <h3 className="text-lg font-semibold mb-2">Gultarash</h3>
          <p className="leading-relaxed">
            Our carefully selected wool becomes yarn in the hands of the Katwaris, artisans that layer its strands together, remove dirt and knots, and finally channel centuries of Indian tradition on a charka, a spinning wheel.
          </p>
        </div>
      </div>
</div>
      {/* Final Text Section */}
      <p className="text-center my-10 px-20 leading-relaxed">
        The masterpieces in our collections are the handknotted rugs. If you turn one upside down, you will notice countless tiny knots looking like pixels in a photograph. The more knots you see fitting in a square inch, the longer it took for the artisan to weave the rug, and the more precious the rug.
      </p>
    </div>
  );
}

export default StoryView;
