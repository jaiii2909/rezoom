import React from 'react';

function Card({ title, description }) {
  return (
    <div className="bg-white border border-indigo-100 p-6 rounded-lg shadow-md hover:shadow-lg transition">
      <h4 className="text-xl font-semibold text-indigo-600 mb-2">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default Card;
