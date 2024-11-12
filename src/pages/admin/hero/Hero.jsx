import React, { useState, useEffect } from 'react';
import { databases, storage } from '@/appwrite';
import { v4 as uuidv4 } from 'uuid';
import { ID } from 'appwrite';

function Hero() {
  const [heroes, setHeroes] = useState([]);
  const [form, setForm] = useState({
    image: '',
    heading: '',
    tagline: '',
    button: '',
    slug: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentHeroId, setCurrentHeroId] = useState(null);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    fetchHeroes();
  }, []);

  // Fetch Hero items from Appwrite
  const fetchHeroes = async () => {
    try {
      const response = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_HERO_ID
      );
      setHeroes(response.documents);
    } catch (error) {
      console.error('Error fetching heroes:', error);
    }
  };

  // Handle Form Inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle File Upload
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.error('No file selected');
      return;
    }
  
    try {
      const uploadedFile = await storage.createFile(
        process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID,
        ID.unique(), // Automatically generate a unique ID
        file
      );
      const fileURL = `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID}/files/${uploadedFile.$id}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;
      setForm((prev) => ({ ...prev, image: fileURL }));
    } catch (error) {
      console.error('File upload error:', error);
    }
  };
  
  // Handle Add and Edit
  const handleSaveHero = async () => {
    if (!form.image || !form.heading || !form.tagline || !form.button || !form.slug) {
      alert("Please fill in all fields before saving.");
      return;
    }
  
    try {
      if (isEditing) {
        await databases.updateDocument(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
          process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_HERO_ID,
          currentHeroId,
          form
        );
        setIsEditing(false);
        setCurrentHeroId(null);
      } else {
        await databases.createDocument(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
          process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_HERO_ID,
          uuidv4(),
          form
        );
      }
      setForm({ image: '', heading: '', tagline: '', button: '', slug: '' });
      fetchHeroes();
    } catch (error) {
      console.error('Error saving hero:', error);
    }
  };
  

  // Handle Edit
  const handleEdit = (hero) => {
    setIsEditing(true);
    setCurrentHeroId(hero.$id);
    setForm({
      image: hero.image,
      heading: hero.heading,
      tagline: hero.tagline,
      button: hero.button,
      slug: hero.slug,
    });
  };

  // Handle Delete
  const handleDelete = async (heroId) => {
    await databases.deleteDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_HERO_ID,
      heroId
    );
    fetchHeroes();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Hero Section</h1>

      {/* Add Hero Button */}
      <button onClick={() => setIsEditing(false)} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
        Add Hero
      </button>

      {/* Hero Form */}
      <div className="border flex flex-col gap-5 p-4 rounded mb-4 bg-gray-300 ">
        <input type="file" onChange={handleFileUpload} className="border p-2 rounded" />
        <input
          type="text"
          name="heading"
          placeholder="Heading"
          value={form.heading}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="tagline"
          placeholder="Tagline"
          value={form.tagline}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="button"
          placeholder="Button Text"
          value={form.button}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="slug"
          placeholder="Slug"
          value={form.slug}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        {showWarning && <p className="text-red-500">Please fill in all fields before saving.</p>}
        <button onClick={handleSaveHero} className="bg-green-500 text-white px-4 py-2 rounded mt-2">
          {isEditing ? 'Update Hero' : 'Add Hero'}
        </button>
      </div>

      {/* Hero Table */}
      <table className="w-full border">
        <thead>
          <tr>
            <th>Image</th>
            <th>Heading</th>
            <th>Tagline</th>
            <th>Button Text</th>
            <th>Slug</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {heroes.map((hero) => (
            <tr key={hero.$id}>
              <td>
                <img src={hero.image} alt={hero.heading} width="100" />
              </td>
              <td>{hero.heading}</td>
              <td>{hero.tagline}</td>
              <td>{hero.button}</td>
              <td>{hero.slug}</td>
              <td>
                <button onClick={() => handleEdit(hero)} className="text-blue-500">Edit</button>
                <button onClick={() => handleDelete(hero.$id)} className="text-red-500 ml-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Hero;
