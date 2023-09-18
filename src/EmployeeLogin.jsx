import React, { useState } from 'react';
import './EmployeeLogin.css';
import SportsSelection from './EmployeeComponent/SportsSelection'; 
import axios from 'axios';
function EmployeeLogin() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [employeeId, setEmployeeId] = useState('');
  const handleLogin = async () => {
    try {
      
      const response = await axios.post('/api/employee-login', {
        userId,
        
        password,
      });
      console.log(response.data)
      if (response.data=='success') {
        setIsLoggedIn(true); 
      } else {
        setIsLoggedIn(false);
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error:', error);
      
    }
  };
  

  return (
    <div className="employee-login-container">
      {isLoggedIn ? ( 
        <div>
          <SportsSelection />
          
        </div>
      ) : (
        <div>
          <h2 className="login-heading">Employee Login</h2>
          <div className="form-group">
            <label htmlFor="userId">User ID:</label>
            <input
              type="text"
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group">
          <label htmlFor="employeeId">Employee ID:</label>
          <input
            type="number"
            id="employeeId"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            className="form-control"
          />
        </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
            />
            
            <label className="show-password-label">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              Show Password
            </label>
          </div>
          <button onClick={handleLogin} className="login-button">
            Login
          </button>
        </div>
      )}
    </div>
  );
}

export default EmployeeLogin;
