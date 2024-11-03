import React, { useState } from 'react';

function Color() {
  // State to hold colors
  const [colors, setColors] = useState([
    { id: 1, name: 'Red', hex: '#FF0000' },
    { id: 2, name: 'Green', hex: '#00FF00' },
    { id: 3, name: 'Blue', hex: '#0000FF' },
  ]);

  // State to hold current color input
  const [colorInput, setColorInput] = useState({ name: '', hex: '' });

  // Function to add a new color
  const addColor = () => {
    const newColor = {
      id: colors.length + 1,
      name: colorInput.name,
      hex: colorInput.hex,
    };
    setColors([...colors, newColor]);
    setColorInput({ name: '', hex: '' }); // Reset input
  };

  // Function to delete a color
  const deleteColor = (id) => {
    const updatedColors = colors.filter(color => color.id !== id);
    setColors(updatedColors);
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
          onClick={addColor}
          className="bg-blue-500 text-white px-4 py-2 rounded-sm"
        >
          Add Color
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
          {colors.map(color => (
            <tr key={color.id}>
              <td className="border border-black p-2">{color.name}</td>
              <td className="border border-black p-2">
                <div style={{ width: '50px', height: '50px', backgroundColor: color.hex }}></div>
              </td>
              <td className="border border-black p-2">
                <button 
                  onClick={() => deleteColor(color.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Color;
