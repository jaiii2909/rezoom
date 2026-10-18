import React, { useState, useEffect } from 'react';

function Modal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Maintain pure visual layer / front-end simulation
    onClose();
  };

  return (
    <div
      className="modal d-block show"
      tabIndex="-1"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '420px' }}>
        <div className="modal-content">
          <div className="modal-header d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-2">
              <span className="brand-icon" style={{ width: '22px', height: '22px', fontSize: '12px' }}>R</span>
              <h5 className="modal-title m-0" id="modal-title">
                {isLogin ? 'Sign in to Rezoom' : 'Create candidate account'}
              </h5>
            </div>
            <button
              type="button"
              className="btn-close"
              aria-label="Close dialog"
              onClick={onClose}
              style={{ fontSize: '0.8rem' }}
            ></button>
          </div>

          <div className="modal-body">
            <p className="text-muted" style={{ fontSize: '0.875rem', marginBottom: '16px' }}>
              {isLogin
                ? 'Access your saved resumes, target job descriptions, and ATS match history.'
                : 'Free unlimited resume parsing, keyword gap detection, and ATS benchmarks.'}
            </p>

            <div className="segmented-control" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={isLogin}
                className={`segmented-control-btn ${isLogin ? 'active' : ''}`}
                onClick={() => setIsLogin(true)}
              >
                Sign In
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={!isLogin}
                className={`segmented-control-btn ${!isLogin ? 'active' : ''}`}
                onClick={() => setIsLogin(false)}
              >
                Create Account
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="auth-email">
                  Work or Personal Email
                </label>
                <input
                  id="auth-email"
                  type="email"
                  className="form-control"
                  placeholder="name@example.com"
                  required
                  autoFocus
                />
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <label className="form-label" htmlFor="auth-password">
                    {isLogin ? 'Password' : 'Create Password'}
                  </label>
                  {isLogin && (
                    <a
                      href="#forgot"
                      onClick={(e) => e.preventDefault()}
                      style={{ fontSize: '12px', color: 'var(--color-primary)' }}
                    >
                      Forgot password?
                    </a>
                  )}
                </div>
                <input
                  id="auth-password"
                  type="password"
                  className="form-control"
                  placeholder={isLogin ? 'Enter your password' : 'At least 8 characters'}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn-rezoom-primary w-100"
                style={{ padding: '12px', marginTop: '8px' }}
              >
                {isLogin ? 'Sign In to Workspace' : 'Create Free Account'}
              </button>
            </form>

            <div className="mt-3 text-center">
              <span style={{ fontSize: '11px', color: 'var(--color-text-subtle)' }}>
                By continuing, you agree to Rezoom's Candidate Privacy Policy & Terms.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
