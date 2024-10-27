import React from 'react';
import Image from 'next/image';

function BlogView() {
  return (
    <div className="bg-white text-black p-10 px-20 font-cabin">
      {/* Header Section */}
      <h1 className="text-lg font-semibold text-center mb-10">Our Blog</h1>

      {/* Blog Post 1 */}
      <div className="mb-16">
        <h2 className="text-xl font-bold mb-4 text-center">Rug Size Guide: What You Need to Know</h2>
        <div className="relative flex justify-center my-20">
        <div className="md:w-[60%] relative">
            {/* Red Squares */}
            <div className="absolute w-[40%] h-[60%] bg-red-500 top-[-8%] left-[-4%] z-[0]"></div>
            <div className="absolute w-[40%] h-[60%] bg-red-500 bottom-[-7%] right-[-5%] md:right-[13%] z-[0]"></div>
            {/* Image */}
            <Image
              src="/local/images/carpet_making.jpg" // Image from the public/local/images folder
              alt="Carpet Guide"
              width={600} // Adjust the width as needed
              height={400} // Adjust the height as needed
              className="relative z-[10]"
            />
          </div>
        </div>
        <p className="md:px-40 leading-relaxed font-thin text-sm">
          Rugs are indeed versatile floor coverings that enhance both the aesthetic and functional aspects of a room. They can add warmth, texture, and color to a space, making it feel more inviting and comfortable. Beyond their decorative role, rugs also serve practical purposes, like reducing noise, providing insulation, and protecting floors from wear and tear. <br /><br />Rugs come in various materials, designs, and sizes, allowing you to choose the perfect one to match your room's style. Whether it's a bold pattern to create a focal point or a subtle hue to tie the decor together, a well-chosen rug can transform the look and feel of a space. Additionally, they can define areas in open-concept homes or serve as a cozy spot for seating or play.
        </p>

      </div>

      {/* Blog Post 2 */}
      <div className="mb-16">
        <h2 className="text-xl font-bold mb-4 text-center">The Ultimate Guide to Choosing Carpets for Your Home</h2>
        <div className="relative flex justify-center my-20">
          <div className="md:w-[60%]  relative">
            {/* Red Squares */}
            <div className="absolute w-[40%] h-[60%] bg-red-500 top-[-8%] left-[-4%] z-[0]"></div>
            <div className="absolute w-[40%] h-[60%] bg-red-500 bottom-[-7%] right-[-5%] md:right-[13%] z-[0]"></div>
            {/* Image */}
            <Image
              src="/local/images/man_carpet.jpg" // Image from the public/local/images folder
              alt="Carpet Guide"
              width={600} // Adjust the width as needed
              height={400} // Adjust the height as needed
              className="relative z-[10] object-top"
            />
          </div>
        </div>
        <p className="md:px-40 leading-relaxed font-thin text-sm">
          <strong>Synthetic Fibers (like nylon, polyester, or polypropylene):</strong> Affordability: These rugs are usually more
          budget-friendly than natural fiber options. Durability: Synthetic materials are often resistant to stains, moisture,
          and fading, making them ideal for areas prone to spills or outdoor use. Variety: Available in a wide range of colors,
          styles, and textures, allowing for a lot of design flexibility.
          <br />
          <strong>Wool:</strong> Durability: Wool rugs are known for their strength and longevity, making them a popular choice
          for high-traffic areas. Softness: They provide a plush feel underfoot, adding comfort and warmth to a room. Insulation:
          Wool has natural insulating properties, helping to keep a room warm. Stain Resistance: It is naturally stain-resistant
          and easy to clean.
          <br />
          <strong>Cotton:</strong> Lightweight: Cotton rugs are generally lighter and easier to handle. Affordability: They tend
          to be more affordable than wool or silk rugs. Easy to Clean: These rugs are often machine-washable, making them suitable
          for kitchens or children's rooms. Versatile Designs: Available in a wide range of colors and patterns, they are perfect
          for casual spaces.
          <br />
          <strong>Silk:</strong> Luxurious Look: Silk rugs are known for their luxurious sheen and intricate designs. Softness:
          They have a soft and smooth texture, adding a touch of luxury. Delicacy: Silk rugs are more delicate, making them better
          suited for low-traffic areas or as wall hangings.
        </p>
      </div>
    </div>
  );
}

export default BlogView;
