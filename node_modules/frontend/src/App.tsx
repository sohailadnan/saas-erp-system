import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

// Import new pages
import Finance from './Finance';
import HR from './HR';
import Inventory from './Inventory';
import UserManagement from './UserManagement';
import Auth from './Auth'; // Import Auth component

// ProtectedRoute component
interface ProtectedRouteProps {
  children: React.ReactNode;
  isLoggedIn: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, isLoggedIn }) => {
  if (!isLoggedIn) {
    return <Navigate to="/auth" replace />;
  }
  return <>{children}</>;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    // Check for token in localStorage on initial load
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              {isLoggedIn && ( // Show these links only if logged in
                <>
                  <li>
                    <Link to="/finance">Finance</Link>
                  </li>
                  <li>
                    <Link to="/hr">HR</Link>
                  </li>
                  <li>
                    <Link to="/inventory">Inventory</Link>
                  </li>
                  <li>
                    <Link to="/user-management">User Management</Link>
                  </li>
                </>
              )}
              <li>
                {isLoggedIn ? (
                  <button onClick={handleLogout}>Logout</button>
                ) : (
                  <Link to="/auth">Login/Register</Link>
                )}
              </li>
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={
              <>
                <a
                  className="App-link"
                  href="https://reactjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn React
                </a>
              </>
            } />
            <Route path="/auth" element={<Auth onLoginSuccess={handleLoginSuccess} />} />

            {/* Protected Routes */}
            <Route path="/finance" element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Finance />
              </ProtectedRoute>
            } />
            <Route path="/hr" element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <HR />
              </ProtectedRoute>
            } />
            <Route path="/inventory" element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Inventory />
              </ProtectedRoute>
            } />
            <Route path="/user-management" element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <UserManagement />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

