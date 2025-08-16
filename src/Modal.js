import React, { useState } from 'react';

function Modal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  if (!isOpen) return null;

  return (
    <div className="modal d-block show" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{isLogin ? 'Login' : 'Register'}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="btn-group w-100 mb-3">
              <button className={`btn ${isLogin ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setIsLogin(true)}>Login</button>
              <button className={`btn ${!isLogin ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setIsLogin(false)}>Register</button>
            </div>
            <form>
              <input type="email" className="form-control mb-3" placeholder="Email" required />
              <input type="password" className="form-control mb-3" placeholder={isLogin ? "Password" : "Create Password"} required />
              <button type="submit" className="btn btn-primary w-100">{isLogin ? 'Login' : 'Register'}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
