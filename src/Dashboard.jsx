import React from 'react';
import './Dashboard.css'; 
import { useNavigate } from 'react-router-dom';
function Dashboard() {
    const navigate = useNavigate();
    const handleAddEventClick = () => {
        
        navigate('/add-venue');
};
    const handleAddSportsInventoryClick = ()=>{
        navigate('/sports-inventory')
    }
    const handleBookingRequestClick = () =>{
        navigate('/booking-requests')
    }
  return (
    <div className="dashboard-container">
      <h2>Welcome to the Dashboard</h2>
      <div className="dashboard-buttons">
        <button className="dashboard-button" onClick={handleAddEventClick}>Add Event</button>
        <button className="dashboard-button" onClick={handleAddSportsInventoryClick}>Add Sports Inventory</button>
        <button className="dashboard-button" onClick={handleBookingRequestClick}>Booking Request</button>
      </div>
    </div>
  );
}

export default Dashboard;
