import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css'; // Assuming you have a separate CSS file for the login page

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:5000/user/login`, { email, password })
      .then(response => {
        alert('Logged in successfully');
        navigate('/home');  // Redirect to dashboard or another page
      })
      .catch(error => {
        setError('Invalid email or password');
      });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p className="alert">{error}</p>}
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">Login</button>
        <a href="/forgot-password">Forgot Password?</a>
        <a href="/register">Don't have an account? Register</a>
      </form>
    </div>
  );
}

export default Login;
