import React from 'react'
import { Link } from 'react-router-dom'
import '../css/error.css'

function NotFound() {
  return (
    <div className="error-container">
      <div className="error-content">
        <h1 className="error-title">404</h1>
        <h2 className="error-subtitle">Page Not Found</h2>
        <p className="error-message">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link to="/" className="error-home-link">Go to Homepage</Link>
      </div>
    </div>
  )
}

export default NotFound