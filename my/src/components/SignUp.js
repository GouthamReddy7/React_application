import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles.css'; // Import the CSS file

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (!username || !password || !confirmPassword) {
      alert('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    // Password validation: at least 8 characters, 1 capital letter, 1 special character
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9a-zA-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      alert('Password should be at least 8 characters long, contain at least 1 capital letter, and 1 special character.');
      return;
    }

    try {
      await axios.post('http://localhost:5001/signup', { username, password });
      alert('Sign up successful!');
      navigate(`/`)
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.message === 'Username already exists') {
        alert('User already exists');
      } else {
        console.error(error);
        alert('Sign up failed. Please try again.');
      }
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Sign Up</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button className="btn" onClick={handleSignUp}>Sign Up</button>
      </div>
      <p>Already Registered? <a href="/">Login</a></p>
    </div>
  );
}

export default SignUp;
