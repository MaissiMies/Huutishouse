import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function UserPage() {
  const { _id } = useParams();
  const [userData, setUserData] = useState(null);
  const [updatedUserData, setUpdatedUserData] = useState(null);
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/users/${_id}`);
        setUserData(response.data);
        setUpdatedUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [_id]);

  const handlePrivilegeCheck = () => {
    setIsEditable(!isEditable);
    if (!isEditable) {
      setUpdatedUserData(userData);
    }
  };
  
  //Ei toimi
  const handleUpdateUserData = async () => {
    try {
      const response = await axios.put(`http://localhost:3001/users/${_id}`, updatedUserData);     
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
      <button onClick={handlePrivilegeCheck}>
        {isEditable ? "Takaisin" : "Päivitä"}
      </button>
      
      {isEditable && (
        <>
          <h3>Päivitä Käyttäjän tietoja</h3>
          <label htmlFor="newName">Nimi:</label>
          <input
            id="newName"
            type="text"
            placeholder="Uusi nimi"
            value={updatedUserData?.nimi || ''}
            onChange={(e) => setUpdatedUserData({ ...updatedUserData, nimi: e.target.value })}
          />
          <br />
          <label htmlFor="newPhoneNumber">Puhelinnumero:</label>
          <input
            id="newPhoneNumber"
            type="text"
            placeholder="Uusi puhnum"
            value={updatedUserData?.puhnum || ''}
            onChange={(e) => setUpdatedUserData({ ...updatedUserData, puhnum: e.target.value })}
          />
          <br />
          <label htmlFor="newEmail">Sähköposti:</label>
          <input
            id="newEmail"
            type="text"
            placeholder="Uusi sposti"
            value={updatedUserData?.sposti || ''}
            onChange={(e) => setUpdatedUserData({ ...updatedUserData, sposti: e.target.value })}
          />
          <br />
          <label htmlFor="newUsername">Käyttäjätunnus:</label>
          <input
            id="newUsername"
            type="text"
            placeholder="Uusi käyttäjätunnus"
            value={updatedUserData?.kayttajatunnus || ''}
            onChange={(e) => setUpdatedUserData({ ...updatedUserData, kayttajatunnus: e.target.value })}
          />
          <br />
          <button onClick={handleUpdateUserData}>Päivitä</button>
        </>
      )}
    </div>
  );
}

export default UserPage;
