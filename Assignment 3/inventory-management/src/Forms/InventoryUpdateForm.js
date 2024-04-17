import React, { useState } from 'react';
import axios from 'axios';

const InventoryUpdateForm = ({ item, onClose }) => {
  const [name, setName] = useState(item.name);
  const [quantity, setQuantity] = useState(item.quantity);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !quantity.trim()) {
      setErrorMessage('Please fill out all fields.');
      return;
    }

    try {
      const response = await axios.put(`http://52.91.136.13:5000/inventory/${item._id}`, {
        name,
        quantity: parseInt(quantity),
      });
      console.log('Updated inventory item:', response.data);
      alert('Item successfully updated');
      onClose();
    } catch (error) {
      console.error('Error updating inventory item:', error);
    }
  };

  return (
    <div>
      <h2>Update Inventory Item</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="button blue">Update</button>
      </form>
    </div>
  );
};

export default InventoryUpdateForm;
