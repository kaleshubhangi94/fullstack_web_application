import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const token = localStorage.getItem('token');

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        {token ? (
          <>
            <li><button onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/login';
            }}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
