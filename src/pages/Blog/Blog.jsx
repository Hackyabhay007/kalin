import React from 'react';

function Blog() {
  const cards = [
    {
      image: 'https://s3-alpha-sig.figma.com/img/cef4/138d/295ab44ab9d3b7554da631a5f0f94c65?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=pO4i5w2HJrk-sz9B3vXh4~8rIvGVl~KQU5UlWveFiHL1m6Y5QiKVncYYu7gF4J2Spnp7RChgogIL~4r3bdXipq~07qpMQPtAiO453LMN7VWyH8BZHQp7aQ59Md0DJrVOFHGcxJqSS4rKdPzmvRVNxHbcTopY8B4UWr768c-TLk2jmeEL3MqAxsIrEb6JVXQ9ekrO35ri70e9XQUK6l51eAXkY3phPwXK9uxDhjyWtLNYg4NdZyzjDioLziu7tSrFYIHXbybOju86ogx23VsqlIuRdAQreA-z9Ilio4GUmiELOOG07H4f1vBsXNFFd1SvkQJcq7ewCjde9OZBILPxWw__', // Replace with your image URL
      title: 'Blog Post 1',
      description: 'This is a brief description of Blog Post 1.',
    },
    {
      image: 'https://s3-alpha-sig.figma.com/img/cef4/138d/295ab44ab9d3b7554da631a5f0f94c65?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=pO4i5w2HJrk-sz9B3vXh4~8rIvGVl~KQU5UlWveFiHL1m6Y5QiKVncYYu7gF4J2Spnp7RChgogIL~4r3bdXipq~07qpMQPtAiO453LMN7VWyH8BZHQp7aQ59Md0DJrVOFHGcxJqSS4rKdPzmvRVNxHbcTopY8B4UWr768c-TLk2jmeEL3MqAxsIrEb6JVXQ9ekrO35ri70e9XQUK6l51eAXkY3phPwXK9uxDhjyWtLNYg4NdZyzjDioLziu7tSrFYIHXbybOju86ogx23VsqlIuRdAQreA-z9Ilio4GUmiELOOG07H4f1vBsXNFFd1SvkQJcq7ewCjde9OZBILPxWw__', // Replace with your image URL
      title: 'Blog Post 2',
      description: 'This is a brief description of Blog Post 2.',
    },
    {
      image: 'https://s3-alpha-sig.figma.com/img/cef4/138d/295ab44ab9d3b7554da631a5f0f94c65?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=pO4i5w2HJrk-sz9B3vXh4~8rIvGVl~KQU5UlWveFiHL1m6Y5QiKVncYYu7gF4J2Spnp7RChgogIL~4r3bdXipq~07qpMQPtAiO453LMN7VWyH8BZHQp7aQ59Md0DJrVOFHGcxJqSS4rKdPzmvRVNxHbcTopY8B4UWr768c-TLk2jmeEL3MqAxsIrEb6JVXQ9ekrO35ri70e9XQUK6l51eAXkY3phPwXK9uxDhjyWtLNYg4NdZyzjDioLziu7tSrFYIHXbybOju86ogx23VsqlIuRdAQreA-z9Ilio4GUmiELOOG07H4f1vBsXNFFd1SvkQJcq7ewCjde9OZBILPxWw__', // Replace with your image URL
      title: 'Blog Post 3',
      description: 'This is a brief description of Blog Post 3.',
    },
  ];

  return (
    <div className="py-10">
      <h2 className="text-center text-2xl font-semibold mb-5">Blog</h2>
      {/* Card Container */}
      <div className="flex justify-start  md:justify-center overflow-x-auto md:px-4">
        <div className="flex md:space-x-20">
          {cards.map((card, index) => (
            <div
              key={index}
              className="flex flex-col bg-rose-400 w-screen md:w-72 pt-5 px-5"
            >
              {/* Card Image */}
              <img
                src={card.image}
                alt={card.title}
                className="rounded object-cover h-1/2 w-full"
              />
              {/* Card Content */}
              <div className="flex flex-col items-center pt-3">
                <h3 className="text-white font-semibold text-lg mb-0">{card.title}</h3>
                <p className="text-white text-center mb-2">{card.description}</p>
                {/* Read More Button */}
                <button className="bg-white text-black rounded mt-5 md:mt-0 py-2 px-4">
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Blog;
