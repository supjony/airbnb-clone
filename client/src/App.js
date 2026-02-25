import React, { useState, useEffect } from 'react';
import SpotForm from './components/SpotForm';
import ReviewForm from './components/ReviewForm';
import BookingForm from './components/BookingForm';
import API from './api'; // make sure this points to your backend

function App() {
  const [spots, setSpots] = useState([]);
  const [reviews, setReviews] = useState({});
  const [bookings, setBookings] = useState({});

  // Fetch spots, reviews, and bookings when app loads
  useEffect(() => {
    API.get('/spots').then(res => setSpots(res.data));

    API.get('/reviews').then(res => {
      const reviewsBySpot = {};
      res.data.forEach(r => {
        if (r.rating !== null && r.comment !== null) {
          if (!reviewsBySpot[r.spotId]) reviewsBySpot[r.spotId] = [];
          reviewsBySpot[r.spotId].push(r);
        }
      });
      setReviews(reviewsBySpot);
    });

    API.get('/bookings').then(res => {
      const bookingsBySpot = {};
      res.data.forEach(b => {
        if (!bookingsBySpot[b.spotId]) bookingsBySpot[b.spotId] = [];
        bookingsBySpot[b.spotId].push(b);
      });
      setBookings(bookingsBySpot);
    });
  }, []);

  // Handlers
  const handleSpotCreated = (newSpot) => {
    setSpots(prev => [...prev, newSpot]);
  };

  const handleReviewCreated = (newReview) => {
    setReviews(prev => {
      const spotReviews = (prev[newReview.spotId] || []).filter(r => r.rating !== null && r.comment !== null);
      return {
        ...prev,
        [newReview.spotId]: [...spotReviews, newReview]
      };
    });
  };

  const handleBookingCreated = (newBooking) => {
    setBookings(prev => {
      const spotBookings = prev[newBooking.spotId] || [];
      return {
        ...prev,
        [newBooking.spotId]: [...spotBookings, newBooking]
      };
    });
  };

  return (
    <div className="App" style={{ padding: '20px' }}>
      <h1>Airbnb Clone</h1>

      <SpotForm onSpotCreated={handleSpotCreated} />

      <h2>All Spots</h2>
      {spots.map(spot => (
        <div key={spot.id} style={{ border: '1px solid gray', padding: '10px', marginBottom: '20px' }}>
          <strong>{spot.title} — ${spot.price}</strong>

          {/* Reviews Section */}
          <div style={{ marginTop: '10px', marginLeft: '20px' }}>
            <h4>Reviews:</h4>
            {reviews[spot.id] && reviews[spot.id].length > 0 ? (
              reviews[spot.id].map((r, i) => (
                <div key={i}>
                  ⭐ {r.rating} — {r.comment}
                </div>
              ))
            ) : (
              <div>No reviews yet</div>
            )}

            <ReviewForm spotId={spot.id} onReviewCreated={handleReviewCreated} />
          </div>

          {/* Bookings Section */}
          <div style={{ marginTop: '10px', marginLeft: '20px' }}>
            <h4>Bookings:</h4>
            {bookings[spot.id] && bookings[spot.id].length > 0 ? (
              bookings[spot.id].map((b, i) => (
                <div key={i}>
                  {b.startDate} → {b.endDate}
                </div>
              ))
            ) : (
              <div>No bookings yet</div>
            )}

            <BookingForm
              spotId={spot.id}
              existingBookings={bookings[spot.id] || []}
              onBookingCreated={handleBookingCreated}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
