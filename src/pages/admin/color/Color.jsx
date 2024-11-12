import React, { useState, useEffect } from "react";
import { databases, storage } from "@/appwrite"; // Adjust the path as necessary

function Color({ initialColors }) {
  const [colors, setColors] = useState(initialColors || []);
  const [colorInput, setColorInput] = useState({
    name: "",
    hex: "",
    image: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentColorId, setCurrentColorId] = useState(null);

  useEffect(() => {
    if (colors.length === 0) {
      fetchColors();
    }
  }, []);

  const fetchColors = async () => {
    try {
      const response = await databases.listDocuments(
        "67269e330009154de759", // Database ID
        "672888fb001f6df04958" // Collection ID for colors
      );
      setColors(response.documents || []);
    } catch (error) {
      console.error("Error fetching colors:", error);
    }
  };

  const handleFileChange = (e) => {
    setColorInput((prevInput) => ({
      ...prevInput,
      image: e.target.files[0],
    }));
  };

  const bucketId = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID;
  const uploadImageToAppwrite = async (file) => {
    try {
      const fileUploadResponse = await storage.createFile(
        bucketId,
        "unique()", // Unique file ID
        file
      );
      return fileUploadResponse.$id;
    } catch (error) {
      console.error("Error uploading file:", error);
      return null;
    }
  };

  const addColor = async () => {
    if (colorInput.name.trim() && colorInput.hex) {
      let imageId = null;
      if (colorInput.image) {
        imageId = await uploadImageToAppwrite(colorInput.image);
      }

      try {
        const newColor = await databases.createDocument(
          "67269e330009154de759", // Database ID
          "672888fb001f6df04958", // Collection ID for colors
          "unique()", // Generate a unique ID
          { name: colorInput.name, hex: colorInput.hex, image: imageId }
        );

        setColors((prevColors) => [...prevColors, newColor]);
        setColorInput({ name: "", hex: "", image: null });
      } catch (err) {
        console.error("Error adding color:", err);
      }
    }
  };

  const editColor = async () => {
    if (colorInput.name.trim() && colorInput.hex && currentColorId) {
      let imageId = colorInput.image
        ? await uploadImageToAppwrite(colorInput.image)
        : null;

      try {
        await databases.updateDocument(
          "67269e330009154de759", // Database ID
          "672888fb001f6df04958", // Collection ID for colors
          currentColorId,
          {
            name: colorInput.name,
            hex: colorInput.hex,
            image: imageId || colorInput.image,
          }
        );

        setColors((prevColors) =>
          prevColors.map((color) =>
            color.$id === currentColorId
              ? {
                  ...color,
                  name: colorInput.name,
                  hex: colorInput.hex,
                  image: imageId || color.image,
                }
              : color
          )
        );

        setColorInput({ name: "", hex: "", image: null });
        setIsEditing(false);
        setCurrentColorId(null);
      } catch (err) {
        console.error("Error editing color:", err);
      }
    }
  };

  const deleteColor = async (id) => {
    try {
      await databases.deleteDocument(
        "67269e330009154de759",
        "672888fb001f6df04958",
        id
      );
      setColors((prevColors) => prevColors.filter((color) => color.$id !== id));
    } catch (err) {
      console.error("Error deleting color:", err);
    }
  };

  const handleEditClick = (color) => {
    setColorInput({ name: color.name, hex: color.hex, image: color.image });
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
          onChange={(e) =>
            setColorInput({ ...colorInput, name: e.target.value })
          }
          className="border border-black rounded-sm p-2 mr-2"
        />
        <input
          type="color"
          value={colorInput.hex}
          onChange={(e) =>
            setColorInput({ ...colorInput, hex: e.target.value })
          }
          className="border border-black rounded-sm mr-2"
        />
        <input
          type="file"
          onChange={handleFileChange}
          className="border border-black rounded-sm mr-2"
        />
        <button
          onClick={isEditing ? editColor : addColor}
          className={`bg-blue-500 text-white px-4 py-2 rounded-sm ${
            isEditing ? "bg-green-500" : ""
          }`}
        >
          {isEditing ? "Update Color" : "Add Color"}
        </button>
      </div>
      <table className="min-w-full border-collapse border border-black">
        <thead>
          <tr>
            <th className="border border-black p-2">Color Name</th>
            <th className="border border-black p-2">Color Preview</th>
            <th className="border border-black p-2">Image</th>
            <th className="border border-black p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {colors.length > 0 ? (
            colors.map((color) => (
              <tr key={color.$id}>
                <td className="border border-black p-2">{color.name}</td>
                <td className="border border-black p-2">
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      backgroundColor: color.hex,
                    }}
                  ></div>
                </td>
                <td className="border border-black p-2">
                  {color.image && (
                    <img
                      src={`${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${bucketId}/files/${color.image}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}&mode=admin`}
                      alt={`${color.name} preview`}
                      style={{ width: "50px", height: "50px", objectFit:'cover' }}
                    />
                  )}
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
              <td colSpan="4" className="border border-black p-2 text-center">
                No colors available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

// Fetching colors on the server-side
export async function getServerSideProps() {
  let initialColors = [];

  try {
    const response = await databases.listDocuments(
      "67269e330009154de759", // Database ID
      "672888fb001f6df04958" // Collection ID for colors
    );
    initialColors = response.documents || [];
  } catch (error) {
    console.error("Error fetching colors:", error);
  }

  return {
    props: {
      initialColors,
    },
  };
}

export default Color;
