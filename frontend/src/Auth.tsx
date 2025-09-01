import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthProps {
  onLoginSuccess: () => void;
}

const API_BASE_URL = 'http://localhost:8000'; // Gateway URL

const Auth: React.FC<AuthProps> = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); // Added for registration
  const [error, setError] = useState<string | null>(null); // For displaying errors
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null); // Clear previous errors

    const endpoint = isLogin ? '/login' : '/register';
    const body = isLogin ? { email, password } : { username, email, password };

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token); // Store the token
        onLoginSuccess(); // Notify parent component
        navigate('/'); // Redirect to home after successful auth
      } else {
        setError(data.error || 'An error occurred');
      }
    } catch (err) {
      setError('Network error or server is unreachable.');
    }
  };

  return (
    <div>
      <h1>{isLogin ? 'Login' : 'Register'}</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error */}
      <form onSubmit={handleSubmit}>
        {!isLogin && ( // Show username only for registration
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        )}
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      <p>
        {isLogin ? 'Need an account?' : 'Already have an account?'}{' '}
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Register' : 'Login'}
        </button>
      </p>
    </div>
  );
};

export default Auth;
