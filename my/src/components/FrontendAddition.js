import React, { useState } from 'react';
import axios from 'axios';
import './FrontendAddition.css'; 

const FrontendAddition = () => {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [frontendResult, setFrontendResult] = useState('');
  const [backendResult, setBackendResult] = useState('');

  const handleNum1Change = (event) => {
    setNum1(event.target.value);
  };

  const handleNum2Change = (event) => {
    setNum2(event.target.value);
  };

  const handleAddition = async () => {

    //frontend addition code
    const sum = parseInt(num1) + parseInt(num2);
    setFrontendResult(sum);

    //backend addition code - api call
    try {
      const response = await axios.post('http://localhost:5001/api/add', { num1, num2 });
      setBackendResult(response.data.result);
    } catch (error) {
      console.error('Error performing addition:', error);
    }

  };


  return (
    <div className="frontend-addition-container">
      <div className="input-container">
        <label>Enter First Number:</label>
        <input type="number" value={num1} onChange={handleNum1Change} />
      </div>
      <div className="input-container">
        <label>Enter Second Number:</label>
        <input type="number" value={num2} onChange={handleNum2Change} />
      </div>
      <button className="submit-button" onClick={handleAddition}>Submit</button>
      {frontendResult && backendResult && (
        <div className="result-container">
          <h3>Your Addition Result (from server) is: <span className="result-text">{backendResult}</span></h3>
          <h3>Your Addition Result (from ReactJS) is: <span className="result-text">{frontendResult}</span></h3>
        </div>
      )}
    </div>
  );
};

export default FrontendAddition;
