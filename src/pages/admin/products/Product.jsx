import React, { useState } from 'react';

function Product() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    mainImage: null,
    additionalImages: [],
    colors: [],
    sizes: [],
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Product Data:', formData); // Replace this with your submission logic (e.g., API call)
    // Reset form after submission
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      stock: '',
      mainImage: null,
      additionalImages: [],
      colors: [],
      sizes: [],
    });
    setShowForm(false); // Close the form
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file uploads
  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      setFormData({ ...formData, mainImage: files[0] });
    }
  };

  const handleAdditionalImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + formData.additionalImages.length <= 3) {
      setFormData({ ...formData, additionalImages: [...formData.additionalImages, ...files] });
    } else {
      alert('You can only upload up to 3 additional images.');
    }
  };

  // Show form for adding products
  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="p-6 bg-white border border-black rounded-lg shadow-md">
      <h1 className="text-2xl mb-4">Product Management</h1>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl">Products</h2>
        <button 
          onClick={toggleForm} 
          className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Product
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
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="mb-2">
            <textarea 
              name="description" 
              placeholder="Description" 
              className="border rounded px-2 py-1 w-full"
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
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="mb-2">
            <input 
              type="text" 
              name="category" 
              placeholder="Category" 
              className="border rounded px-2 py-1 w-full"
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="mb-2">
            <input 
              type="number" 
              name="stock" 
              placeholder="Stock" 
              className="border rounded px-2 py-1 w-full"
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="mb-2">
            <input 
              type="file" 
              name="mainImage" 
              onChange={handleFileChange} 
              className="border rounded w-full"
              required 
            />
          </div>
          <div className="mb-2">
            <input 
              type="file" 
              multiple 
              onChange={handleAdditionalImagesChange} 
              className="border rounded w-full"
            />
            <small>You can upload up to 3 additional images.</small>
          </div>
          <div className="flex items-center mb-2">
            <label className="mr-2">Size:</label>
            <select name="size" onChange={handleChange} required className="border rounded">
              <option value="3x4">3x4</option>
              {/* Add more sizes as needed */}
            </select>
          </div>
          <div className="flex items-center mb-2">
            <label className="mr-2">Colors:</label>
            <input 
              type="checkbox" 
              name="colors" 
              value="blue" 
              onChange={(e) => {
                const newColors = e.target.checked 
                  ? [...formData.colors, e.target.value] 
                  : formData.colors.filter(color => color !== e.target.value);
                setFormData({ ...formData, colors: newColors });
              }} 
            />
            <span>Blue</span>
            {/* Add more color options as needed */}
          </div>
          <button 
            type="submit" 
            className="bg-green-500 text-white px-4 py-2 rounded">
            Submit Product
          </button>
        </form>
      )}
    </div>
  );
}

export default Product;
