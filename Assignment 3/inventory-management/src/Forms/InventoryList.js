import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InventoryItem from './InventoryItem';
import '../App.css';

const InventoryList = () => {
  const [inventoryItems, setInventoryItems] = useState([]);

  useEffect(() => {
    fetchInventoryItems();
  }, []);

  const fetchInventoryItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/inventory');
      setInventoryItems(response.data);
      if (response.data.length === 0) {
        alert('Inventory is empty!');
      }
    } catch (error) {
      console.error('Error fetching inventory items:', error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:5000/inventory/${itemId}`);
      setInventoryItems(prevItems => prevItems.filter(item => item._id !== itemId));
    } catch (error) {
      console.error('Error deleting inventory item:', error);
    }
  };

  const handleUpdateItem = async () => {
    try {
      const response = await axios.get('http://localhost:5000/inventory');
      if (response.data.length === 0) {
        alert('Inventory is empty!');
      }
      setInventoryItems(response.data);
    } catch (error) {
      console.error('Error fetching inventory items:', error);
    }
  };

  return (
    <div className="inventory-list-container">
      <h2>Inventory Items</h2>
      <ul className="inventory-list">
        {inventoryItems.map((item) => (
          <InventoryItem
            key={item._id}
            item={item}
            onDelete={handleDeleteItem}
            onUpdate={handleUpdateItem}
          />
        ))}
      </ul>
    </div>
  );
};

export default InventoryList;
