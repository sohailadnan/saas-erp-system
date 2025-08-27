import React, { useState, useEffect } from 'react';

interface UserProfile {
  id: number;
  username: string;
  email: string;
}

const API_BASE_URL = 'http://localhost:8000'; // Gateway URL

const UserManagement: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchUserProfile = async () => {
    setError(null);
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No authentication token found. Please log in.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setUserProfile(data);
      } else {
        setError(data.error || 'Failed to fetch user profile.');
      }
    } catch (err) {
      setError('Network error or User Management service is unreachable.');
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div>
      <h1>User Management Page</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h2>Your Profile</h2>
      {userProfile ? (
        <div>
          <p><strong>ID:</strong> {userProfile.id}</p>
          <p><strong>Username:</strong> {userProfile.username}</p>
          <p><strong>Email:</strong> {userProfile.email}</p>
        </div>
      ) : (
        <p>No user profile found or you are not logged in.</p>
      )}
    </div>
  );
};

export default UserManagement;
