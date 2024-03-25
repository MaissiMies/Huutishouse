import React, { useState, useEffect } from 'react';
import axios from "axios";

const KategoriaUL = () => {
  const [kategoria, setKategoria] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/kategoriat');
        console.log('Response:', response.data); // Log the response data
        setKategoria(response.data);
      } catch (error) {
        console.error('Virhe kategorioiden haussa:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Kategoriat:</h2>
      <ul>
        {Array.isArray(kategoria) ? (
          kategoria.map((category) => (
            <li key={category.id}>
              <label>
                <a href={`http://localhost:3000/myynti/${category.selite}`}>
                  {category.selite}
                </a>
              </label>
            </li>
          ))
        ) : (
          <li>No categories found</li>
        )}
      </ul>
    </div>
  );
};

export { KategoriaUL };
