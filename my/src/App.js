import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NavigationBar from './components/NavigationBar';
import Profile from './components/Profile';
import FrontendAddition from './components/FrontendAddition';
import LoginPage from './components/Login';
import SignUpPage from './components/SignUp';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Container>
        <Routes>
          {!isLoggedIn && <Route path="/" element={<LoginPage onLogin={handleLogin} />} />}
          {!isLoggedIn && <Route path="/signup" element={<SignUpPage />} />}
          {isLoggedIn && (
            <>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<AuthenticatedHome onLogout={handleLogout} />} />
            </>
          )}
        </Routes>
      </Container>
    </Router>
  );
};

const AuthenticatedHome = ({ onLogout }) => {
  return (
    <>
      <NavigationBar onLogout={onLogout} /><br></br><br></br>
      <Profile />
      <FrontendAddition />
    </>
  );
};

export default App;
