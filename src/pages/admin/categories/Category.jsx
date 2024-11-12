import React, { useState, useEffect } from "react";
import { ID } from "appwrite";
import { databases, storage } from "@/appwrite";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null); // Track selected category for editing
  const [error, setError] = useState("");

  // Fetch categories from the database
  const fetchCategories = async () => {
    try {
      const response = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_CATEGORIES_ID
      );
      setCategories(response.documents);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError("Failed to fetch categories. Please try again later.");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddOrUpdateCategory = async () => {
    if (categoryName.trim() === "") return;

    try {
      let imageUrl = null;

      // Upload image if a file is selected
      if (categoryImage) {
        const file = await storage.createFile(
          process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID,
          ID.unique(),
          categoryImage
        );
        imageUrl = file.$id; // Store the file ID to link in the database
      }

      // If no image is provided, set the image to null (or some default value)
      const newCategoryData = {
        category: categoryName,
        image: imageUrl || selectedCategory?.image || null, // Ensure the image field is present
      };

      if (selectedCategory) {
        // Update the existing category
        const updatedCategory = await databases.updateDocument(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
          process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_CATEGORIES_ID,
          selectedCategory.$id,
          newCategoryData
        );

        // Update the category in the state
        setCategories((prevCategories) =>
          prevCategories.map((category) =>
            category.$id === selectedCategory.$id ? updatedCategory : category
          )
        );
      } else {
        // Add a new category
        const newCategory = await databases.createDocument(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
          process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_CATEGORIES_ID,
          ID.unique(),
          newCategoryData
        );

        setCategories((prevCategories) => [...prevCategories, newCategory]);
      }

      // Clear the input fields after adding or updating
      setCategoryName("");
      setCategoryImage(null);
      setSelectedCategory(null); // Reset the selection after updating
    } catch (err) {
      console.error("Error adding or updating category:", err);
      setError("Failed to add or update category. Please try again later.");
    }
  };

  // Handle editing a category
  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setCategoryName(category.category);
    setCategoryImage(null); // Optionally, keep the existing image or set it as null for replacement
  };

  // Handle deleting a category
  const handleDeleteCategory = async (categoryId, image) => {
    try {
      // Delete the category document from the database
      await databases.deleteDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_CATEGORIES_ID,
        categoryId
      );

      // Delete the image from storage if it exists
      if (image) {
        await storage.deleteFile(
          process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID,
          image
        );
      }

      // Update the state to reflect the deleted category
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.$id !== categoryId)
      );
    } catch (err) {
      console.error("Error deleting category:", err);
      setError("Failed to delete category. Please try again later.");
    }
  };

  return (
    <div className="p-4 bg-white border border-black rounded-sm">
      <h1 className="text-xl mb-4">
        {selectedCategory ? "Edit Category" : "Manage Categories"}
      </h1>
      <div className="mb-4">
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Category Name"
          className="border p-2 rounded-sm"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setCategoryImage(e.target.files[0])}
          className="border p-2 rounded-sm ml-2"
        />
        <button
          onClick={handleAddOrUpdateCategory}
          className="bg-blue-500 text-white p-2 rounded-sm ml-2"
        >
          {selectedCategory ? "Update Category" : "Add Category"}
        </button>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <ul>
        {categories.map((category) => (
          <li key={category.$id} className="p-2 border-b">
            <p>Name: {category.category}</p>
            {category.image && (
              <img
                src={`${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID}/files/${category.image}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`}
                alt={category.category}
                className="w-20 h-20 object-cover"
              />
            )}
            <div className="mt-2">
              <button
                onClick={() => handleEditCategory(category)}
                className="bg-yellow-500 text-white p-2 rounded-sm mr-2"
              >
                Edit
              </button>
              <button
                onClick={() =>
                  handleDeleteCategory(category.$id, category.image)
                }
                className="bg-red-500 text-white p-2 rounded-sm"
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

export default Categories;
