import React, { useState } from 'react';
import { API_URL } from './api';

function Upload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [parsedText, setParsedText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return setMessage("Please select a file!");

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
      setMessage("Upload failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-page d-flex flex-column justify-content-center align-items-center min-vh-100">
      <div className="upload-container">
        {/* Upload Form */}
        <form onSubmit={handleUpload} className="d-flex flex-column">
          <input
            type="file"
            accept=".pdf,.docx,.txt"
            className="upload-input"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button
            className="upload-btn align-self-start"
            type="submit"
            disabled={loading}
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
