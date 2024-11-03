import React, { useState } from 'react';

function Category() {
  const [categories, setCategories] = useState([]); // State to hold categories
  const [categoryName, setCategoryName] = useState(''); // State to hold new category name

  // Function to handle adding a new category
  const handleAddCategory = () => {
    if (categoryName.trim() !== '') {
      setCategories([...categories, categoryName]); // Add the category to the list
      setCategoryName(''); // Clear the input field
    }
  };

  // Function to handle deleting a category
  const handleDeleteCategory = (index) => {
    const updatedCategories = categories.filter((_, i) => i !== index);
    setCategories(updatedCategories); // Update the categories state
  };

  // Function to handle editing a category
  const handleEditCategory = (index) => {
    const newCategoryName = prompt("Edit category name:", categories[index]);
    if (newCategoryName && newCategoryName.trim() !== '') {
      const updatedCategories = categories.map((cat, i) => (i === index ? newCategoryName : cat));
      setCategories(updatedCategories); // Update the categories state
    }
  };

  return (
    <div className="p-4 bg-white border border-black rounded-sm">
      <h1 className="text-xl mb-4">Manage Categories</h1>
      
      <div className="mb-4">
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Add new category"
          className="border p-2 rounded-sm"
        />
        <button 
          onClick={handleAddCategory}
          className="bg-blue-500 text-white p-2 rounded-sm ml-2"
        >
          Add Category
        </button>
      </div>
      
      <ul>
        {categories.map((category, index) => (
          <li key={index} className="flex justify-between items-center border-b py-2">
            <span>{category}</span>
            <div>
              <button
                onClick={() => handleEditCategory(index)}
                className="bg-yellow-500 text-white px-2 py-1 rounded-sm mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteCategory(index)}
                className="bg-red-500 text-white px-2 py-1 rounded-sm"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Category;
