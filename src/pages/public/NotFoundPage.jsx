import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div
      style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '20px'
      }}
    >
      <h1 style={{ fontSize: '80px', margin: 0, color: '#2D6A4F' }}>
        404
      </h1>

      <h2>Page Not Found</h2>

      <p style={{ maxWidth: '500px', color: '#666' }}>
        Sorry, the page you are looking for does not exist or may have been moved.
      </p>

      <Link
        to="/"
        style={{
          marginTop: '20px',
          background: '#2D6A4F',
          color: '#fff',
          padding: '12px 24px',
          borderRadius: '8px',
          textDecoration: 'none'
        }}
      >
        Go to Home
      </Link>
    </div>
  );
}