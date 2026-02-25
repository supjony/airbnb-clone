import React, { useState } from 'react';
import API from '../api';

const BookingForm = ({ spotId, existingBookings = [], onBookingCreated }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for overlapping bookings
    const start = new Date(startDate);
    const end = new Date(endDate);

    for (let b of existingBookings) {
      const bStart = new Date(b.startDate);
      const bEnd = new Date(b.endDate);

      if ((start <= bEnd) && (end >= bStart)) {
        alert('This spot is already booked for these dates!');
        return;
      }
    }

    try {
      const res = await API.post('/bookings', {
        userId: 1, // replace with logged-in user
        spotId,
        startDate,
        endDate
      });

      onBookingCreated(res.data);
      setStartDate('');
      setEndDate('');
      alert('Booking created!');
    } catch (err) {
      console.error(err);
      alert('Failed to create booking');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
      <h4>Book This Spot</h4>

      <label>
        Start Date:
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </label>
      <br />

      <label>
        End Date:
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
      </label>
      <br />

      <button type="submit" style={{ marginTop: '5px' }}>Book Spot</button>
    </form>
  );
};

export default BookingForm;
