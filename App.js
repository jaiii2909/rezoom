import React, { useState } from 'react';
import Modal from './Modal';
import './App.css';

function App() {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="app bg-gradient-to-b from-white to-indigo-50 text-gray-800">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-rose-500">Rezoom</h1>
          <nav className="hidden md:flex space-x-6 text-gray-600 font-medium">
            <a href="#features" className="hover:text-rose-500">Features</a>
            <a href="#how" className="hover:text-rose-500">How it Works</a>
            <a href="#contact" className="hover:text-rose-500">Contact</a>
          </nav>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-rose-500 text-white px-4 py-2 rounded-md hover:bg-rose-600 transition"
          >
            Log In
          </button>
        </div>
      </header>

      <section className="text-center py-20 px-4 bg-gradient-to-br from-indigo-50 to-white">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
          Build AI-Optimized Resumes in Minutes
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-xl mx-auto mb-6">
          Rezoom helps you analyze, improve, and optimize your resume with ATS scoring and AI insights — all in one click.
        </p>
        <a
          href="#"
          className="inline-block bg-rose-500 text-white px-6 py-3 rounded-md text-lg hover:bg-rose-600 transition"
        >
          Upload Resume
        </a>
      </section>

      <section id="features" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-12 text-gray-800">Key Features</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card title="ATS Score Checker" description="Instantly see how your resume performs on ATS systems." />
            <Card title="AI Resume Builder" description="Generate optimized resume content using smart AI suggestions." />
            <Card title="Professional Templates" description="Use modern, clean templates that stand out to recruiters." />
          </div>
        </div>
      </section>

      <section id="how" className="py-20 bg-gradient-to-b from-indigo-50 to-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-12 text-gray-800">How It Works</h3>
          <div className="grid md:grid-cols-4 gap-6 text-gray-700">
            {['Upload Resume', 'Get ATS Score', 'Optimize with AI', 'Download & Apply'].map((step, index) => (
              <div className="p-4" key={index}>
                <span className="text-4xl text-rose-500 font-bold">{index + 1}</span>
                <h4 className="font-semibold mt-2">{step}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />

      <footer id="contact" className="bg-white border-t py-8 text-center">
        <p className="text-gray-600 font-medium">Made with ❤️ by Team MJ</p>
        <p className="text-sm text-gray-400 mt-1">© 2025 Rezoom. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
