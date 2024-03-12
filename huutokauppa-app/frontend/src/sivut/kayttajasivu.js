import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function UserPage() {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [updatedUserData, setUpdatedUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/users/${id}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [id]);

  const handleUpdateUserData = async () => {
    try {
      const response = await axios.put(`http://localhost:3001/users/${id}`, updatedUserData);     
      console.log('User data updated successfully:', response.data);
      window.location.reload();
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Käyttäjän tiedot</h2>
      <p>Nimi: {userData.nimi}</p>
      <p>Puhelinnumero: {userData.puhnum}</p>
      <p>Sähköposti: {userData.sposti}</p>
      <p>Käyttäjänimi: {userData.kayttajatunnus}</p>

      <h3>Päivitä Käyttäjän tietoja</h3>
      <input
        type="text"
        placeholder="Uusi nimi"
        value={updatedUserData?.nimi || ''}
        onChange={(e) => setUpdatedUserData({ ...updatedUserData, nimi: e.target.value })}
      />
      {/* Add more input fields for other fields you want to update */}

      <button onClick={handleUpdateUserData} >Päivitä</button>
    </div>
  );
}

export default UserPage;