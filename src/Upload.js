import React, { useState } from 'react';
import axios from 'axios';

function Upload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [parsedText, setParsedText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file!");

    setLoading(true);
    setMessage('');
    setParsedText('');
    setSuggestions([]);

    const formData = new FormData();
    formData.append('resume', file);
   
   
   try {
  const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://rezoom-1.onrender.com";

  const res = await axios.post(`${API_URL}/api/upload`, formData, {
  headers: { 'Content-Type': 'multipart/form-data' },
 });

  setMessage(res.data.message || "Resume processed successfully!");
  setParsedText(res.data.text || "No text extracted.");
  setSuggestions(
    Array.isArray(res.data.suggestions) ? res.data.suggestions : []
  );
} catch (err) {
  console.error(err);
  setMessage("Upload failed. Try again.");
}


    setLoading(false);
  };

  return (
    <div 
      className="upload-page d-flex flex-column justify-content-center align-items-center min-vh-100"
      style={{ padding: "20px" }}
    >
      <div 
        className="upload-container"
        style={{
          maxWidth: "700px",
          width: "100%",
          textAlign: "left"   // 🔑 Align all child content left
        }}
      >
        {/* Upload Form */}
        <form onSubmit={handleUpload} className="d-flex flex-column">
          <input
            type="file"
            accept=".pdf"
            className="upload-input"
            style={{
              fontSize: "1.1rem",
              padding: "1rem",
              borderRadius: "12px",
              background: "linear-gradient(120deg, #181a2a 0%, #23244a 100%)",
              color: "#e3e8ff",
              border: "2px solid #2d2e6e",
              boxShadow: "0 2px 8px #0a0033",
              width: "100%",
              marginBottom: "1rem"
            }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button
            className="upload-btn align-self-start"
            type="submit"
            disabled={loading}
            style={{
              fontSize: "1.1rem",
              padding: "0.75rem 2rem",
              borderRadius: "10px",
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
          <div className="parsed-preview mt-4 p-4 border rounded">
            <h5>📄 Resume Preview:</h5>
            <p style={{ whiteSpace: 'pre-wrap' }}>
              {parsedText}
            </p>
          </div>
        )}

        {/* AI Suggestions */}
        {suggestions.length > 0 && (
          <div className="ai-suggestions mt-4 p-4 border rounded">
            <h5>💡 AI Suggestions:</h5>
            <ul className="mb-0">
              {suggestions.map((s, i) => (
                <li key={i}><strong>•</strong> {s}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Upload;
