import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

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
    <div style={styles.container}>
      <h2 style={styles.title}>Käyttäjän tiedot</h2>
      <p>Nimi: {userData.nimi}</p>
      <p>Puhelinnumero: {userData.puhnum}</p>
      <p>Sähköposti: {userData.sposti}</p>
      <p>Käyttäjänimi: {userData.kayttajatunnus}</p>
      <button onClick={handlePrivilegeCheck} style={styles.button}>
        {isEditable ? "Takaisin" : "Päivitä"}
      </button>
      
      {isEditable && (
        <>
          <h3 style={styles.subtitle}>Päivitä Käyttäjän tietoja</h3>
          <label htmlFor="newName" style={styles.label}>Nimi:</label>
          <input
            id="newName"
            type="text"
            placeholder="Uusi nimi"
            value={updatedUserData?.nimi || ''}
            onChange={(e) => setUpdatedUserData({ ...updatedUserData, nimi: e.target.value })}
            style={styles.input}
          />
          <br />
          <label htmlFor="newPhoneNumber" style={styles.label}>Puhelinnumero:</label>
          <input
            id="newPhoneNumber"
            type="text"
            placeholder="Uusi puhnum"
            value={updatedUserData?.puhnum || ''}
            onChange={(e) => setUpdatedUserData({ ...updatedUserData, puhnum: e.target.value })}
            style={styles.input}
          />
          <br />
          <label htmlFor="newEmail" style={styles.label}>Sähköposti:</label>
          <input
            id="newEmail"
            type="text"
            placeholder="Uusi sposti"
            value={updatedUserData?.sposti || ''}
            onChange={(e) => setUpdatedUserData({ ...updatedUserData, sposti: e.target.value })}
            style={styles.input}
          />
          <br />
          <label htmlFor="newUsername" style={styles.label}>Käyttäjätunnus:</label>
          <input
            id="newUsername"
            type="text"
            placeholder="Uusi käyttäjätunnus"
            value={updatedUserData?.kayttajatunnus || ''}
            onChange={(e) => setUpdatedUserData({ ...updatedUserData, kayttajatunnus: e.target.value })}
            style={styles.input}
          />
          <br />
          <button onClick={handleUpdateUserData} style={styles.button}>Päivitä</button>
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    marginBottom: '20px',
    fontSize: '24px',
  },
  subtitle: {
    marginTop: '20px',
    marginBottom: '10px',
    fontSize: '20px',
  },
  label: {
    marginRight: '10px',
    fontSize: '16px',
  },
  input: {
    width: '300px',
    height: '40px',
    marginBottom: '10px',
    padding: '5px',
    fontSize: '16px',
  },
  button: {
    width: '200px',
    height: '40px',
    backgroundColor: 'blue',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '20px',
  },
};

export default UserPage;
