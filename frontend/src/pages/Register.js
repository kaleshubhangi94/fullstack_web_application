import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css'; // Assuming you have a separate CSS file for the register page

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    console.log("process.env.REACT_APP_API_URL}/user/register",process.env.REACT_APP_API_URL);
    
    e.preventDefault();
    axios.post(`http://localhost:5000/user/register`, { name, email, password })
    .then(response => {
        alert('User registered successfully');
        navigate('/login'); // Redirect to login after successful registration
      })
      .catch(error => {
        console.error(error);
        alert('Error registering user');
      });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
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
        <button type="submit">Register</button>
        <a href="/login">Already have an account? Login</a>
      </form>
    </div>
  );
}

export default Register;
