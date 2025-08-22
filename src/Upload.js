import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Upload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [parsedText, setParsedText] = useState('');
  const [atsScore, setAtsScore] = useState(null);
  const [displayScore, setDisplayScore] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (atsScore !== null) {
      let start = 0;
      const interval = setInterval(() => {
        start += 1;
        if (start > atsScore) {
          clearInterval(interval);
        } else {
          setDisplayScore(start);
        }
      }, 20);
    }
  }, [atsScore]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file!");

    setLoading(true);
    setMessage('');
    setParsedText('');
    setAtsScore(null);
    setSuggestions([]);

    const formData = new FormData();
    formData.append('resume', file);

    try {
      const res = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setMessage(res.data.message || "Resume processed successfully!");
      setParsedText(res.data.text || 'No text extracted.');
      setAtsScore(res.data.atsScore || 0);
      setSuggestions(Array.isArray(res.data.suggestions) ? res.data.suggestions : []);

    } catch (err) {
      console.error(err);
      setMessage("Upload failed. Try again.");
    }

    setLoading(false);
  };

  const getColor = (score) => {
    if (score < 40) return "#ff4d4d";
    if (score < 70) return "#ffc107";
    return "#28a745";
  };

  return (
    <div className="upload-fullpage d-flex flex-column justify-content-center align-items-center min-vh-100">
      <form
        onSubmit={handleUpload}
        className="upload-form d-flex flex-column align-items-center w-100"
        style={{ maxWidth: 600, width: "100%" }}
      >
        <input
          type="file"
          accept=".pdf"
          className="upload-input"
          style={{
            fontSize: "1.25rem",
            padding: "1.2rem",
            borderRadius: "12px",
            background: "linear-gradient(120deg, #181a2a 0%, #23244a 100%)",
            color: "#e3e8ff",
            border: "2px solid #2d2e6e",
            boxShadow: "0 2px 8px #0a0033",
            width: "100%",
            minHeight: "70px"
          }}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button
          className="upload-btn"
          type="submit"
          disabled={loading}
          style={{
            fontSize: "1.15rem",
            padding: "0.75rem 2.5rem",
            borderRadius: "10px",
            marginTop: "0.5rem",
            background: "linear-gradient(90deg, #2d2e6e 0%, #1a1747 100%)",
            color: "#f8faff",
            border: "none",
            boxShadow: "0 2px 8px #0a0033",
            fontWeight: "600",
            letterSpacing: "1px"
          }}
        >
          {loading ? 'Processing...' : 'Upload Resume'}
        </button>
      </form>

      {message && <p className="mt-3">{message}</p>}

      {/* Resume Preview */}
      {parsedText && (
        <div className="parsed-preview mt-4 p-4 border rounded w-100" style={{ maxWidth: 700 }}>
          <h5>📄 Resume Preview:</h5>
          <p style={{ whiteSpace: 'pre-wrap' }}>
            {parsedText}
          </p>
        </div>
      )}

      {/* ATS Score - Circular Progress */}
      {atsScore !== null && (
        <div className="mt-4 text-center w-100" style={{ maxWidth: 350 }}>
          <h5>📊 ATS Score:</h5>
          <div style={{ position: "relative", width: "150px", height: "150px", margin: "0 auto" }}>
            <svg width="150" height="150">
              <circle
                cx="75"
                cy="75"
                r="65"
                stroke="#eee"
                strokeWidth="10"
                fill="none"
              />
              <circle
                cx="75"
                cy="75"
                r="65"
                stroke={getColor(displayScore)}
                strokeWidth="10"
                fill="none"
                strokeDasharray={2 * Math.PI * 65}
                strokeDashoffset={2 * Math.PI * 65 * (1 - displayScore / 100)}
                strokeLinecap="round"
                style={{
                  transition: "stroke-dashoffset 0.3s ease, stroke 0.5s ease",
                  filter: `drop-shadow(0 0 8px ${getColor(displayScore)})`
                }}
              />
            </svg>
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: "24px",
                fontWeight: "bold",
                color: getColor(displayScore),
                textShadow: `0 0 10px ${getColor(displayScore)}`
              }}
            >
              {displayScore}%
            </div>
          </div>
        </div>
      )}

      {/* AI Suggestions */}
      {suggestions.length > 0 && (
        <div className="ai-suggestions mt-4 p-4 border rounded w-100" style={{ maxWidth: 700 }}>
          <h5>💡 AI Suggestions:</h5>
          <ul className="mb-0">
            {suggestions.map((s, i) => (
              <li key={i}><strong>•</strong> {s}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Upload;