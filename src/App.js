import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Modal from './Modal';
import Card from './Card';
import Upload from './Upload';
import JobDescription from './JobDescription'; // you’ll create this new file

function App() {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <Router>
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

        <Routes>
          {/* Landing Page */}
          <Route
            path="/"
            element={
              <>
                <div className="text-center mb-5">
                  <h2 className="display-5 fw-bold">
                    Build AI-Optimized Resumes in Minutes
                  </h2>
                  <p className="lead">
                    Analyze, improve, and optimize your resume with ATS scoring and AI insights.
                  </p>
                  <div className="d-flex justify-content-center gap-3 mt-4">
                    <Link to="/upload" className="btn btn-primary btn-lg">
                      Analyze My Resume
                    </Link>
                    <Link to="/job-description" className="btn btn-outline-primary btn-lg">
                      Compare With Job
                    </Link>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4">
                    <Card
                      title="ATS Score Checker"
                      description="Instantly see how your resume performs on ATS systems."
                    />
                  </div>
                  <div className="col-md-4">
                    <Card
                      title="AI Resume Builder"
                      description="Generate optimized resume content using smart AI suggestions."
                    />
                  </div>
                  <div className="col-md-4">
                    <Card
                      title="Professional Templates"
                      description="Use modern, clean templates that stand out to recruiters."
                    />
                  </div>
                </div>

                <section className="instructions card mt-5">
                  <h3>How to Use Rezoom</h3>
                  <ul>
                    <li>
                      Click <strong>Log In</strong> to access personalized features.
                    </li>
                    <li>Choose whether to analyze your resume or compare it with a job description.</li>
                    <li>Check your ATS score and get instant feedback.</li>
                    <li>Use the AI Resume Builder for smart content suggestions.</li>
                    <li>Choose a professional template and download your resume.</li>
                  </ul>
                  <p className="mt-3">
                    <strong>Tip:</strong> Hover over each card to learn more about its functionality!
                  </p>
                </section>
              </>
            }
          />

          {/* Upload Page */}
          <Route path="/upload" element={<Upload />} />

          {/* Job Description Page */}
          <Route path="/job-description" element={<JobDescription />} />
        </Routes>

        <footer className="footer mt-5 text-center">
          <hr />
          <p>
            &copy; {new Date().getFullYear()} Rezoom &mdash; Crafted with{" "}
            <span style={{ color: "#b39ddb" }}>deep purple</span> passion.
            <br />
            Need help?{" "}
            <a href="mailto:support@rezoom.ai" style={{ color: "#b39ddb" }}>
              Contact Support
            </a>
          </p>
        </footer>

        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
      </div>
    </Router>
  );
}

export default App;
