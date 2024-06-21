// Importing necessary dependencies and styles
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ErrorPage.css'; 

// ErrorPage component to display a 404 error and redirect to the homepage
const ErrorPage = () => {
  // Hook to navigate between pages
  const navigate = useNavigate();

  // Effect to redirect to the homepage after a delay (e.g., 3 seconds)
  useEffect(() => {
    // Set up a timer for the redirection
    const redirectTimer = setTimeout(() => {
      // Redirect to the homepage
      navigate('/');
    }, 3000);

    // Clear the timer when the component is unmounted
    return () => clearTimeout(redirectTimer);
  }, [navigate]);

  // Rendering the ErrorPage component
  return (
    <div className="error-container">
      <div className="error-content">
        <h1>404 - Not Found</h1>
        <p>Oops! The page you're looking for doesn't exist.</p>
        <p>Redirecting to the homepage...</p>
      </div>
    </div>
  );
};

// Exporting the ErrorPage component
export default ErrorPage;
