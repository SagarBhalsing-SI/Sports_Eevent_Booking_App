import React, { useState } from 'react';
import './AddVenue.css';
import axios from 'axios';

function AddVenue() {
  const [venueName, setVenueName] = useState();
  const [sportsName, setSportsName] = useState();
  const [eventDate, setEventDate] = useState();
  const [eventTime, setEventTime] = useState();
  const [location, setLocation] = useState();
  const [duration, setDuration] = useState();
  const [price, setPrice] = useState();
  const [venuesList, setVenuesList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

   
    const newVenue = {
      venueName,
      sportsName,
      eventDate,
      eventTime,
      location,
      duration,
      price,
    };

   
    
      const response = axios.post('api/add-venue', newVenue);
      console.log('Venue added successfully:', response.data);
    
    setVenuesList([...venuesList, newVenue]);

    
    setVenueName('');
    setSportsName('');
    setEventDate('');
    setEventTime('');
    setLocation('');
    setDuration('');
    setPrice('');
  };

  return (
    <div>
      <h3>Add Venue</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="form-label">Vene Name:</label>
          <input className="form-input" type="text" value={venueName} onChange={(e) => setVenueName(e.target.value)} />
        </div>
        <div>
          <label className="form-label">Sports Name:</label>
          <input className="form-input" type="text" value={sportsName} onChange={(e) => setSportsName(e.target.value)} />
        </div>
        <div>
          <label className="form-label">Event Date:</label>
          <input className="form-input" type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
        </div>
        <div>
          <label className="form-label">Event Time:</label>
          <input className="form-input" type="time" value={eventTime} onChange={(e) => setEventTime(e.target.value)} />
        </div>
        <div>
          <label className="form-label">Location:</label>
          <input className="form-input" type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>
        <div>
          <label className="form-label">Duration (in hours):</label>
          <input className="form-input" type="number" value={duration} onChange={(e) => setDuration(e.target.value)} />
        </div>
        <div>
          <label className="form-label">Price:</label>
          <input className="form-input" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <button className="form-button" type="submit">Add</button>
      </form>

     
      <div className="added-venues">
        <h4>List of Added Venues:</h4>
        <ul>
          {venuesList.map((venue, index) => (
            <li key={index}>
              <strong>Venue Name:</strong> {venue.venueName}<br />
              <strong>Sports Name:</strong> {venue.sportsName}<br />
              <strong>Event Date:</strong> {venue.eventDate}<br />
              <strong>Event Time:</strong> {venue.eventTime}<br />
              <strong>Location:</strong> {venue.location}<br />
              <strong>Duration:</strong> {venue.duration} hours<br />
              <strong>Price:</strong> ${venue.price}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AddVenue;
