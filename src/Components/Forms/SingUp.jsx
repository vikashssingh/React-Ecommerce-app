// SignUpPage.js
import React, { useState } from "react";
import "./Forms.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'; // Import toast

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp, currentUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signUp(email, password);
      console.log(currentUser);
      toast.success("Sign up successful!");
      navigate('/signin');
    } catch (error) {
      toast.error(` Weak password`); 
    }
  };


  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        <button type="submit">Sign Up</button>
        <div>
          <h5>
            Already have an account? <NavLink to={"/signin"}>Sign In</NavLink>
          </h5>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
