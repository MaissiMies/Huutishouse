import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


  

 function UserPage() {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/users/${id}`);
        setUserData(response.data);
        console.log(userData+"tämä")
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [id]);


  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Details</h2>
      <p>Name: {userData.nimi}</p>
      <p>Phone Number: {userData.puhnum}</p>
      <p>Email: {userData.sposti}</p>
      <p>Username: {userData.kayttajatunnus}</p>
    </div>
  );
};


export default UserPage;