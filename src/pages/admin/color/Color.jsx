import React, { useState, useEffect } from 'react';
import { databases } from '@/appwrite'; // Adjust the path as necessary

function Color({ initialColors }) {
  const [colors, setColors] = useState(initialColors || []); // Initialize state with props
  const [colorInput, setColorInput] = useState({ name: '', hex: '' });
  const [isEditing, setIsEditing] = useState(false); // Track if we're in edit mode
  const [currentColorId, setCurrentColorId] = useState(null); // Track the ID of the color being edited

  useEffect(() => {
    // Fetch colors only if the state is empty to prevent hydration mismatch
    const fetchColors = async () => {
      try {
        const response = await databases.listDocuments(
          '67269e330009154de759', // Database ID
          '672888fb001f6df04958'  // Collection ID for colors
        );
        setColors(response.documents || []); // Update the state with fetched colors
      } catch (error) {
        console.error('Error fetching colors:', error);
      }
    };

    // Only fetch if colors array is empty and only on the client-side
    if (colors.length === 0) {
      fetchColors();
    }
  }, []); // Removed `colors.length` from dependency array

  const addColor = async () => {
    if (colorInput.name.trim() && colorInput.hex) {
      try {
        const newColor = await databases.createDocument(
          '67269e330009154de759', // Database ID
          '672888fb001f6df04958', // Collection ID for colors
          'unique()', // Generate a unique ID
          { name: colorInput.name, hex: colorInput.hex }
        );

        // Update the local state
        setColors((prevColors) => [...prevColors, newColor]);
        setColorInput({ name: '', hex: '' }); // Reset input fields
      } catch (err) {
        console.error('Error adding color:', err);
      }
    }
  };

  const editColor = async () => {
    if (colorInput.name.trim() && colorInput.hex && currentColorId) {
      try {
        await databases.updateDocument(
          '67269e330009154de759', // Database ID
          '672888fb001f6df04958', // Collection ID for colors
          currentColorId, // ID of the color to edit
          { name: colorInput.name, hex: colorInput.hex }
        );

        // Update the local state
        setColors((prevColors) => 
          prevColors.map(color => 
            color.$id === currentColorId ? { ...color, name: colorInput.name, hex: colorInput.hex } : color
          )
        );

        // Reset form
        setColorInput({ name: '', hex: '' });
        setIsEditing(false);
        setCurrentColorId(null);
      } catch (err) {
        console.error('Error editing color:', err);
      }
    }
  };

  const deleteColor = async (id) => {
    try {
      await databases.deleteDocument('67269e330009154de759', '672888fb001f6df04958', id);
      setColors((prevColors) => prevColors.filter(color => color.$id !== id)); // Remove deleted color from state
    } catch (err) {
      console.error('Error deleting color:', err);
    }
  };

  const handleEditClick = (color) => {
    setColorInput({ name: color.name, hex: color.hex });
    setIsEditing(true);
    setCurrentColorId(color.$id);
  };

  return (
    <div className="p-4 bg-white border border-black rounded-sm">
      <h1 className="text-xl mb-4">Manage Colors</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Color Name"
          value={colorInput.name}
          onChange={(e) => setColorInput({ ...colorInput, name: e.target.value })}
          className="border border-black rounded-sm p-2 mr-2"
        />
        <input
          type="color"
          value={colorInput.hex}
          onChange={(e) => setColorInput({ ...colorInput, hex: e.target.value })}
          className="border border-black rounded-sm mr-2"
        />
        <button
          onClick={isEditing ? editColor : addColor}
          className={`bg-blue-500 text-white px-4 py-2 rounded-sm ${isEditing ? 'bg-green-500' : ''}`}
        >
          {isEditing ? 'Update Color' : 'Add Color'}
        </button>
      </div>
      <table className="min-w-full border-collapse border border-black">
        <thead>
          <tr>
            <th className="border border-black p-2">Color Name</th>
            <th className="border border-black p-2">Color Preview</th>
            <th className="border border-black p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {colors.length > 0 ? (
            colors.map(color => (
              <tr key={color.$id}>
                <td className="border border-black p-2">{color.name}</td>
                <td className="border border-black p-2">
                  <div style={{ width: '50px', height: '50px', backgroundColor: color.hex }}></div>
                </td>
                <td className="border border-black p-2">
                  <button 
                    onClick={() => handleEditClick(color)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded-sm mr-2"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => deleteColor(color.$id)}
                    className="bg-red-500 text-white px-2 py-1 rounded-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="border border-black p-2 text-center">No colors available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

// Fetching colors on the server-side
export async function getStaticProps() {
  let initialColors = [];

  try {
    const response = await databases.listDocuments(
      '67269e330009154de759', // Database ID
      '672888fb001f6df04958'  // Collection ID for colors
    );
    initialColors = response.documents || []; // Set initial colors
  } catch (error) {
    console.error('Error fetching colors:', error);
  }

  return {
    props: {
      initialColors,
    },
    revalidate: 60, // Optional: Regenerate the page every 60 seconds
  };
}

export default Color;
