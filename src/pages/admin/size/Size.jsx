import React, { useState } from 'react';

function Size() {
  // State to hold sizes
  const [sizes, setSizes] = useState([
    { id: 1, dimensions: '3 x 4' },
    { id: 2, dimensions: '10 x 10' },
  ]);

  // State to hold current width and height inputs
  const [widthInput, setWidthInput] = useState('');
  const [heightInput, setHeightInput] = useState('');

  // Function to add a new size
  const addSize = () => {
    // Only add size if both width and height are provided
    if (widthInput && heightInput) {
      const newSize = {
        id: sizes.length + 1,
        dimensions: `${widthInput} x ${heightInput}`,
      };
      setSizes([...sizes, newSize]);
      setWidthInput(''); // Reset width input
      setHeightInput(''); // Reset height input
    } else {
      alert('Please enter both width and height.'); // Simple validation
    }
  };

  // Function to delete a size
  const deleteSize = (id) => {
    const updatedSizes = sizes.filter(size => size.id !== id);
    setSizes(updatedSizes);
  };

  return (
    <div className="p-4 bg-white border border-black rounded-sm">
      <h1 className="text-xl mb-4">Manage Sizes</h1>
      
      <div className="mb-4 flex items-center">
        <input
          type="number"
          placeholder="Width (e.g., 12)"
          value={widthInput}
          onChange={(e) => setWidthInput(e.target.value)}
          className="border border-black rounded-sm p-2 mr-2"
        />
        <span className="mr-2">x</span>
        <input
          type="number"
          placeholder="Height (e.g., 10)"
          value={heightInput}
          onChange={(e) => setHeightInput(e.target.value)}
          className="border border-black rounded-sm p-2 mr-2"
        />
        <button
          onClick={addSize}
          className="bg-blue-500 text-white px-4 py-2 rounded-sm"
        >
          Add Size
        </button>
      </div>

      <table className="min-w-full border-collapse border border-black">
        <thead>
          <tr>
            <th className="border border-black p-2">Size (Sq(ft))</th>
            <th className="border border-black p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sizes.map(size => (
            <tr key={size.id}>
              <td className="border border-black p-2">{size.dimensions}</td>
              <td className="border border-black p-2">
                <button 
                  onClick={() => deleteSize(size.id)}
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

export default Size;
