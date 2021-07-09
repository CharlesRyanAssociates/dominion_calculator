import React from 'react'

function Field({ label, name, children, hint, className = "" }){
  return (
    <div className={`form-group row ${className} justify-content-between`}>
      <div className="col-12 col-md-6 col-form-label">
        <label htmlFor={name}>{label}</label>
        { hint && <span className="form-text">{hint}</span>}
      </div>
      <div className="col-12 col-md-4">
        {children}
      </div>
    </div>
  );
}

export default Field;