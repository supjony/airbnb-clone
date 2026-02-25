import React, { useState } from 'react';
import API from '../api';

const ReviewForm = ({ spotId, onReviewCreated }) => {
  const [review, setReview] = useState('');
  const [stars, setStars] = useState(5); // default 5 stars

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // POST to backend with correct keys
      const res = await API.post('/reviews', {
        userId: 1, // replace with logged-in user if you have auth
        spotId,
        rating: stars,
        comment: review
      });

      // Update parent state so review appears immediately
      onReviewCreated(res.data);

      // Reset form
      setReview('');
      setStars(5);
    } catch (err) {
      console.error(err);
      alert('Failed to submit review');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
      <h4>Leave a Review</h4>

      <label>
        Stars:
        <select value={stars} onChange={(e) => setStars(Number(e.target.value))}>
          {[1,2,3,4,5].map(num => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </label>

      <br />

      <textarea
        placeholder="Your review..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
        required
        style={{ width: '100%', marginTop: '5px' }}
      />

      <br />

      <button type="submit" style={{ marginTop: '5px' }}>Submit Review</button>
    </form>
  );
};

export default ReviewForm;
