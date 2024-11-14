import React, { useState } from 'react';

function Contact_us() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/sendEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      setStatus('Your message has been sent!');
      setFormData({ name: '', email: '', phone: '', message: '' }); // Reset form after successful submit
    } else {
      setStatus(`Error: ${data.message}`);
    }
  };

  return (
    <div className="w-fit h-auto bg-white text-black">
      {/* Image Section */}
      <div className=" w-screen h-64 md:h-screen bg-cover bg-bottom  mb-10" style={{ backgroundImage: "url('https://s3-alpha-sig.figma.com/img/3414/500a/7d661be88a8dd3ae59979384ce3d93de?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=IEc25Uk5oeJUsOLiSxsuX2teTUIrfS9K234eCcjeOAEO8r322wR8xr1zNyzJZVeqTk1mMWiEJBLOEEfZicMKYj6-5LlhLrW4aF-397vC37VVR5riB5cjirG~OtabwXHpSfdtBZJyS5sXI917YMhaHhP5E6efqAUgfTgbHXkPve-9-KqpBw3w0rEKN5nVn4f2ztKNu-JGbkfnIGOib6LMdyDlqMOmAB5~n7e0jRqI2LHVs7ECEWxJoWjOOELnyW5oQsT4fcn5MJabTV1y0VOO4sv9qemGN0mfklBSwUNGK~x4YU7hBwDqqa7Eif9GTcY8dQteBV78YEmJXQYI8csvAw__')" }} />
      
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
    </div>
  );
}

export default Contact_us;
