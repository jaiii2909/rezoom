// Upload.js
import React, { useState } from 'react';
import axios from 'axios';

function Upload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [parsedText, setParsedText] = useState('');
  const [atsScore, setAtsScore] = useState(null);
  const [suggestions, setSuggestions] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file!");

    setLoading(true);
    setMessage('');
    setParsedText('');
    setAtsScore(null);
    setSuggestions('');

    const formData = new FormData();
    formData.append('resume', file);

    try {
      // ✅ Single API call
      const res = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setMessage(res.data.message || "Resume processed successfully!");
      setParsedText(res.data.text || 'No text extracted.');
      setAtsScore(res.data.atsScore || 0);
      setSuggestions(res.data.suggestions || 'No suggestions available.');
    } catch (err) {
      console.error(err);
      setMessage("Upload failed. Try again.");
    }

    setLoading(false);
  };

  // ✅ Format AI suggestions into bullet points
  const renderSuggestions = () => {
    if (!suggestions) return null;

    // Split text into lines, remove empty lines
    const points = suggestions
      .split('\n')
      .map(p => p.trim())
      .filter(p => p.length > 0);

    return (
      <ul style={{ paddingLeft: '20px' }}>
        {points.map((point, index) => {
          // Bold the first few words
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
        <div className="mt-3 p-3 border rounded bg-light">
          <h5>📄 Resume Preview:</h5>
          <p style={{ whiteSpace: 'pre-wrap' }}>
            {parsedText}
          </p>
        </div>
      )}

      {/* ATS Score */}
      {atsScore !== null && (
        <div className="mt-3 p-3 border rounded bg-white">
          <h5>📊 ATS Score:</h5>
          <div
            style={{
              height: '20px',
              background: '#eee',
              borderRadius: '10px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${atsScore}%`,
                background: atsScore > 70 ? '#28a745' : '#ffc107',
                transition: 'width 1.5s ease-in-out',
              }}
            />
          </div>
          <p className="mt-1">{atsScore}%</p>
        </div>
      )}

      {/* AI Suggestions */}
      {suggestions && (
        <div className="mt-3 p-3 border rounded bg-light">
          <h5>💡 AI Suggestions:</h5>
          {renderSuggestions()}
        </div>
      )}
    </div>
  );
}

export default Upload;
