import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InventoryList from './Forms/InventoryList';
import InventoryForm from './Forms/InventoryForm';
import InventoryUpdateForm from './Forms/InventoryUpdateForm';
import axios from 'axios';
import NewPage from './NewPage';

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAddClick = () => {
    setShowModal(true);
    setShowUpdateForm(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddItem = () => {
    setShowModal(false);
    setRefreshKey(prevKey => prevKey + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://52.91.136.13:3006/inventory');
        console.log(response);
      } catch (error) {
        console.error('Error fetching inventory items:', error);
      }
    };

    fetchData();
  }, [refreshKey]);

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route
            path="/"
            element={
              <React.Fragment>
                <h1>Inventory Management</h1>
                <div className="buttons-container">
                  <button onClick={handleAddClick} className="button yellow">Add Item</button>
                </div>
                {showModal && (
                  <div className="modal">
                    <div className="modal-content">
                      <span className="close" onClick={handleCloseModal}>&times;</span>
                      <InventoryForm onAddItem={handleAddItem} />
                    </div>
                  </div>
                )}
                {showUpdateForm && <InventoryUpdateForm />}
                <InventoryList key={refreshKey} />
              </React.Fragment>
            }
          />
          <Route path="/new-page" element={<NewPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
