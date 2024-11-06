"use client";
import React, { useState, useEffect } from "react";
import { Client, Databases } from "appwrite";

const Filter = ({ onApply }) => {
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);

  // Initialize Appwrite client
  const client = new Client();
  client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

  const databases = new Databases(client);

  // Fetch data for sizes, categories, and colors from Appwrite
  useEffect(() => {
    const fetchData = async () => {
      try {
        const sizesResponse = await databases.listDocuments(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
          process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_SIZES_ID
        );
        setSizes(sizesResponse.documents);

        const categoriesResponse = await databases.listDocuments(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
          process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_CATEGORIES_ID
        );
        setCategories(categoriesResponse.documents);

        const colorsResponse = await databases.listDocuments(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
          process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_COLORS_ID
        );
        setColors(colorsResponse.documents);
      } catch (error) {
        console.error("Error fetching data from Appwrite:", error);
      }
    };

    fetchData();
  }, []);

  // Toggle selection for independent checkboxes
  const handleToggleSelection = (item, selected, setSelected) => {
    setSelected((prevSelected) =>
      prevSelected.includes(item)
        ? prevSelected.filter((selectedItem) => selectedItem !== item)
        : [...prevSelected, item]
    );
  };

  const handleApply = () => {
    onApply({
      sizes: selectedSizes,
      categories: selectedCategories,
      colors: selectedColors,
    });
  };

  const handleReset = () => {
    setSelectedSizes([]);
    setSelectedCategories([]);
    setSelectedColors([]);
  };

  return (
    <div
      className="bg-white text-black font-thin h-auto p-5 w-72 overflow-y-scroll"
      style={{
        scrollbarWidth: 'none', // Hides scrollbar in Firefox
        msOverflowStyle: 'none', // Hides scrollbar in IE and Edge
        overflow: '-moz-hidden-unscrollable', // Hides scrollbar in Firefox (old versions)
      }}
    >
      <h2 className="text-lg font-semibold mb-4">Filter by</h2>
      <hr className="border-black mb-4" />

      {/* Sort by Section */}
      <div className="mb-4">
        <h3 className="text-base font-semibold mb-2">Sort by</h3>
        <div className="flex gap-2 mb-2">
          <button className="bg-white text-black border border-black px-3 py-1 hover:bg-black hover:text-white">
            Newest Rugs
          </button>
          <button className="bg-white text-black border border-black px-3 py-1 hover:bg-black hover:text-white">
            Popular Rugs
          </button>
        </div>
        <hr className="border-black" />
      </div>

      {/* Price Section */}
      <div className="mb-4">
        <h3 className="text-base font-semibold mb-2">Price</h3>
        <div className="flex flex-col gap-2">
          <button className="border border-black rounded-none py-1 px-2 hover:bg-black hover:text-white">
            Low to High
          </button>
          <button className="border border-black rounded-none py-1 px-2 hover:bg-black hover:text-white">
            High to Low
          </button>
        </div>
        <hr className="border-black mt-4" />
      </div>

      {/* Size Section */}
      <div className="mb-4">
        <h3 className="text-base font-semibold mb-2">Size (FT.)</h3>
        <div className="flex flex-col gap-2">
          {sizes.map((size) => {
            const sizeLabel = `${size.width} x ${size.height}`;
            return (
              <label key={size.$id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="border h-6 w-6 border-black"
                  checked={selectedSizes.includes(sizeLabel)}
                  onChange={() =>
                    handleToggleSelection(sizeLabel, selectedSizes, setSelectedSizes)
                  }
                />
                <span>({sizeLabel})</span>
              </label>
            );
          })}
        </div>
        <hr className="border-black mt-4" />
      </div>

      {/* Category Section */}
      <div className="mb-4">
        <h3 className="text-base font-semibold mb-2">Category</h3>
        <div className="flex flex-col gap-2">
          {categories.map((category) => (
            <label key={category.$id} className="flex items-center gap-2">
              <input
                type="checkbox"
                className="border h-6 w-6 border-black"
                checked={selectedCategories.includes(category.category)}
                onChange={() =>
                  handleToggleSelection(category.category, selectedCategories, setSelectedCategories)
                }
              />
              {category.category}
            </label>
          ))}
        </div>
      </div>

      {/* Color Section */}
      <div className="mb-4">
        <h3 className="text-base font-semibold mb-2">Color</h3>
        <div className="flex flex-col gap-2">
          {colors.map((color) => (
            <label key={color.$id} className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-6 h-6 border border-black"
                checked={selectedColors.includes(color.name)}
                onChange={() =>
                  handleToggleSelection(color.name, selectedColors, setSelectedColors)
                }
              />
              <div
                className="w-10 h-6 border border-gray-300"
                style={{ backgroundColor: color.hex }}
              ></div>
              <span className="text-black">{color.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Apply and Reset Buttons */}
      <div className="mt-4 flex gap-2">
        <button
          onClick={handleApply}
          className="w-full border border-black py-2 text-center rounded-none hover:bg-black hover:text-white"
        >
          Apply
        </button>
        <button
          onClick={handleReset}
          className="w-full border border-black py-2 text-center rounded-none hover:bg-black hover:text-white"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Filter;
