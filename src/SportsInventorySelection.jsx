import React, { useState } from 'react';
import './SportsInventorySelection.css';
import axios from 'axios';
function SportsSelection() {
  const [sportsName, setSportsName] = useState('');
  const [sportsInventory, setSportsInventory] = useState('');

  const handleBookClick = () => {
    const requestData = {
        sportsName: sportsName,
        sportsInventory: sportsInventory,
      };
    
      
      axios
        .post('http://localhost:3001/api/add-sports-inventory', requestData)
        .then((response) => {
          
          console.log('Inventory added successfully');
        })
        .catch((error) => {
          
          console.error('Error adding inventory:', error);
        });
  };

  return (
    <div>
      <h2>Sports Selection</h2>
      <div>
        <label>Enter Sports Name:</label>
        <input
          type="text"
          value={sportsName}
          onChange={(e) => setSportsName(e.target.value)}
        />
      </div>
      <div>
        <label>Enter Sports Inventory:</label>
        <input
          type="text"
          value={sportsInventory}
          onChange={(e) => setSportsInventory(e.target.value)}
        />
      </div>
      <button onClick={handleBookClick}>Add</button>
    </div>
  );
}

export default SportsSelection;
