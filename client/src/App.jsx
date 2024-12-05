import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Books from './pages/Books';
import Profile from './pages/Profile';
import Login from './components/Login';
import Main from './layout/Main';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profile, setProfile] = useState([]);

  const handleLogin = async () => {
    setIsAuthenticated(true);
  };

  return (
    <>
      {isAuthenticated ? (
        <>
          <Main />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<Books />} />
            <Route path="/profile" element={<Profile profile={profile}/>} />
          </Routes>
        </>
      ) : (
        <Login onLogin={handleLogin} setProfile={setProfile} />
      )}
    </>
  );
};

export default App;
