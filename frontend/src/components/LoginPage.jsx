import React, { useState } from 'react';
import { login } from '../api';

const LoginPage = ({ setToken, setPage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const data = await login({ username, password });
      localStorage.setItem('token', data.jwt);
      setToken(data.jwt);
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="auth-container">
        <h2>Welcome Back</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="👤 Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={loading}
          />
          <input
            type="password"
            placeholder="🔒 Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
          
          {error && <p className="error">{error}</p>}
        </form>
        <div className="auth-switch">
          <p style={{ marginBottom: '1rem', color: 'var(--text-dark)' }}>
            Don't have an account?
          </p>
          <button onClick={() => setPage('register')}>
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;