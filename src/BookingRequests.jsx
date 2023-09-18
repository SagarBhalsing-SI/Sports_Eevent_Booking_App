import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookingRequests.css';
function BookingRequests() {
  const [pendingRequests, setPendingRequests] = useState([]);

  useEffect(() => {
    
    fetchPendingRequests();
  }, []);

  const fetchPendingRequests = async () => {
    try {
      const response = await axios.get('/api/pending-booking-requests');
      setPendingRequests(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAction = async (bookingId, action) => {
    try {
      // Send a request to approve or reject a booking request
      await axios.post(`/api/approve-booking-request/${bookingId}`, { action });
      
      // Update the UI to reflect the change in status
      fetchPendingRequests();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="booking-requests-container">
      <h2>Booking Requests</h2>
      <ul>
        {pendingRequests.map((request) => (
          <li key={request.booking_id}>
            <div>
              <strong>Booking ID:</strong> {request.booking_id}
            </div>
            <div>
              <strong>Sport:</strong> {request.sport}
            </div>
            <div>
              <strong>Venue:</strong> {request.venue}
            </div>
            <div>
              <strong>Equipment:</strong> {request.equipment}
            </div>
            <div>
              <strong>Status:</strong> {request.status}
            </div>
            <div>
              <button className="approve-button" onClick={() => handleAction(request.booking_id, 'approve')}>
                Approve
              </button>
              <button className="reject-button" onClick={() => handleAction(request.booking_id, 'reject')}>
                Reject
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookingRequests;
