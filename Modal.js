import React, { useState } from 'react';

function Modal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-w-md rounded-lg shadow-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 text-xl hover:text-gray-700"
        >
          &times;
        </button>

        <div className="flex mb-6 border-b">
          <button
            onClick={() => setIsLogin(true)}
            className={`w-1/2 text-center py-2 font-semibold ${isLogin ? 'border-b-2 border-rose-500 text-rose-500' : 'text-gray-500 hover:text-rose-500'}`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`w-1/2 text-center py-2 font-semibold ${!isLogin ? 'border-b-2 border-rose-500 text-rose-500' : 'text-gray-500 hover:text-rose-500'}`}
          >
            Register
          </button>
        </div>

        {isLogin ? (
          <form className="space-y-4">
            <input type="email" placeholder="Email" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-rose-400" required />
            <input type="password" placeholder="Password" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-rose-400" required />
            <button type="submit" className="w-full bg-rose-500 text-white py-2 rounded hover:bg-rose-600 transition">Log In</button>
          </form>
        ) : (
          <form className="space-y-4">
            <input type="email" placeholder="Email" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400" required />
            <input type="password" placeholder="Create Password" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400" required />
            <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition">Register</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Modal;
