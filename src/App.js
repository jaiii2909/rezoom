import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Modal from './Modal';
import Card from './Card';
import Upload from './Upload';
import JobDescription from './JobDescription';

function Navigation({ onOpenModal }) {
  const location = useLocation();

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="brand-mark">
          <div className="brand-icon">R</div>
          <span>Rezoom</span>
          <span className="brand-pill">ATS Ready</span>
        </Link>

        <nav className="site-nav d-none d-md-flex" aria-label="Main Navigation">
          <Link
            to="/upload"
            className={`nav-link-custom ${location.pathname === '/upload' ? 'active' : ''}`}
          >
            Resume Scanner
          </Link>
          <Link
            to="/job-description"
            className={`nav-link-custom ${location.pathname === '/job-description' ? 'active' : ''}`}
          >
            Job Description Matcher
          </Link>
          <a
            href="#how-it-works"
            className="nav-link-custom"
          >
            ATS Benchmarks
          </a>
        </nav>

        <div className="nav-actions">
          <button
            onClick={onOpenModal}
            className="btn-rezoom-secondary"
            type="button"
          >
            Sign In
          </button>
          <Link to="/upload" className="btn-rezoom-primary d-none d-sm-inline-flex">
            Scan Resume
          </Link>
        </div>
      </div>
    </header>
  );
}

function LandingPage({ onOpenModal }) {
  return (
    <div>
      {/* 1. Split Hero Section with Realistic Product UI Mockup */}
      <section className="hero-section">
        <div className="hero-grid">
          <div>
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-dot"></span>
              ATS Screening Engine & Compatibility Analyzer
            </div>
            <h1 className="hero-title">
              Get past recruiter filters. Land more interviews.
            </h1>
            <p className="hero-subtitle">
              Screen your resume against the parsing logic used by Workday, Greenhouse, and Lever.
              Detect missing keyword gaps, fix parser traps, and calculate role alignment before applying.
            </p>

            <div className="hero-cta-group">
              <Link to="/upload" className="btn-rezoom-primary btn-rezoom-lg">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                Scan Your Resume
              </Link>
              <Link to="/job-description" className="btn-rezoom-secondary btn-rezoom-lg">
                Compare Job Description
              </Link>
            </div>

            <div className="hero-trust-badges">
              <span className="trust-badge-label">Verified For:</span>
              <div className="trust-logos-strip">
                <span className="ats-tag">Workday</span>
                <span className="ats-tag">Greenhouse</span>
                <span className="ats-tag">Lever</span>
                <span className="ats-tag">Taleo</span>
                <span className="ats-tag">iCIMS</span>
              </div>
            </div>
          </div>

          {/* Realistic Product UI Mockup */}
          <div className="product-mockup-wrapper" aria-label="Rezoom ATS Inspector Live Preview">
            <div className="mockup-header-bar">
              <div className="mockup-dots">
                <div className="mockup-dot"></div>
                <div className="mockup-dot"></div>
                <div className="mockup-dot"></div>
              </div>
              <div className="mockup-file-name">elena_vasquez_lead_engineer.pdf</div>
              <span className="mockup-status-badge">● Parsed</span>
            </div>

            <div className="mockup-body">
              <div className="mockup-score-banner">
                <div>
                  <div className="mockup-score-meta">ATS Compatibility Score</div>
                  <div className="mockup-score-number">88 / 100</div>
                </div>
                <div className="text-end">
                  <span className="badge" style={{ backgroundColor: 'var(--color-primary-subtle)', color: 'var(--color-primary)', border: '1px solid var(--color-primary-border)', padding: '6px 12px', borderRadius: '20px', fontWeight: 600 }}>
                    High Interview Probability
                  </span>
                  <div style={{ fontSize: '11px', color: 'var(--color-text-subtle)', marginTop: '4px' }}>
                    Ranked top 5% of candidate batch
                  </div>
                </div>
              </div>

              <div className="d-flex flex-column gap-2">
                <div className="mockup-check-item">
                  <div className="mockup-check-icon mockup-check-pass">✓</div>
                  <div className="w-100">
                    <div className="d-flex justify-content-between align-items-center">
                      <strong style={{ fontSize: '13px' }}>Structural Formatting</strong>
                      <span style={{ fontSize: '11px', color: 'var(--color-primary)', fontWeight: 600 }}>100% Parseable</span>
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                      Single-column layout with standard headings detected. No unparseable tables or text boxes.
                    </div>
                  </div>
                </div>

                <div className="mockup-check-item">
                  <div className="mockup-check-icon mockup-check-pass">✓</div>
                  <div className="w-100">
                    <div className="d-flex justify-content-between align-items-center">
                      <strong style={{ fontSize: '13px' }}>Core Competency Matches</strong>
                      <span style={{ fontSize: '11px', color: 'var(--color-primary)', fontWeight: 600 }}>18 / 21 Found</span>
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                      Python, Distributed Systems, PostgreSQL, AWS ECS, Microservices verified.
                    </div>
                  </div>
                </div>

                <div className="mockup-check-item">
                  <div className="mockup-check-icon mockup-check-alert">!</div>
                  <div className="w-100">
                    <div className="d-flex justify-content-between align-items-center">
                      <strong style={{ fontSize: '13px' }}>Missing Requisition Keywords</strong>
                      <span style={{ fontSize: '11px', color: 'var(--color-accent)', fontWeight: 600 }}>Action Required</span>
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                      Missing: <code style={{ color: 'var(--color-accent)' }}>Kubernetes orchestration</code>, <code style={{ color: 'var(--color-accent)' }}>CI/CD pipelines</code>
                    </div>
                  </div>
                </div>

                <div className="mockup-check-item">
                  <div className="mockup-check-icon mockup-check-pass">✓</div>
                  <div className="w-100">
                    <div className="d-flex justify-content-between align-items-center">
                      <strong style={{ fontSize: '13px' }}>Quantified Achievement Metrics</strong>
                      <span style={{ fontSize: '11px', color: 'var(--color-primary)', fontWeight: 600 }}>92% Strong</span>
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                      Strong action verbs and measurable business impacts present in 8 of 9 bullet points.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Full-Width Dark Band for Stats & Empirical Proof */}
      <section className="dark-stats-band" aria-label="Performance Metrics">
        <div className="stats-container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-value">84%</div>
              <p className="stat-label">Higher first-round interview rate after optimizing ATS keyword density</p>
            </div>
            <div className="stat-item">
              <div className="stat-value">&lt; 3s</div>
              <p className="stat-label">Instant multi-page PDF & DOCX text parsing and layout validation</p>
            </div>
            <div className="stat-item">
              <div className="stat-value">99.2%</div>
              <p className="stat-label">Parser extraction fidelity matching Workday and Greenhouse algorithms</p>
            </div>
            <div className="stat-item">
              <div className="stat-value">12,400+</div>
              <p className="stat-label">Resumes successfully benchmarked against open job requisitions</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Alternating Feature & Proof Rows */}
      <section className="py-5" id="features">
        {/* Row 1: Keyword Analysis */}
        <div className="feature-row">
          <div>
            <span className="feature-callout-pill">Keyword Gap Discovery</span>
            <h2 className="h1-title mb-3">
              Know exactly what the recruiter's filter searches for
            </h2>
            <p className="lead mb-3">
              Recruiters configure ATS algorithms with strict Boolean queries and competency filters.
              If your resume phrases skills differently than the job posting, your file is dropped before human review.
            </p>
            <p className="mb-4">
              Rezoom compares your experience against any posted job description. It generates an itemized keyword audit showing precisely which tools, methodologies, and credentials to weave into your bullet points.
            </p>
            <Link to="/job-description" className="btn-rezoom-primary">
              Run Role Comparison
            </Link>
          </div>

          <div className="card p-4" style={{ backgroundColor: 'var(--bg-surface)' }}>
            <div className="d-flex justify-content-between align-items-center pb-3 mb-3 border-bottom">
              <div>
                <strong style={{ fontSize: '14px', fontFamily: 'var(--font-heading)' }}>Requisition Skill Audit</strong>
                <div style={{ fontSize: '12px', color: 'var(--color-text-subtle)' }}>Staff Distributed Systems Engineer</div>
              </div>
              <span className="ats-tag">Target: Senior Band</span>
            </div>

            <div className="mb-3">
              <div className="d-flex justify-content-between mb-1" style={{ fontSize: '12px' }}>
                <span className="fw-bold">Matched Skills (86%)</span>
                <span style={{ color: 'var(--color-primary)' }}>12 Detected</span>
              </div>
              <div className="d-flex flex-wrap gap-1">
                <span className="keyword-badge" style={{ backgroundColor: 'var(--color-primary-subtle)', color: 'var(--color-primary)', borderColor: 'var(--color-primary-border)' }}>✓ Golang</span>
                <span className="keyword-badge" style={{ backgroundColor: 'var(--color-primary-subtle)', color: 'var(--color-primary)', borderColor: 'var(--color-primary-border)' }}>✓ Kafka</span>
                <span className="keyword-badge" style={{ backgroundColor: 'var(--color-primary-subtle)', color: 'var(--color-primary)', borderColor: 'var(--color-primary-border)' }}>✓ gRPC</span>
                <span className="keyword-badge" style={{ backgroundColor: 'var(--color-primary-subtle)', color: 'var(--color-primary)', borderColor: 'var(--color-primary-border)' }}>✓ PostgreSQL</span>
                <span className="keyword-badge" style={{ backgroundColor: 'var(--color-primary-subtle)', color: 'var(--color-primary)', borderColor: 'var(--color-primary-border)' }}>✓ AWS DynamoDB</span>
              </div>
            </div>

            <div>
              <div className="d-flex justify-content-between mb-1" style={{ fontSize: '12px' }}>
                <span className="fw-bold text-danger">Missing Crucial Competencies</span>
                <span style={{ color: 'var(--color-accent)' }}>2 High Priority</span>
              </div>
              <div className="d-flex flex-wrap gap-1">
                <span className="keyword-badge" style={{ backgroundColor: 'var(--color-accent-subtle)', color: '#92400E', borderColor: 'var(--color-accent-border)' }}>+ Terraform IaC</span>
                <span className="keyword-badge" style={{ backgroundColor: 'var(--color-accent-subtle)', color: '#92400E', borderColor: 'var(--color-accent-border)' }}>+ Observability (OpenTelemetry)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Formatting Safety */}
        <div className="feature-row feature-row-reverse">
          <div>
            <span className="feature-callout-pill">Layout & Syntax Safety</span>
            <h2 className="h1-title mb-3">
              Avoid formatting bugs that discard qualified applications
            </h2>
            <p className="lead mb-3">
              Two-column designs, tables, skill rating bars, and headers/footers often get jumbled or completely ignored by ATS parsers.
            </p>
            <p className="mb-4">
              Rezoom inspects the raw text stream extracted from your document just like an ATS parser does. It flags unreadable sections so you can be confident your work history is ingested properly.
            </p>
            <Link to="/upload" className="btn-rezoom-secondary">
              Inspect Parsed Resume Text
            </Link>
          </div>

          <div className="card p-4" style={{ backgroundColor: 'var(--bg-surface)' }}>
            <div className="pb-3 mb-3 border-bottom">
              <strong style={{ fontSize: '14px', fontFamily: 'var(--font-heading)' }}>ATS Ingestion Inspection</strong>
              <div style={{ fontSize: '12px', color: 'var(--color-text-subtle)' }}>Parser stream verification</div>
            </div>

            <div className="p-3 mb-3 rounded" style={{ backgroundColor: 'var(--bg-surface-subtle)', border: '1px solid var(--color-border)', fontFamily: 'var(--font-mono)', fontSize: '12px', lineHeight: '1.6' }}>
              <div style={{ color: 'var(--color-primary)', fontWeight: 600 }}>[PARSER NODE 01: CONTACT]</div>
              <div>Elena Vasquez | Lead Engineer | San Francisco, CA | elena@example.com</div>
              <div style={{ color: 'var(--color-primary)', fontWeight: 600, marginTop: '8px' }}>[PARSER NODE 02: EXPERIENCE]</div>
              <div>Staff Infrastructure Engineer &mdash; CloudScale Systems (2021 - Present)</div>
              <div style={{ color: 'var(--color-text-muted)' }}>&bull; Architected high-throughput ingestion pipeline processing 45k events/sec with 99.99% uptime.</div>
            </div>

            <div className="d-flex align-items-center gap-2" style={{ fontSize: '12px', color: 'var(--color-primary)', fontWeight: 600 }}>
              <span className="mockup-check-icon mockup-check-pass">✓</span>
              Structured nodes successfully separated into standard ATS database tables
            </div>
          </div>
        </div>
      </section>

      {/* 4. Single Bento Grid for Platform Capabilities */}
      <section className="bento-section">
        <div className="text-center mb-4">
          <span className="feature-callout-pill">Complete Candidate Toolkit</span>
          <h2 className="h1-title mt-2">Engineered for candidate precision</h2>
          <p className="lead mx-auto" style={{ maxWidth: '640px' }}>
            Everything you need to calibrate your credentials, satisfy applicant tracking rules, and win interviews.
          </p>
        </div>

        <div className="bento-grid">
          {/* Tile 1: Large Bento Tile */}
          <div className="bento-card bento-card-large">
            <div>
              <div className="feature-badge-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <h3 className="h3-title">ATS Match Score Engine</h3>
              <p>
                Immediate 0–100 compatibility rating calculated against specific requisitions.
                Know your interview readiness before submitting your application to hiring portals.
              </p>
            </div>
            <div className="p-3 mt-3 rounded" style={{ backgroundColor: 'var(--bg-surface-subtle)', border: '1px solid var(--color-border)' }}>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span style={{ fontSize: '12px', fontWeight: 600 }}>Overall ATS Compatibility Index</span>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-primary)' }}>88% Pass Rating</span>
              </div>
              <div style={{ height: '8px', backgroundColor: 'var(--color-border)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '88%', height: '100%', backgroundColor: 'var(--color-primary)' }}></div>
              </div>
            </div>
          </div>

          {/* Tile 2 */}
          <div className="bento-card">
            <div>
              <div className="feature-badge-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
              </div>
              <h3 className="h3-title">Actionable Suggestions</h3>
              <p>
                Editorial advice tailored to ATS requirements: replacing passive verbs with quantified deliverables and fixing ambiguous job titles.
              </p>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--color-primary)', fontWeight: 600 }}>
              &rarr; AI feedback on every bullet
            </div>
          </div>

          {/* Tile 3 */}
          <div className="bento-card">
            <div>
              <div className="feature-badge-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
              </div>
              <h3 className="h3-title">Live Text Extraction</h3>
              <p>
                Inspect your extracted resume text exactly as applicant tracking parsers read it, exposing lost sections or misread fonts.
              </p>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--color-primary)', fontWeight: 600 }}>
              &rarr; Multi-format support (PDF, DOCX, TXT)
            </div>
          </div>

          {/* Tile 4: Large Bento Tile */}
          <div className="bento-card bento-card-large">
            <div>
              <div className="feature-badge-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <h3 className="h3-title">Candidate Privacy Guarantee</h3>
              <p>
                Your resumes and private employment histories are analyzed ephemerally in-memory and are never stored, sold to recruitment brokers, or used for model retraining.
              </p>
            </div>
            <div className="d-flex align-items-center gap-3 mt-2" style={{ fontSize: '12px', color: 'var(--color-text-subtle)' }}>
              <span>✓ Ephemeral parsing</span>
              <span>✓ SSL 256-bit encryption</span>
              <span>✓ GDPR compliant</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Clean 3-Step Walkthrough Section */}
      <section className="py-5" id="how-it-works">
        <div className="text-center mb-4">
          <span className="feature-callout-pill">Workflow</span>
          <h2 className="h1-title mt-2">How to optimize your resume with Rezoom</h2>
        </div>

        <div className="row g-4">
          <div className="col-md-4">
            <Card
              tag="Step 01"
              title="Upload Your Resume"
              description="Drop in your current PDF or DOCX file. Our engine extracts the text nodes and scans for structural ATS compatibility."
            />
          </div>
          <div className="col-md-4">
            <Card
              tag="Step 02"
              title="Paste Job Requisition"
              description="Input the job description for your target role. Rezoom identifies required skills, toolsets, and keywords missing from your file."
            />
          </div>
          <div className="col-md-4">
            <Card
              tag="Step 03"
              title="Apply With Confidence"
              description="Apply the line-by-line editorial suggestions, verify your updated match score, and submit your application with high ATS clearance."
            />
          </div>
        </div>
      </section>

      {/* 6. High-Contrast Bottom Call-To-Action Banner */}
      <section className="card p-5 my-5 text-center" style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--color-border-strong)' }}>
        <h2 className="display-title mb-2">Ready to test your resume?</h2>
        <p className="lead mx-auto mb-4" style={{ maxWidth: '580px' }}>
          Upload your document now and receive instant ATS scoring, keyword gap breakdown, and structural parsing feedback.
        </p>
        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <Link to="/upload" className="btn-rezoom-primary btn-rezoom-lg">
            Upload Resume for Free
          </Link>
          <Link to="/job-description" className="btn-rezoom-secondary btn-rezoom-lg">
            Compare With Job Description
          </Link>
        </div>
      </section>
    </div>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div>
            <div className="brand-mark mb-2">
              <div className="brand-icon">R</div>
              <span>Rezoom</span>
            </div>
            <p style={{ maxWidth: '320px', fontSize: '13px' }}>
              Professional ATS resume optimization and job description compatibility matcher.
              Engineered to ensure qualified candidates get past automated screening filters.
            </p>
            <div className="system-status-indicator">
              <span className="status-dot-active"></span>
              <span>All ATS parser engines operational</span>
            </div>
          </div>

          <div>
            <div className="footer-col-title">Platform</div>
            <ul className="footer-link-list">
              <li><Link to="/upload">Resume Scanner</Link></li>
              <li><Link to="/job-description">Job Matcher</Link></li>
              <li><a href="#how-it-works">ATS Benchmarks</a></li>
              <li><a href="#features">Keyword Gap Engine</a></li>
            </ul>
          </div>

          <div>
            <div className="footer-col-title">Resources</div>
            <ul className="footer-link-list">
              <li><a href="#ats-guide" onClick={(e) => e.preventDefault()}>ATS Formatting Checklist</a></li>
              <li><a href="#action-verbs" onClick={(e) => e.preventDefault()}>Quantified Verbs Guide</a></li>
              <li><a href="#workday" onClick={(e) => e.preventDefault()}>Workday Parsing Tips</a></li>
              <li><a href="#greenhouse" onClick={(e) => e.preventDefault()}>Greenhouse Scoring Rules</a></li>
            </ul>
          </div>

          <div>
            <div className="footer-col-title">Candidate Privacy</div>
            <ul className="footer-link-list">
              <li><a href="#privacy" onClick={(e) => e.preventDefault()}>Privacy Policy</a></li>
              <li><a href="#terms" onClick={(e) => e.preventDefault()}>Terms of Service</a></li>
              <li><a href="#security" onClick={(e) => e.preventDefault()}>Security & Ephemeral Storage</a></li>
              <li><a href="mailto:support@rezoom.ai">Contact Engineering Support</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            &copy; {new Date().getFullYear()} Rezoom Technologies Inc. All rights reserved.
          </div>
          <div>
            Designed for professional recruitment standards &bull; WCAG 2.1 AA Compliant
          </div>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <Router>
      <div className="app-container">
        <Navigation onOpenModal={() => setModalOpen(true)} />

        <main id="main-content" tabIndex="-1">
          <Routes>
            {/* Landing Page */}
            <Route path="/" element={<LandingPage onOpenModal={() => setModalOpen(true)} />} />

            {/* Upload Page */}
            <Route path="/upload" element={<Upload />} />

            {/* Job Description Page */}
            <Route path="/job-description" element={<JobDescription />} />
          </Routes>
        </main>

        <SiteFooter />

        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
      </div>
    </Router>
  );
}

export default App;
