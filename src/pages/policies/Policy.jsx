// src/pages/policies/Policy.jsx
import React from 'react';

function Policy({ policy }) {
  if (!policy) {
    return <div>Policy not found.</div>; // Handle case where policy is not found
  }

  return (
    <div className="bg-white text-black px-5 text-justify md:px-32 py-10 text-sm">
      <h1 className="text-xl font-semibold mb-4 text-center">{policy.title}</h1>
      <p className=" mb-8 text-center">{policy.description}</p>

      {policy.details.map((section, index) => (
        <div key={index} className="mb-8 ">
          <h2 className="text-lg font-semibold mb-2">{section.heading}</h2>
          <p className=" leading-relaxed">{section.content}</p>
        </div>
      ))}
    </div>
  );
}

export default Policy;
