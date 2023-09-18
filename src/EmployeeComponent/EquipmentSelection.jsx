import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EquipmentSelection.css'; 

function EquipmentSelection({ selectedSport,setUpdateEquipment }) {
  const [equipmentItems, setEquipmentItems] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState([]);

  useEffect(() => {
    
    const fetchEquipment = async () => {
      try {
        if (selectedSport) {
          const response = await axios.get(`/api/equipment/${selectedSport}`);
          setEquipmentItems(response.data);
        } else {
          
          setEquipmentItems([]);
        }
      } catch (error) {
        console.error('Error fetching equipment items:', error);
      }
    };

    fetchEquipment();
  }, [selectedSport]);

  const handleEquipmentChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
        setUpdateEquipment((prevSelected) => [...prevSelected, value]);
        setSelectedEquipment((prevSelected) => [...prevSelected, value]);
     } 
  };

  return (
    <div className="equipment-selection-container">
      <h3 className="equipment-selection-heading">Equipment Selection</h3>
      <div className="equipment-checkboxes">
        {equipmentItems.map((item) => (
          <label key={item.inventory_item} className="equipment-checkbox-label">
            <input
              type="checkbox"
              value={item.inventory_item}
              onChange={handleEquipmentChange}
              checked={selectedEquipment.includes(item.inventory_item)}
            />
            {item.inventory_item}
          </label>
        ))}
      </div>
      {selectedEquipment.length > 0 && (
        <div>
          <p>You have selected:</p>
          <ul>
            {selectedEquipment.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default EquipmentSelection;
