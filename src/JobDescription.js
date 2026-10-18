import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { API_URL } from "./api";

const SAMPLE_JOB_DESCRIPTION = `Senior Full-Stack Engineer (Platform Team)
Requirements:
- 5+ years of experience designing and building distributed microservices.
- Strong proficiency in Python, Go, or TypeScript.
- Deep hands-on experience with PostgreSQL, Redis, and message queues (Kafka or RabbitMQ).
- Solid understanding of Docker, Kubernetes container orchestration, and CI/CD pipelines.
- Experience with AWS or GCP cloud infrastructure and Infrastructure as Code (Terraform).
- Track record of mentoring junior engineers and conducting high-quality architectural reviews.`;

function JobDescription() {
  const [jobDescription, setJobDescription] = useState("");
  const [resume, setResume] = useState(null);
  const [score, setScore] = useState(null);
  const [missingKeywords, setMissingKeywords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0]);
      setError("");
    }
  };

  const handleCompare = async () => {
    if (!jobDescription || !resume) {
      setError("Please paste a job description and upload your resume file.");
      return;
    }

    setLoading(true);
    setError("");
    setScore(null);
    setMissingKeywords([]);

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("jobDescription", jobDescription);

    try {
      const res = await fetch(`${API_URL}/api/compare`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (res.ok) {
        setScore(data.score);
        setMissingKeywords(data.missingKeywords || []);
      } else {
        setError(data.message || "Error comparing resume and job description");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Unable to connect to the comparison server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getScoreVerdict = (val) => {
    if (val >= 75) {
      return {
        label: "Strong Role Match",
        color: "var(--color-primary)",
        bg: "var(--color-primary-subtle)",
        border: "var(--color-primary-border)",
        pathColor: "#0D7653",
        text: "Your resume aligns well with core requirements. High probability of passing initial recruiter Boolean searches.",
      };
    }
    if (val >= 50) {
      return {
        label: "Moderate Compatibility",
        color: "var(--color-accent)",
        bg: "var(--color-accent-subtle)",
        border: "var(--color-accent-border)",
        pathColor: "#D97706",
        text: "Your experience matches foundational criteria, but several key technical skills from the job description are missing.",
      };
    }
    return {
      label: "Significant Keyword Gaps",
      color: "var(--color-danger)",
      bg: "var(--color-danger-subtle)",
      border: "var(--color-danger-border)",
      pathColor: "#DC2626",
      text: "Multiple critical requirements and toolsets are absent. High likelihood of being screened out by automated ATS filters.",
    };
  };

  const verdict = score !== null ? getScoreVerdict(score) : null;

  return (
    <div className="py-4">
      {/* Header & Breadcrumb */}
      <div className="mb-4">
        <nav aria-label="breadcrumb" className="mb-2">
          <span style={{ fontSize: '13px', color: 'var(--color-text-subtle)' }}>
            <Link to="/" style={{ color: 'var(--color-text-muted)' }}>Home</Link> &nbsp;/&nbsp; Job Description Compatibility Matcher
          </span>
        </nav>
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
          <div>
            <h1 className="h1-title mb-1">Job Description Matcher</h1>
            <p className="mb-0" style={{ maxWidth: '680px' }}>
              Evaluate keyword alignment, calculate role fit percentage, and pinpoint missing requirements before submitting your application.
            </p>
          </div>
          <Link to="/upload" className="btn-rezoom-secondary">
            &larr; Resume Scanner
          </Link>
        </div>
      </div>

      {/* Dual Workbench Grid */}
      <div className="row g-4">
        {/* Left Column: Job Description */}
        <div className="col-lg-7">
          <div className="card h-100">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <label className="form-label mb-0" htmlFor="jd-textarea">
                Target Job Description
              </label>
              {!jobDescription && (
                <button
                  type="button"
                  onClick={() => setJobDescription(SAMPLE_JOB_DESCRIPTION)}
                  className="btn-rezoom-secondary"
                  style={{ padding: '4px 8px', fontSize: '11px' }}
                >
                  Insert Sample Job Requisition
                </button>
              )}
            </div>

            <textarea
              id="jd-textarea"
              className="form-control"
              rows="12"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the full job requisition here, including responsibilities, requirements, and preferred qualifications..."
              style={{ resize: 'vertical' }}
            ></textarea>

            <div className="d-flex justify-content-between align-items-center mt-2" style={{ fontSize: '12px', color: 'var(--color-text-subtle)' }}>
              <span>Character count: {jobDescription.length}</span>
              {jobDescription && (
                <button
                  type="button"
                  onClick={() => setJobDescription("")}
                  style={{ background: 'none', border: 'none', color: 'var(--color-text-subtle)', cursor: 'pointer', padding: 0 }}
                >
                  Clear text
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Resume Upload & Trigger */}
        <div className="col-lg-5">
          <div className="card h-100 d-flex flex-column justify-content-between">
            <div>
              <label className="form-label mb-2">
                Candidate Resume (.pdf, .docx, .txt)
              </label>

              <div className="dropzone-container mb-3" style={{ padding: '24px 16px' }}>
                <input
                  type="file"
                  id="resume-comparison-file"
                  className="dropzone-input-hidden"
                  accept=".pdf,.docx,.txt"
                  onChange={handleFileUpload}
                  aria-label="Upload candidate resume file"
                />
                <div className="dropzone-icon" style={{ width: '40px', height: '40px', fontSize: '18px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                  </svg>
                </div>

                {resume ? (
                  <div>
                    <strong style={{ fontSize: '14px', color: 'var(--color-text-main)', display: 'block' }}>
                      {resume.name}
                    </strong>
                    <span style={{ fontSize: '12px', color: 'var(--color-primary)', fontWeight: 600 }}>
                      {(resume.size / 1024).toFixed(1)} KB attached
                    </span>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-subtle)', marginTop: '4px' }}>
                      Click to choose different file
                    </div>
                  </div>
                ) : (
                  <div>
                    <strong style={{ fontSize: '14px', color: 'var(--color-text-main)', display: 'block' }}>
                      Upload Resume Document
                    </strong>
                    <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                      PDF, DOCX, or TXT
                    </span>
                  </div>
                )}
              </div>

              {/* Informational checklist */}
              <div className="p-3 rounded mb-3" style={{ backgroundColor: 'var(--bg-surface-subtle)', border: '1px solid var(--color-border)', fontSize: '12px', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                <strong style={{ color: 'var(--color-text-main)', display: 'block', marginBottom: '4px' }}>
                  How Match Scoring Works:
                </strong>
                The matcher extracts core technical competencies, educational requirements, and role-specific keywords from both documents to determine your ATS ranking.
              </div>
            </div>

            <div>
              {error && (
                <div
                  className="p-3 rounded mb-3"
                  style={{
                    fontSize: '13px',
                    backgroundColor: 'var(--color-danger-subtle)',
                    color: 'var(--color-danger)',
                    border: '1px solid var(--color-danger-border)',
                  }}
                >
                  {error}
                </div>
              )}

              <button
                className="btn-rezoom-primary w-100"
                style={{ padding: '12px' }}
                onClick={handleCompare}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Analyzing Keyword Compatibility...
                  </>
                ) : (
                  'Calculate Match Score'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Results Dashboard */}
      {score !== null && verdict && (
        <section className="mt-5" aria-label="Comparison Results">
          <div className="d-flex align-items-center justify-content-between pb-3 mb-4 border-bottom">
            <div>
              <h2 className="h2-title mb-1">ATS Compatibility Analysis</h2>
              <p className="mb-0">
                Evaluation results generated against the provided job description.
              </p>
            </div>
            <span
              className="badge"
              style={{
                backgroundColor: verdict.bg,
                color: verdict.color,
                border: `1px solid ${verdict.border}`,
                padding: '8px 14px',
                borderRadius: 'var(--radius-pill)',
                fontWeight: 700,
                fontSize: '13px',
              }}
            >
              {verdict.label}
            </span>
          </div>

          <div className="row g-4">
            {/* Score Metric Card */}
            <div className="col-md-5">
              <div className="card h-100 text-center p-4 d-flex flex-column justify-content-center align-items-center">
                <span className="ats-tag mb-3">Requisition Fit Index</span>

                <div style={{ width: 140, height: 140, margin: "0 auto" }}>
                  <CircularProgressbar
                    value={score}
                    text={`${score}%`}
                    styles={buildStyles({
                      textColor: "var(--color-text-main)",
                      pathColor: verdict.pathColor,
                      trailColor: "var(--color-border)",
                      textSize: "22px",
                      strokeLinecap: "round",
                    })}
                  />
                </div>

                <div className="mt-4">
                  <h3 className="h3-title mb-1" style={{ fontSize: '1.2rem', color: verdict.color }}>
                    {verdict.label}
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', maxWidth: '300px', margin: '0 auto' }}>
                    {verdict.text}
                  </p>
                </div>
              </div>
            </div>

            {/* Missing Keywords Analysis */}
            <div className="col-md-7">
              <div className="card h-100 p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h3 className="card-title m-0" style={{ fontSize: '1.15rem' }}>
                      Missing Requisition Keywords
                    </h3>
                    <p style={{ fontSize: '12px', color: 'var(--color-text-subtle)', margin: 0 }}>
                      Skills detected in the job posting that are absent from your resume
                    </p>
                  </div>
                  <span className="badge" style={{ backgroundColor: 'var(--color-accent-subtle)', color: '#92400E', border: '1px solid var(--color-accent-border)', padding: '5px 10px' }}>
                    {missingKeywords.length} Missing
                  </span>
                </div>

                {missingKeywords.length > 0 ? (
                  <div>
                    <div className="keyword-badge-grid mb-4" style={{ justifyContent: 'flex-start' }}>
                      {missingKeywords.map((keyword, idx) => (
                        <span key={idx} className="keyword-badge">
                          <span>+</span> {keyword}
                        </span>
                      ))}
                    </div>

                    <div className="p-3 rounded" style={{ backgroundColor: 'var(--bg-surface-subtle)', border: '1px solid var(--color-border)' }}>
                      <strong style={{ fontSize: '13px', color: 'var(--color-text-main)', display: 'block', marginBottom: '6px' }}>
                        How to close this keyword gap:
                      </strong>
                      <ol className="mb-0 ps-3" style={{ fontSize: '12px', color: 'var(--color-text-muted)', lineHeight: '1.7' }}>
                        <li>Add missing competencies to your core skills section using identical terminology.</li>
                        <li>Integrate these tools into bullet points explaining how you utilized them.</li>
                        <li>Re-scan your revised resume to confirm your updated score before applying.</li>
                      </ol>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 text-center my-auto rounded" style={{ backgroundColor: 'var(--color-primary-subtle)', border: '1px solid var(--color-primary-border)' }}>
                    <div style={{ color: 'var(--color-primary)', fontWeight: 700, fontSize: '15px' }}>
                      ✓ Excellent Keyword Coverage!
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', margin: '4px 0 0' }}>
                      All core competencies and keywords extracted from the job description were identified on your resume.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default JobDescription;
