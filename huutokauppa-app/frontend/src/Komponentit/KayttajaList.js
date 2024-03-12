import React, { useState, useEffect } from 'react';
import axios from "axios"
import { Link } from 'react-router-dom';

export const KayttajaUL = () => {
  const[kayttaja,setkayttaja] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/kayttajat');
        console.log('Response:', response.data); // Log the response data
        setkayttaja(response.data);
      } catch (error) {
        console.error('Virhe kayttajien haussa:', error);
      }
    };
  
    fetchData();
  }, []);
  

return (
  <ul>
    {Array.isArray(kayttaja) ? (
      kayttaja.map((kayttaja) => (
        <li key={kayttaja.id}>
         {kayttaja.id} - {kayttaja.nimi} - {kayttaja.puhnum} - {kayttaja.sposti} - {kayttaja.kayttajatunnus}
          <Link to={`/users/${kayttaja.id}`} onClick={() => window.scrollTo(0, 0)}>
            <button>View Details</button>
          </Link>
        </li>
      ))
    ) : (
      <li>No users found</li>
    )}
  </ul>
);
}
