import React, { useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function JobDescription() {
  const [jobDescription, setJobDescription] = useState("");
  const [resume, setResume] = useState(null);
  const [score, setScore] = useState(null);
  const [missingKeywords, setMissingKeywords] = useState([]);

  const handleFileUpload = (e) => {
    setResume(e.target.files[0]);
  };

   const handleCompare = async () => {
    if (!jobDescription || !resume) {
      alert("Please upload resume and enter job description!");
      return;
    }
const formData = new FormData();
formData.append("resume", resume);
formData.append("jobDescription", jobDescription);

try {
  const API_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : "https://rezoom-1.onrender.com";

  const res = await fetch(`${API_URL}/api/compare`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  if (res.ok) {
    setScore(data.score);
    setMissingKeywords(data.missingKeywords || []);
  } else {
    alert(data.message || "Error comparing resume and job description");
  }
} catch (error) {
  console.error("Error:", error);
  alert("Something went wrong while comparing!");
}
   }

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Compare Resume with Job Description</h2>

      <div className="mb-3">
        <label className="form-label fw-bold">Paste Job Description</label>
        <textarea
          className="form-control"
          rows="6"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the job description here..."
        ></textarea>
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold">Upload Your Resume</label>
        <input
          type="file"
          className="form-control"
          accept=".pdf,.doc,.docx,.txt"
          onChange={handleFileUpload}
        />
      </div>

      <div className="text-center">
        <button className="btn btn-primary btn-lg" onClick={handleCompare}>
          Compare Now
        </button>
      </div>

      {score !== null && (
        <div className="mt-5 text-center">
          <h4>Match Score</h4>
          <div style={{ width: 150, margin: "0 auto" }}>
            <CircularProgressbar
              value={score}
              text={`${score}%`}
              styles={buildStyles({
                textColor: "#333",
                pathColor:
                  score < 50 ? "red" : score < 75 ? "orange" : "green",
                trailColor: "#ddd",
              })}
            />
          </div>

          <div className="mt-4">
            <h5>Missing Keywords</h5>
            <ul className="list-group w-50 mx-auto">
              {missingKeywords.map((keyword, idx) => (
                <li key={idx} className="list-group-item">
                  {keyword}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default JobDescription;
