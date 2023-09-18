// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import './Navbar.css';

function Navbar() {
  return (
    <body>
    <header>
      <nav>
        <ul className="navbar">
          <li><Link to="/">Home</Link></li>
          
          <li className="dropdown">
            <span>Login as</span> {/* Remove the anchor tag */}
            <ul className="dropdown-content">
              <li><Link to="/employee-login">Employee Login</Link></li>
              <li><Link to="/hr-login">HR Login</Link></li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
    </body>
  );
}

export default Navbar;
