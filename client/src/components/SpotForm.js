import { useState } from 'react';
import API from '../api'; // make sure you have api.js set up to call your backend

function SpotForm({ onSpotCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newSpot = await API.post('/spots', {
        title,
        description,
        price: parseFloat(price),
        location,
        userId: 1, // placeholder for now
      });
      onSpotCreated(newSpot.data);
      setTitle('');
      setDescription('');
      setPrice('');
      setLocation('');
    } catch (err) {
      console.error(err);
      alert('Error creating spot');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create a Spot</h3>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        placeholder="Price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <input
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      />
      <button type="submit">Create Spot</button>
    </form>
  );
}

export default SpotForm;
