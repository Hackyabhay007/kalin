import React, { useState, useEffect } from 'react';
import {  ID } from 'appwrite'; // Ensure the path is correct
import { databases } from '@/appwrite';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [error, setError] = useState(''); // State for error message

  // Fetch categories from the database
  const fetchCategories = async () => {
    try {
      const response = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID, // Database ID from environment variable
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_CATEGORIES_ID  // Collection ID from environment variable
      );
      setCategories(response.documents); // Set the fetched categories
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Failed to fetch categories. Please try again later.');
    }
  };

  useEffect(() => {
    fetchCategories(); // Call fetchCategories when the component mounts
  }, []); // Empty dependency array ensures this runs only once

  const handleAddCategory = async () => {
    if (categoryName.trim() !== '') {
      // Check if the category already exists (case insensitive)
      const categoryExists = categories.some(
        (category) => category.category.toLowerCase() === categoryName.toLowerCase()
      );

      if (categoryExists) {
        setError('Category already exists. Please enter a different name.'); // Set error message
        return; // Exit the function if the category exists
      } else {
        setError(''); // Clear the error message if the category does not exist
      }

      try {
        const newCategory = await databases.createDocument(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID, // Database ID from environment variable
          process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_CATEGORIES_ID, // Collection ID from environment variable
          ID.unique(),  // Use ID.unique() to generate a unique ID for the document
          { category: categoryName } // Ensure this matches the schema
        );
        setCategories((prevCategories) => [...prevCategories, newCategory]); // Update state with the new category
        setCategoryName(''); // Clear the input
      } catch (err) {
        console.error('Error adding category:', err);
        setError('Failed to add category. Please try again later.');
      }
    }
  };

  const handleDeleteCategory = async (index) => {
    const categoryId = categories[index].$id;
    try {
      await databases.deleteDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID, // Database ID from environment variable
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_CATEGORIES_ID, // Collection ID from environment variable
        categoryId
      );
      setCategories((prevCategories) => prevCategories.filter((_, i) => i !== index)); // Remove the deleted category from state
    } catch (err) {
      console.error('Error deleting category:', err);
      setError('Failed to delete category. Please try again later.');
    }
  };

  const handleEditCategory = async (index) => {
    const newCategoryName = prompt("Edit category name:", categories[index]?.category);
    if (newCategoryName && newCategoryName.trim() !== '') {
      // Check if the edited category already exists (case insensitive)
      const categoryExists = categories.some(
        (category, i) => category.category.toLowerCase() === newCategoryName.toLowerCase() && i !== index
      );

      if (categoryExists) {
        setError('Category already exists. Please enter a different name.'); // Set error message
        return; // Exit the function if the category exists
      } else {
        setError(''); // Clear the error message if the category does not exist
      }

      const categoryId = categories[index].$id;
      try {
        const updatedCategory = await databases.updateDocument(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID, // Database ID from environment variable
          process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_CATEGORIES_ID, // Collection ID from environment variable
          categoryId,
          { category: newCategoryName } // Ensure this matches the schema
        );
        setCategories((prevCategories) =>
          prevCategories.map((cat, i) => (i === index ? updatedCategory : cat)) // Update state with the updated category
        );
      } catch (err) {
        console.error('Error updating category:', err);
        setError('Failed to update category. Please try again later.');
      }
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
      {error && <p className="text-red-500 mb-4">{error}</p>} {/* Display error message if exists */}
      <ul>
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <li key={category.$id} className="flex justify-between items-center border-b py-2">
              <span>{category.category}</span>
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
          ))
        ) : (
          <li>No categories available.</li>
        )}
      </ul>
    </div>
  );
}

export default Categories;
