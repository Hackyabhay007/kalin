import React from 'react';

function Shop_size() {
  const cards = [
    {
      image: 'https://d7hftxdivxxvm.cloudfront.net/?height=800&quality=85&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FhFG4A_6aZef3oQXaxA4vNA%2Fnormalized.jpg&width=652',
      color: 'bg-pink-600',
      name: 'Item 1'
    },
    {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBkvg6qEw9h3JegDFMgzT69s7I60tja0FVZnsiPLlObBtTJHdwBxsAnGlUfifWkXknVSU&usqp=CAU',
      color: 'bg-blue-600',
      name: 'Item 2'
    },
    {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBkvg6qEw9h3JegDFMgzT69s7I60tja0FVZnsiPLlObBtTJHdwBxsAnGlUfifWkXknVSU&usqp=CAU',
      color: 'bg-green-600',
      name: 'Item 3'
    },
    {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBkvg6qEw9h3JegDFMgzT69s7I60tja0FVZnsiPLlObBtTJHdwBxsAnGlUfifWkXknVSU&usqp=CAU',
      color: 'bg-yellow-600',
      name: 'Item 4'
    },
  ];

  return (
    <>
    <div className='text-center '>
     <h1 className='text-lg font-semibold'>Shop by ₹ 1700 Sqft </h1>
    <div className="overflow-x-auto flex flex-col items-start md:items-center  px-4 py-10">
    
      {/* Card Container */}
      <div className="flex space-x-10"> {/* Horizontal scroll container */}
        {cards.map((card, index) => (
          <div
            key={index}
            className={`min-w-[250px] max-w-[250px] h-auto ${card.color} rounded-md flex flex-col justify-between items-center pb-6 px-5`}
          >
            {/* Card Image */}
            <img
              src={card.image}
              alt={card.name}
              className="w-full h-48 object-cover rounded-b-full"
              style={{ paddingLeft: '5px', paddingRight: '5px' }}
            />
            {/* Card Name */}
            <h3 className="text-white  mt-2">{card.name}</h3> {/* Display card name */}
            {/* Button */}
            <button className="bg-white text-black py-2 px-5 rounded-lg mt-2">
              Shop Now
            </button>
          </div>
        ))}
      </div>
    </div>
    </div>
    </>
  );
}

export default Shop_size;
