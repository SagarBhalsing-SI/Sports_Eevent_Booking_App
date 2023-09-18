// HRLogin.js
import React, { useState } from 'react';
import './HRLogin.css';
import { useNavigate } from 'react-router-dom';

function HRLogin() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function

  const handleLogin = () => {
    if (userId === 'Admin' && password === 'sportz interactive') {
      // Successful login logic here
      setLoginError(false); 
      navigate('/dashboard');
      
      // Reset the login error state
    } else {
      // Incorrect login logic here
      setLoginError(true);
    }
  };
  
  return (
    <div className="hr-login-container">
  <h2>HR Login</h2>
  <form onSubmit={handleLogin}>
    <div>
      <label className="form-label">User ID:</label>
      <input
        className="form-input"
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
    </div>
    <div>
      <label className="form-label">Password:</label>
      <input
        className="form-input"
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
    {loginError && <p className="error">Incorrect user ID or password</p>}
    <div>
      <label className="form-label">Show Password:</label>
      <input
        type="checkbox"
        checked={showPassword}
        onChange={() => setShowPassword(!showPassword)}
      />
    </div>
    <button className="form-button" type="submit">
      Login
    </button>
  </form>

  
      {/* Conditional rendering of the Link component */}
      
    </div>
  );
  
}
export default HRLogin;
