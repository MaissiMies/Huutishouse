import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UserPage = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data based on userId
    fetchUserData(userId);
  }, [userId]);

  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(/*`Tähän mikä sinne fetchi nyt tulee`*/);
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <div>
      {userData ? (
        <div>
          <h2>User Details</h2>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
          {/* Render other user data */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserPage;