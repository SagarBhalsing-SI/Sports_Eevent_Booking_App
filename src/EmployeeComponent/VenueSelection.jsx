import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios

function VenueSelection(props) {
  const [venues, setVenues] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState('');

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        console.log('Selected sport:', props.selectedSport);
        const response = await axios.get(`/api/venues/${props.selectedSport}`);
        setVenues(response.data);
      } catch (error) {
        console.error('Error fetching venue names:', error);
      }
    };

    if (props.selectedSport) {
      fetchVenues();
    } else {
      setVenues([]);
    }
  }, [props.selectedSport]);

  const handleVenueChange = (e) => {
    props.setSelectedVenue(e.target.value);
    setSelectedVenue(e.target.value);
    console.log(e.target.value);
  };


  return (
    <div>
      
      <div>
        <label>Select a Venue:</label>
        <select value={selectedVenue} onChange={handleVenueChange}>
          <option value="">Select a venue</option>
          {venues.map((venue) => (
            <option key={venue.venue_name} value={venue.venue_name}>
              {venue.venue_name}
            </option>
          ))}
        </select>
      </div>
      
    </div>
  );
}

export default VenueSelection;
