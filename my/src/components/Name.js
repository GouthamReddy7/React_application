import React, { useState, useEffect } from 'react';

const Name = () => {
  const [name, setName] = useState('Sridhar Reddy');
  const [editMode, setEditMode] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const username = localStorage.getItem('username');
    console.log(username)
    setUsername(username)
  }, []);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    setEditMode(false);
  };

  return (
    <div>
      <h3>Welcome, {username}!</h3>
      {editMode ? (
        <div>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            className="form-control font-weight-bold border-light"
            style={{ width: `${name.length * 14}px`, backgroundColor: '#f8f9fa', fontSize: '23px', fontWeight: 'Bold' }}
          />
          <button onClick={handleSaveClick}>Save</button>
        </div>
      ) : (
        <div>
          <span className="font-weight-bold border-light" style={{ backgroundColor: '#f8f9fa', fontSize: '23px', fontWeight: 'Bold' }}>
            {name}
          </span>
          <button onClick={handleEditClick} style={{ marginLeft: '10px' }}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default Name;
