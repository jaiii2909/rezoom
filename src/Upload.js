import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from './api';

function Upload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [parsedText, setParsedText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please select a resume file (.pdf, .docx, or .txt).");
      return;
    }

    setLoading(true);
    setMessage('');
    setParsedText('');
    setSuggestions([]);

    const formData = new FormData();
    formData.append('resume', file);

    try {
      const res = await fetch(`${API_URL}/api/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Upload failed. Try again.");
        return;
      }

      setMessage(data.message || "Resume processed successfully!");
      setParsedText(data.text || "No text extracted.");
      setSuggestions(Array.isArray(data.suggestions) ? data.suggestions : []);
    } catch (err) {
      console.error(err);
      setMessage("Upload failed. Could not connect to the parsing server.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyText = () => {
    if (!parsedText) return;
    navigator.clipboard.writeText(parsedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const wordCount = parsedText
    ? parsedText.trim().split(/\s+/).filter(Boolean).length
    : 0;

  return (
    <div className="upload-page py-4">
      {/* Header & Breadcrumb */}
      <div className="mb-4">
        <nav aria-label="breadcrumb" className="mb-2">
          <span style={{ fontSize: '13px', color: 'var(--color-text-subtle)' }}>
            <Link to="/" style={{ color: 'var(--color-text-muted)' }}>Home</Link> &nbsp;/&nbsp; Resume Scanner & ATS Diagnostics
          </span>
        </nav>
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
          <div>
            <h1 className="h1-title mb-1">Resume Scanner & ATS Inspector</h1>
            <p className="mb-0" style={{ maxWidth: '680px' }}>
              Upload your resume to extract the raw text stream, test parser safety, and receive line-by-line ATS suggestions.
            </p>
          </div>
          <Link to="/job-description" className="btn-rezoom-secondary">
            Go to Job Matcher &rarr;
          </Link>
        </div>
      </div>

      <div className="row g-4">
        {/* Left / Ingestion Column */}
        <div className="col-lg-5">
          <div className="card h-100">
            <h2 className="card-title mb-3" style={{ fontSize: '1.125rem' }}>
              Select Resume Document
            </h2>

            <form onSubmit={handleUpload}>
              <div className="dropzone-container mb-3">
                <input
                  type="file"
                  id="resume-file-input"
                  accept=".pdf,.docx,.txt"
                  className="dropzone-input-hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setFile(e.target.files[0]);
                      setMessage('');
                    }
                  }}
                  aria-label="Upload resume file"
                />
                <div className="dropzone-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                </div>

                {file ? (
                  <div>
                    <strong style={{ fontSize: '14px', color: 'var(--color-text-main)', display: 'block' }}>
                      {file.name}
                    </strong>
                    <span style={{ fontSize: '12px', color: 'var(--color-primary)', fontWeight: 600 }}>
                      {(file.size / 1024).toFixed(1)} KB &bull; Ready to scan
                    </span>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-subtle)', marginTop: '4px' }}>
                      Click to choose a different file
                    </div>
                  </div>
                ) : (
                  <div>
                    <strong style={{ fontSize: '14px', color: 'var(--color-text-main)', display: 'block' }}>
                      Click to browse or drop your resume here
                    </strong>
                    <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                      Supports PDF, DOCX, or TXT (Max 10 MB)
                    </span>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="btn-rezoom-primary w-100"
                style={{ padding: '12px' }}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Extracting & Analyzing...
                  </>
                ) : (
                  'Scan Resume for ATS Compatibility'
                )}
              </button>
            </form>

            {message && (
              <div
                className="mt-3 p-3 rounded"
                style={{
                  fontSize: '13px',
                  backgroundColor: message.includes('failed') || message.includes('Please select')
                    ? 'var(--color-danger-subtle)'
                    : 'var(--color-primary-subtle)',
                  color: message.includes('failed') || message.includes('Please select')
                    ? 'var(--color-danger)'
                    : 'var(--color-primary)',
                  border: `1px solid ${message.includes('failed') || message.includes('Please select') ? 'var(--color-danger-border)' : 'var(--color-primary-border)'}`
                }}
              >
                {message}
              </div>
            )}

            {/* ATS Parsing Guide Card */}
            <div className="mt-4 p-3 rounded" style={{ backgroundColor: 'var(--bg-surface-subtle)', border: '1px solid var(--color-border)' }}>
              <div className="d-flex align-items-center gap-2 mb-2">
                <span className="ats-tag">ATS Best Practices</span>
                <span style={{ fontSize: '12px', fontWeight: 600 }}>Parser Compatibility</span>
              </div>
              <ul className="mb-0 ps-3" style={{ fontSize: '12px', color: 'var(--color-text-muted)', lineHeight: '1.7' }}>
                <li>Standardize section titles (e.g. Work Experience, Skills).</li>
                <li>Avoid multi-column tables, text boxes, and icons.</li>
                <li>Include explicit month/year dates for experience parsing.</li>
                <li>Ensure contact email and phone number are in plain body text.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right / Results Column */}
        <div className="col-lg-7">
          {parsedText ? (
            <div className="d-flex flex-column gap-4">
              {/* Short Summary Metric Strip */}
              <div className="p-3 rounded" style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--color-border)' }}>
                <div className="row g-3 text-center">
                  <div className="col-4 border-end">
                    <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--color-text-subtle)', fontWeight: 600 }}>
                      Ingestion Status
                    </div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-primary)', marginTop: '2px' }}>
                      100% Parseable
                    </div>
                  </div>
                  <div className="col-4 border-end">
                    <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--color-text-subtle)', fontWeight: 600 }}>
                      Extracted Words
                    </div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-main)', marginTop: '2px' }}>
                      {wordCount} Words
                    </div>
                  </div>
                  <div className="col-4">
                    <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--color-text-subtle)', fontWeight: 600 }}>
                      Suggestions
                    </div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: suggestions.length > 0 ? 'var(--color-accent)' : 'var(--color-primary)', marginTop: '2px' }}>
                      {suggestions.length} Findings
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Editorial Suggestions */}
              {suggestions.length > 0 && (
                <div className="card">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="d-flex align-items-center gap-2">
                      <span className="badge" style={{ backgroundColor: 'var(--color-primary-subtle)', color: 'var(--color-primary)', border: '1px solid var(--color-primary-border)', padding: '5px 10px', borderRadius: '4px' }}>
                        AI Feedback
                      </span>
                      <h3 className="card-title m-0" style={{ fontSize: '1.1rem' }}>
                        ATS Optimization Suggestions
                      </h3>
                    </div>
                    <span style={{ fontSize: '12px', color: 'var(--color-text-subtle)' }}>
                      {suggestions.length} actionable improvements
                    </span>
                  </div>

                  <div className="d-flex flex-column gap-2">
                    {suggestions.map((s, i) => (
                      <div key={i} className="suggestion-card">
                        <div className="d-flex align-items-start gap-2">
                          <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>#{i + 1}</span>
                          <div>{s}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Raw Parsed Text Inspector */}
              <div className="card">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h3 className="card-title m-0" style={{ fontSize: '1.1rem' }}>
                      Extracted ATS Text Stream
                    </h3>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-subtle)' }}>
                      Plaintext representation as parsed by applicant tracking engines
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyText}
                    className="btn-rezoom-secondary"
                    style={{ padding: '6px 12px', fontSize: '12px' }}
                  >
                    {copied ? '✓ Copied!' : 'Copy Plaintext'}
                  </button>
                </div>

                <div className="parsed-preview">
                  <p>{parsedText}</p>
                </div>
              </div>

              {/* Next Step CTA */}
              <div className="card p-3 d-flex flex-row justify-content-between align-items-center flex-wrap gap-2" style={{ backgroundColor: 'var(--color-primary-subtle)', borderColor: 'var(--color-primary-border)' }}>
                <div>
                  <strong style={{ fontSize: '14px', color: 'var(--color-primary)' }}>
                    Ready to test this resume against a specific role?
                  </strong>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                    Calculate match percentage and find missing required keywords.
                  </div>
                </div>
                <Link to="/job-description" className="btn-rezoom-primary">
                  Compare with Job Description
                </Link>
              </div>
            </div>
          ) : (
            /* Empty state prior to upload */
            <div className="card h-100 d-flex flex-column align-items-center justify-content-center text-center p-5">
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--bg-surface-subtle)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', color: 'var(--color-text-subtle)' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                </svg>
              </div>
              <h3 className="h3-title mb-2">No document parsed yet</h3>
              <p style={{ maxWidth: '420px', fontSize: '14px', color: 'var(--color-text-muted)' }}>
                Select a resume file on the left and click "Scan Resume for ATS Compatibility" to extract text, inspect formatting nodes, and generate editorial suggestions.
              </p>
              <div className="d-flex gap-2 mt-2">
                <span className="ats-tag">PDF</span>
                <span className="ats-tag">DOCX</span>
                <span className="ats-tag">TXT</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Upload;
