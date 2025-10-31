
import React, { useState } from 'react';
import { register } from '../api';

const RegisterPage = ({ setPage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register({ username, password });
      setPage('login');
    } catch (err) {
      setError('Error registering user');
    }
  };

  return (
    <div className="register-page">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
        {error && <p className="error">{error}</p>}
      </form>
      <button onClick={() => setPage('login')}>Go to Login</button>
    </div>
  );
};

export default RegisterPage;
