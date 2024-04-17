import React, { useState } from 'react';

const Biography = () => {
  const [biography, setBiography] = useState("Sridhar Reddy is a driven individual with a passion for computer science and a love for sports. Currently pursuing a Master's degree in Computer Science at University at Albany , Sridhar is dedicated to expanding his knowledge and expertise in the field of IT Sector .Outside of academics, Sridhar finds joy in playing badminton and tennis, where he enjoys the thrill of competition and the camaraderie of the game.With a strong academic foundation and a commitment to personal growth, Sridhar is poised to make meaningful contributions in both the tech industry and the sports arena.");
  const [editMode, setEditMode] = useState(false);

  const handleBiographyChange = (event) => {
    setBiography(event.target.value);
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    setEditMode(false);
  };

  return (
    <div>
      {editMode ? (
        <div>
          <textarea
            value={biography}
            onChange={handleBiographyChange}
            className="form-control border-light"
            style={{ height: '180px',width:'800px', backgroundColor: '#f8f9fa'}}
          />
          <button onClick={handleSaveClick}>Save</button>
        </div>
      ) : (
        <div>
          <p className="border-light" style={{ backgroundColor: '#f8f9fa', padding: '10px' }}>
            {biography}
          </p>
          <button onClick={handleEditClick}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default Biography;
