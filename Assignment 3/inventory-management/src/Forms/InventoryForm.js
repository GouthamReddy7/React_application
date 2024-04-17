import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

const InventoryForm = ({ onAddItem }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !quantity.trim() || !image) {
      setErrorMessage('Please fill out all fields.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('quantity', quantity);
      formData.append('image', image);

      const response = await axios.post('http://localhost:5000/inventory', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('New inventory item:', response.data);
      alert('Item successfully added');
      onAddItem();
    } catch (error) {
      console.error('Error creating inventory item:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Inventory Item</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input type="number" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image:</label>
          <input type="file" id="image" accept="image/*" onChange={(e) => setImage(e.target.files[0])} required />
        </div>
        <button type="submit" className="button yellow">Add Item</button>
      </form>
    </div>
  );
};

export default InventoryForm;
