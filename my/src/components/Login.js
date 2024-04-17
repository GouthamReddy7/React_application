import React, { useState } from 'react';
import axios from 'axios';
import './styles.css'; 

function Login( { onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    onLogin();

    if (!username || !password) {
      alert('Please fill in both username and password fields.');
      return;
    }
  
    try {
      await axios.post('http://52.91.136.13:5001/login', { username, password });
      alert('Login successful!');
      console.log(username)
      localStorage.setItem('username', username);
      //window.location.href = 'http://192.168.56.1:3006/home';
    } catch (error) {
      console.error(error);
      alert('Login failed. Please try again.');
    }
  };
  

  return (
    <div className="container">
      <div className="form-container">
        <h2>Login</h2>
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
        <button className="btn" onClick={handleLogin}>Login</button>
      </div>
      <p>New user? <a href="/signup">Register</a></p>
    </div>
  );
}

export default Login;
