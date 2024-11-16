"use client";

import React, { useState } from "react";
import { Client, Databases } from "appwrite";

function Contact_us() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  // Initialize Appwrite client
  const client = new Client();
  client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT) // Your Appwrite API endpoint
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID); // Your Appwrite Project ID

  const databases = new Databases(client);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, phone, message } = formData;

    // Sanitize phone number by removing non-numeric characters
    const sanitizedPhone = phone.replace(/\D/g, ""); // Removes all non-numeric characters

    // Validation for phone number (ensure it's exactly 10 digits)
    if (sanitizedPhone.length !== 10) {
      setStatus("Phone number must be exactly 10 digits.");
      return;
    }

    setLoading(true);
    try {
      // Add form data to the Appwrite 'Contact' collection
      await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.NEXT_PUBLIC_APPWRITE_CONTACT_COLLECTION_ID,
        "unique()", // Auto-generate a unique ID
        {
          name,
          email,
          number: sanitizedPhone, // Store phone number as a string
          message,
        }
      );

      setStatus("Your message has been sent!");
      setFormData({ name: "", email: "", phone: "", message: "" }); // Reset form after success
      setShowPopup(true); // Show the popup on successful submission
    } catch (error) {
      setStatus(`Error: ${error.message}`);
      console.error("Error saving data to Appwrite:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false); // Close the popup when OK is clicked
  };

  return (
    <div className="w-fit h-auto bg-white text-black">
      {/* Image Section */}
      <div
        className="w-screen h-64 md:h-screen bg-cover bg-bottom mb-10"
        style={{ backgroundImage: "url('/local/images/contact_home.jpeg')" }}
      />

      {/* Header Section */}
      <div className="text-start pl-0 md:pl-44 mx-4">
        <h1 className="font-bold text-xl mb-2">Enquire Now</h1>
        <p className="text-gray-600 font-semibold">
          Send us your query or drop by our store for a cup of tea with us! <br />
          For any online sales inquiries, feel free to call us at:
        </p>
      </div>

      {/* Form and Contact Information Section */}
      <div className="flex flex-col md:flex-row items-start justify-around my-8 space-y-8 md:space-y-0 md:space-x-8 mx-4">
        {/* Form Section */}
        <form className="w-full max-w-md space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="font-semibold">Your Name*</label>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              className="border-b border-black focus:outline-none focus:border-blue-700 p-2"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold">Your Mail*</label>
            <input
              type="email"
              name="email"
              placeholder="Your email"
              value={formData.email}
              onChange={handleChange}
              className="border-b border-black focus:outline-none focus:border-blue-700 p-2"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold">Phone*</label>
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="border-b border-black focus:outline-none focus:border-blue-700 p-2"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold">Your Message*</label>
            <textarea
              name="message"
              placeholder="Enter here"
              value={formData.message}
              onChange={handleChange}
              className="border-b border-black focus:outline-none focus:border-blue-700 p-2"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-black text-white font-bold border w-1/4 hover:border-black py-2 px-4 mt-4 hover:bg-white hover:text-black"
          >
            Submit
          </button>
        </form>

        {/* Contact Information */}
        <div className="flex flex-col items-start text-left space-y-4 mt-4 md:mt-0">
          <div className="flex items-center space-x-2">
            <i className="ri-phone-line text-xl bg-black text-white px-2 py-1 rounded-full"></i>
            <span className="font-semibold">+91-00000000</span>
          </div>
          <div className="flex items-center space-x-2">
            <i className="ri-mail-line text-xl bg-black text-white px-2 py-1 rounded-full"></i>
            <span className="font-semibold">123@Gmail.com</span>
          </div>
          <div className="flex items-center space-x-2">
            <i className="ri-map-pin-line text-xl bg-black text-white px-2 py-1 rounded-full"></i>
            <span className="font-semibold">123@Gmail.com</span>
          </div>
        </div>
      </div>

      {/* Status Message */}
      {status && <p className="text-center text-sm mt-4">{status}</p>}

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6  w-96 text-center border border-black">
            {loading ? (
              <div className="flex justify-center items-center">
                <div className=" border-t-4 border-b-4 border-black w-8 h-8 border-t-black rounded-full animate-spin"></div>
              </div>
            ) : (
              <>
                 <h1 className="text-3xl font-bold mb-5">Thank you!</h1>
                 <i class="ri-mail-ai-line text-5xl text-gray-800"></i>
                <p className="text-gray-700 font-semibold my-5">We will contact you soon!</p>
                <button
                  onClick={handlePopupClose}
                  className="mt-4 px-6 py-2 border border-black rounded-none bg-black text-white font-semibold hover:bg-white hover:text-black"
                >
                  OK
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Contact_us;
