import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const HuudotList = ({ productId }) => {
  const [huudotWithUserData, setHuudotWithUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const huudotResponse = await axios.get(`/tuotteet/${productId}/huudot`);
        const huudotData = huudotResponse.data;

        const userDataPromises = huudotData
          .filter(huuto => huuto.kayttajaid)
          .map(async (huuto) => {
            const userResponse = await axios.get(`http://localhost:3001/users/${huuto.kayttajaid}`);
            return { ...huuto, userData: userResponse.data }; // Combine huuto and user data
          });
        const huudotWithUserDataArray = await Promise.all(userDataPromises);

        huudotWithUserDataArray.sort((a, b) => parseInt(b.huuto) - parseInt(a.huuto));
        setHuudotWithUserData(huudotWithUserDataArray);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [productId]);

  return (
    <div>
      <h1>Huudot</h1>
      <ul>
        {huudotWithUserData.map((huutoWithUserData, index) => (
          <li key={index}>
            <Link to={`/users/${huutoWithUserData.kayttajaid}`}> {/* Link to the desired route */}
              {huutoWithUserData.huuto} - {huutoWithUserData.userData ? huutoWithUserData.userData.nimi : 'Loading...'}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};



export default HuudotList;


