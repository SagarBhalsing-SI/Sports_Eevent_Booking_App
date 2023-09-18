// Login.js
import React, { useState } from 'react';
import HRLogin from './HRLogin';
import EmployeeLogin from './EmployeeLogin'; // Import the EmployeeLogin component

function Login() {
  const [selectedRole, setSelectedRole] = useState(null); // Change the initial value to null

  return (
    <div>
      <h1>Login as:</h1>
      <div>
        <label>
          <input
            type="radio"
            value="HR"
            checked={selectedRole === 'HR'}
            onChange={() => setSelectedRole('HR')}
          />
          HR
        </label>
        <label>
          <input
            type="radio"
            value="Employee"
            checked={selectedRole === 'Employee'}
            onChange={() => setSelectedRole('Employee')}
          />
          Employee
        </label>
      </div>
      {/* Conditional rendering based on selected role */}
      {selectedRole === 'HR' ? <HRLogin /> : selectedRole === 'Employee' && <EmployeeLogin />}
    </div>
  );
}

export default Login;
