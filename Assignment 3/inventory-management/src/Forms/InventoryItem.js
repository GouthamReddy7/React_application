import React, { useState } from 'react';
import axios from 'axios';
import InventoryUpdateForm from './InventoryUpdateForm';
import '../App.css';

const InventoryItem = ({ item, onDelete, onUpdate }) => {
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://52.91.136.13:5000/inventory/${item._id}`);
      onDelete(item._id);
      alert('Item successfully deleted');
      onUpdate();
    } catch (error) {
      console.error('Error deleting inventory item:', error);
    }
  };

  const handleUpdateClick = () => {
    setShowUpdatePopup(true);
  };

  const handleCloseUpdatePopup = () => {
    setShowUpdatePopup(false);
    onUpdate();
  };

  return (
    <li className="inventory-item">
      <div>
        <h3>{item.name}</h3>
        <p>Quantity: {item.quantity}</p>
        {item.imageUrl && <img src={item.imageUrl} alt={item.name} style={{ maxWidth: '200px' }} />}
      </div>
      <div className="item-actions">
        <button onClick={handleUpdateClick} className="button blue">Update</button>
        <button onClick={handleDelete} className="button red">Delete</button>
      </div>
      {showUpdatePopup && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseUpdatePopup}>&times;</span>
            <InventoryUpdateForm item={item} onClose={handleCloseUpdatePopup} />
          </div>
        </div>
      )}
    </li>
  );
};

export default InventoryItem;
