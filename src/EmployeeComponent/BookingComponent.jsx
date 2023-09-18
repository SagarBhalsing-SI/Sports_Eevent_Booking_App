import React, { useState } from 'react';
import axios from 'axios';

function BookingComponent({ selectedSport, selectedVenue, selectedEquipment }) {
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/booking-requests', {
        sport: selectedSport, 
        venue: selectedVenue, 
        equipment: selectedEquipment,
      });

      if (response.data.success) {
        
        alert('Booking request submitted successfully');
      } else {
        
        alert('Booking request failed');
      }
    } catch (error) {
      console.error('Error:', error);
      
      alert('An error occurred while submitting the booking request');
    }
  };

  return (
    <div>
      <h2>Booking Form</h2>
      <form onSubmit={handleSubmit}>
        <button type="submit">Submit Booking Request</button>
      </form>
    </div>
  );
}

export default BookingComponent;
