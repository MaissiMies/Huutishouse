import React, { useState, useEffect } from 'react';
import axios from "axios"

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
  return(<ul>
    {Array.isArray(kayttaja) ? (
      kayttaja.map((kayttaja) => (
        <li key={kayttaja.id}>
          {kayttaja.nimi} - {kayttaja.puhnum} - {kayttaja.sposti} - {kayttaja.kayttajatunnus}
        </li>
      ))
    ) : (
      <li>No users found</li>
    )}
  </ul>)
}
