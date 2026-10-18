import React from 'react';

function Card({ title, description, icon, tag }) {
  return (
    <div className="card card-interactive h-100">
      <div className="card-body d-flex flex-column">
        {tag && (
          <div className="mb-2">
            <span className="ats-tag">{tag}</span>
          </div>
        )}
        {icon && (
          <div className="feature-badge-icon">
            {icon}
          </div>
        )}
        <h5 className="card-title">{title}</h5>
        <p className="card-text mt-1">{description}</p>
      </div>
    </div>
  );
}

export default Card;
