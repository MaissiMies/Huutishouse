import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function UserPage() {
  const { _id } = useParams();
  const [userData, setUserData] = useState(null);
  const [updatedUserData, setUpdatedUserData] = useState(null);
  const [iseditable, setiseditable] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/users/${_id}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [_id]);
  const handlePrivilegeCheck = () =>{
    if (iseditable) {
      setiseditable (false)
    }
    else {
      setiseditable (true)
    }
  }
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
      {iseditable ? (
        <>
        <button onClick={handlePrivilegeCheck}>Päivitä</button>
          <h2>Käyttäjän tiedot</h2>
          <p>Nimi: {userData.nimi}</p>
          <p>Puhelinnumero: {userData.puhnum}</p>
          <p>Sähköposti: {userData.sposti}</p>
          <p>Käyttäjänimi: {userData.kayttajatunnus}</p>
        </>
      ) : (
        <>
        <button onClick={handlePrivilegeCheck}>Päivitä</button>
          <h3>Päivitä Käyttäjän tietoja</h3>
          <input
            type="text"
            placeholder="Uusi nimi"
            value={updatedUserData?.nimi || ''}
            onChange={(e) => setUpdatedUserData({ ...updatedUserData, nimi: e.target.value })}
          />
          <br/>
          <input
            type="text"
            placeholder="Uusi puhnum"
            value={updatedUserData?.puhnum || ''}
            onChange={(e) => setUpdatedUserData({ ...updatedUserData, puhnum: e.target.value })}
          />
          <br/>
          <input
          type="text"
          placeholder="Uusi sposti"
          value={updatedUserData?.sposti || ''}
          onChange={(e) => setUpdatedUserData({ ...updatedUserData, sposti: e.target.value })}
        />
        <br/>
        <input
            type="text"
            placeholder="Uusi kayttajatunnus"
            value={updatedUserData?.kayttajatunnus || ''}
            onChange={(e) => setUpdatedUserData({ ...updatedUserData, kayttajatunnus: e.target.value })}
          />
          {/* Lisää tarvittaessa muita input-kenttiä päivitettäville tiedoille */}
          <br/>
  
          <button onClick={handleUpdateUserData}>Päivitä</button>
        </>
      )}
    </div>
  );
}

export default UserPage;