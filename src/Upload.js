// Upload.js
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
      }, 20); // speed
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

  // ✅ Format AI suggestions into bullet points
  const renderSuggestions = () => {
    if (!suggestions) return null;

    const points = suggestions
      .split('\n')
      .map(p => p.trim())
      .filter(p => p.length > 0);

    return (
      <ul style={{ paddingLeft: '20px' }}>
        {points.map((point, index) => {
          const words = point.split(' ');
          const boldPart = words.slice(0, 3).join(' ');
          const restPart = words.slice(3).join(' ');

          return (
            <li key={index} style={{ marginBottom: '8px', lineHeight: '1.5' }}>
              <strong>{boldPart}</strong> {restPart}
            </li>
          );
        })}
      </ul>
    );
  };

  // ✅ Function for color gradient based on score
  const getColor = (score) => {
    if (score < 40) return "#ff4d4d"; // red
    if (score < 70) return "#ffc107"; // yellow
    return "#28a745"; // green
  };

  return (
    <div className="mb-4">
      <form onSubmit={handleUpload}>
        <input
          type="file"
          accept=".pdf"
          className="form-control mb-2"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Upload Resume'}
        </button>
      </form>

      {message && <p className="mt-2">{message}</p>}

    {/* Resume Preview */}
{parsedText && (
  <div className="parsed-preview mt-3 p-3 border rounded">
    <h5>📄 Resume Preview:</h5>
    <p style={{ whiteSpace: 'pre-wrap' }}>
      {parsedText}
    </p>
  </div>
)}

      {/* ATS Score - Circular Progress */}
      {atsScore !== null && (
        <div className="mt-4 text-center">
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
  <div className="ai-suggestions mt-3 p-3 border rounded">
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
