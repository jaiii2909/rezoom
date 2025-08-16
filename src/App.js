import React, { useState } from 'react';
import Modal from './Modal';
import Card from './Card';
import Upload from './Upload';


function App() {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="container py-5">
      <header className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-primary">Rezoom</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="btn btn-outline-primary"
        >
          Log In
        </button>
      </header>

      <div className="text-center mb-5">
        <h2 className="display-5 fw-bold">Build AI-Optimized Resumes in Minutes</h2>
        <p className="lead">Analyze, improve, and optimize your resume with ATS scoring and AI insights.</p>
        <Upload />

      </div>

      <div className="row">
        <div className="col-md-4"><Card title="ATS Score Checker" description="Instantly see how your resume performs on ATS systems." /></div>
        <div className="col-md-4"><Card title="AI Resume Builder" description="Generate optimized resume content using smart AI suggestions." /></div>
        <div className="col-md-4"><Card title="Professional Templates" description="Use modern, clean templates that stand out to recruiters." /></div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

export default App;
