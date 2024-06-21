// SignInPage.js
import React, { useState } from 'react';
import './Forms.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Contexts/AuthContext'; // Import the useAuth hook
import { toast } from 'react-toastify'; // Import the toast function

const SignInPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Attempt to sign in
      await signIn(username, password);
      // If successful, you can redirect or handle it as needed
      toast.success('Sign in successful');
      navigate('/')
      
    } catch (error) {
      // If an error occurs during sign in, show a toast notification
      toast.error('Invalid username or password');
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        <label htmlFor="username">Email:</label>
        <input
          type="email"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign In</button>
        <div>
          <h5>Don't have an account? <NavLink to={'/signup'}>Sign Up</NavLink></h5>
        </div>
      </form>
    </div>
  );
};

export default SignInPage;
