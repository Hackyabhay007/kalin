import React, { useState, useEffect } from "react";
import { databases, storage } from "@/appwrite";
import { v4 as uuidv4 } from "uuid"; // Generate unique IDs for images
const itemsPerPage = 20;
function Product() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id: null, // To store the ID of the product for editing
    name: "",
    description: "",
    price: "",
    category: [],
    stock: "",
    mainImage: null,
    additionalImages: [],
    colors: [],
    sizes: [],
  });
  const [products, setProducts] = useState([]); // Store the list of products
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const uploadImage = async (file) => {
    if (!file) {
      console.warn("No file provided for upload");
      return null;
    }
  
    // Log the file object to ensure it contains the expected properties
    console.log("Uploading file:", file);
  
    if (!file.size) {
      console.error("Invalid file structure, 'size' property is missing:", file);
      return null;
    }
  
    const fileId = uuidv4(); // Unique file ID
    try {
      const response = await storage.createFile(
        "6728694d000af27c9294", // Bucket ID
        fileId,
        file
      );
      console.log('File uploaded successfully:', response);
      return response.$id;
    } catch (error) {
      console.error("Error uploading file:", error);
      return null; // Return null if upload fails
    }
  };
  

// Function to handle uploading both main image and additional images
const handleUpload = async () => {
  try {
    // Upload main image
    const mainImageId = await uploadImage(formData.mainImage);
    if (mainImageId) {
      console.log("Main image uploaded with ID:", mainImageId);
    }

    // Upload additional images and gather IDs
    const additionalImageIds = await Promise.all(
      formData.additionalImages.map(async (image) => {
        return await uploadImage(image);
      })
    );

    console.log("Additional images uploaded with IDs:", additionalImageIds);
    // Store the IDs in formData or send them to your backend as needed

  } catch (error) {
    console.error("Error during file uploads:", error);
  }
};
  

  const [availableCategories, setAvailableCategories] = useState([]);
  const [availableColors, setAvailableColors] = useState([]);
  const [availableSizes, setAvailableSizes] = useState([]);

  // Fetch options from the database
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await databases.listDocuments(
          "67269e330009154de759",
          "67287391003a9b859371"
        );
        setAvailableCategories(response.documents);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchColors = async () => {
      try {
        const response = await databases.listDocuments(
          "67269e330009154de759",
          "672888fb001f6df04958"
        );
        setAvailableColors(response.documents);
      } catch (error) {
        console.error("Error fetching colors:", error);
      }
    };

    const fetchSizes = async () => {
      try {
        const response = await databases.listDocuments(
          "67269e330009154de759",
          "672894d500200dd978d1"
        );
        setAvailableSizes(response.documents);
      } catch (error) {
        console.error("Error fetching sizes:", error);
      }
    };

    fetchCategories();
    fetchColors();
    fetchSizes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if a main image exists, then upload
      const mainImageId = formData.mainImage
        ? await uploadImage(formData.mainImage)
        : null; // If no main image, skip upload
  
      // Check if additional images exist, then upload
      const additionalImageIds = formData.additionalImages.length
        ? await Promise.all(formData.additionalImages.map(uploadImage))
        : [];
  
      // Update the product if `formData.id` exists
      if (formData.id) {
        const updateData = {
          name: formData.name,
          description: formData.description,
          price: parseInt(formData.price),
          category: formData.category,
          stock: parseInt(formData.stock),
          mainImage: mainImageId,
          additionalImages: additionalImageIds,
          colors: formData.colors,
          sizes: formData.sizes,
        };
  
        // Remove null values if main image or additional images are not updated
        Object.keys(updateData).forEach(key => {
          if (updateData[key] === null || (Array.isArray(updateData[key]) && updateData[key].length === 0)) {
            delete updateData[key];
          }
        });
        
  
        // Update the document in Appwrite
        await databases.updateDocument(
          "67269e330009154de759", // Database ID
          "67285c350037a7e0be53", // Collection ID
          formData.id, // Product ID
          updateData
        );
      } else {
        // Create a new document if `formData.id` does not exist
        await databases.createDocument(
          "67269e330009154de759", // Database ID
          "67285c350037a7e0be53", // Collection ID
          uuidv4(), // Generate unique document ID
          {
            name: formData.name,
            description: formData.description,
            price: parseInt(formData.price),
            category: formData.category,
            stock: parseInt(formData.stock),
            mainImage: mainImageId,
            additionalImages: additionalImageIds,
            colors: formData.colors,
            sizes: formData.sizes,
          }
        );
      }
  
      // Reset form data after submission
      setFormData({
        id: null,
        name: "",
        description: "",
        price: "",
        category: [],
        stock: "",
        mainImage: null,
        additionalImages: [],
        colors: [],
        sizes: [],
      });
      setShowForm(false);
      fetchProducts(); // Refresh the product list
  
    } catch (error) {
      console.error("Error adding/updating product:", error);
    }
  };
  
  const fetchProducts = async () => {
    try {
      const response = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_PRODUCTS_ID
      );
      setProducts(response.documents); // Update product list with the latest documents
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  

  const handleEdit = (product) => {
    setFormData(product); // Populate form with product data
    setShowForm(true); // Show form for editing
  };

  const handleDelete = async (id) => {
    try {
      await databases.deleteDocument(
        "67269e330009154de759",
        "67285c350037a7e0be53",
        id
      );
      fetchProducts(); // Refresh the product list
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    console.log('Main Image Files:', files); // Log the main image file
    if (files.length > 0) {
      setFormData({ ...formData, mainImage: files[0] });
    }
  };
  
  // Function to handle additional images upload, limited to 3 images
  const handleAdditionalImagesChange = (e) => {
    const files = Array.from(e.target.files);
    console.log('Additional Images Files:', files); // Log selected files
    
    if (files.length + formData.additionalImages.length <= 3) {
      setFormData({
        ...formData,
        additionalImages: [...formData.additionalImages, ...files],
      });
    } else {
      alert("You can only upload up to 3 additional images.");
    }
  };
  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => {
      const updatedCategories = prevData.category.includes(value)
        ? prevData.category.filter((cat) => cat !== value)
        : [...prevData.category, value];
      return { ...prevData, category: updatedCategories };
    });
  };

  const handleColorChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => {
      const updatedColors = prevData.colors.includes(value)
        ? prevData.colors.filter((color) => color !== value)
        : [...prevData.colors, value];
      return { ...prevData, colors: updatedColors };
    });
  };

  const handleSizeChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => {
      const updatedSizes = prevData.sizes.includes(value)
        ? prevData.sizes.filter((size) => size !== value)
        : [...prevData.sizes, value];
      return { ...prevData, sizes: updatedSizes };
    });
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  useEffect(() => {
    fetchProducts(); // Fetch products on mount
  }, []);

  return (
    <div className="p-6 bg-white border border-black rounded-lg shadow-md">
      <h1 className="text-2xl mb-4">Product Management</h1>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl">Products</h2>
        <button
          onClick={toggleForm}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {showForm ? "Cancel" : "Add Product"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-2">
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              className="border rounded px-2 py-1 w-full"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-2">
            <textarea
              name="description"
              placeholder="Description"
              className="border rounded px-2 py-1 w-full"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-2">
            <input
              type="number"
              name="price"
              placeholder="Price (in Rupees)"
              className="border rounded px-2 py-1 w-full"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-2">
            <label className="block">Categories:</label>
            <div className="flex flex-col">
              {availableCategories.map((category) => (
                <label key={category.$id}>
                  <input
                    type="checkbox"
                    value={category.category}
                    onChange={handleCategoryChange}
                    checked={formData.category.includes(category.category)}
                    className="mr-2"
                  />
                  {category.category}
                </label>
              ))}
            </div>
          </div>
          <div className="mb-2">
            <input
              type="number"
              name="stock"
              placeholder="Stock"
              className="border rounded px-2 py-1 w-full"
              value={formData.stock}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-2">
            <label className="block">Main Image:</label>
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block">Additional Images:</label>
            <input
              type="file"
              onChange={handleAdditionalImagesChange}
              accept="image/*"
              multiple
              required
            />
          </div>
          <div className="mb-2">
            <label className="block">Colors:</label>
            <div className="flex flex-col">
              {availableColors.map((color) => (
                <label key={color.$id}>
                  <input
                    type="checkbox"
                    value={color.name}
                    onChange={handleColorChange}
                    checked={formData.colors.includes(color.name)}
                    className=""
                  />
                  <span
                    className="w-6 h-4 inline-block mx-2 rounded-sm border border-gray-300"
                    style={{ backgroundColor: color.hex }}
                  ></span>
                  {color.name}
                </label>
              ))}
            </div>
          </div>
          <div className="mb-2">
            <label className="block">Sizes:</label>
            <div className="flex flex-col">
              {availableSizes.map((size) => (
                <label key={size.$id}>
                  <input
                    type="checkbox"
                    value={`${size.width}x${size.height}`} // Display as "width x height"
                    onChange={handleSizeChange}
                    checked={formData.sizes.includes(
                      `${size.width}x${size.height}`
                    )}
                    className="mr-2"
                  />
                  {size.width} x {size.height}{" "}
                  {/* Show size as width x height */}
                </label>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            {formData.id ? "Update Product" : "Add Product"}
          </button>
        </form>
      )}

      <div>
        {products.length > 0 ? (
          <ul>
            {products.map((product) => (
              <li key={product.$id} className="border-b py-2">
                {product.mainImage && (
                  <img
                    src={`https://cloud.appwrite.io/v1/storage/buckets/6728694d000af27c9294/files/${product.mainImage}/view?project=67269d9a0023bf3ae88a&mode=admin`}
                    alt={product.name}
                    className="mb-2 object-cover rounded w-16"
                    width={128} // Adjust the width as needed
                    height={128} // Adjust the height as needed
                  />
                )}
                <p className="font-semibold">{product.name}</p>
                <p>Price: {product.price} Rupees</p>
                <p>Stock: {product.stock}</p>
                <button
                  onClick={() => handleEdit(product)}
                  className="bg-yellow-500 text-white px-2 py-1 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.$id)}
                  className="bg-red-500 text-white px-2 py-1"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
}

export default Product;
