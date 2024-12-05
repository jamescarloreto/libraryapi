import React, { useState } from 'react';
import { userLogin } from '../utils/axios';

const Login = ({ onLogin, setProfile }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError('Please fill in both fields');
      return;
    }

    try {
      const response = await userLogin({
        "username": username,
        "password": password
      });
      
      console.log("Login response.user: ", response.user);
      if (response.success === true) {
        setProfile(response.user);
        onLogin();
      } else {
        setError(response.data.message);
        return;
      }
    } catch (err) {
        console.error(err);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
        <div className="card-body">
          <h3 className="card-title text-center mb-4">Login</h3>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                // required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                // required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">Login</button>

            <div className="mt-3 text-center">
              <a href="/forgot-password" className="text-decoration-none">Forgot Password?</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
