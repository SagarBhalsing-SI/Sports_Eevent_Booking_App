import React, { useState, useEffect } from 'react';
import VenueSelection from './VenueSelection';
import EquipmentSelection from './EquipmentSelection';
import BookingComponent from './BookingComponent';
import axios from 'axios';

function SportsSelection() {
  const [selectedSport, setSelectedSport] = useState('');
  const [sportsNamesList, setSportsNamesList] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState(''); 
  const [selectedEquipment, setSelectedEquipment] = useState(''); 
  useEffect(() => {
    axios
      .get('/api/sports-names')
      .then((response) => {
        setSportsNamesList(response.data);
      })
      .catch((error) => {
        console.error('Error fetching sports names:', error);
      });
  }, []);

  const handleSportChange = (e) => {
    setSelectedSport(e.target.value);
  };

  return (
    <div>
      <h2>Match Booking </h2>
      <div>
        <label>Select a Sport:</label>
        <select value={selectedSport} onChange={handleSportChange}>
          <option value="">Select a sport</option>
          {sportsNamesList.map((name) => (
            <option key={name.sport_name} value={name.sport_name}>
              {name.sport_name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <VenueSelection
          selectedSport={selectedSport}
          setSelectedVenue={setSelectedVenue} 
        />
        <EquipmentSelection
          selectedSport={selectedSport}
          setUpdateEquipment={setSelectedEquipment} 
        />
        <BookingComponent
          selectedSport={selectedSport}
          selectedVenue={selectedVenue} 
          selectedEquipment={selectedEquipment} 
        />
      </div>
    </div>
  );
}

export default SportsSelection;
