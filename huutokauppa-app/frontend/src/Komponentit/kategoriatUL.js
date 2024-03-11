import React, { useState, useEffect } from 'react';
import axios from "axios"

const KategoriaUL = () => {
  const[kategoria,setkategoria] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/kategoriat');
        console.log('Response:', response.data); // Log the response data
        setkategoria(response.data);
      } catch (error) {
        console.error('Virhe kategorioiden haussa:', error);
      }
    };
  
    fetchData();
  }, []);
  return(<ul>
    {Array.isArray(kategoria) ? (
      kategoria.map((kategoria) => (
        <li key={kategoria.id}>{kategoria.selite}</li>
      ))
    ) : (
      <li>No categories found</li>
    )}
    </ul>)
}
export {KategoriaUL}

