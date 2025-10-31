import React, { useState } from 'react';
import { register } from '../api';

const RegisterPage = ({ setPage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await register({ username, password });
      setPage('login');
    } catch (err) {
      setError('Error registering user. Username might be taken.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="auth-container">
        <h2>🌺 Create Account</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="👤 Choose a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={loading}
          />
          <input
            type="password"
            placeholder="🔒 Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Creating account...' : '🎉 Register'}
          </button>
          {error && <p className="error">{error}</p>}
        </form>
        <div className="auth-switch">
          <p style={{ marginBottom: '1rem', color: 'var(--text-dark)' }}>
            Already have an account?
          </p>
          <button onClick={() => setPage('login')}>
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;