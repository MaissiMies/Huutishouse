import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function Otayhteytta() {
  const [nimi, setNimi] = useState('');
  const [viesti, setViesti] = useState('');
  const [palaute, setPalaute] = useState([]);

  useEffect(() => {
    // Fetch feedback messages from the backend when the component mounts
    async function fetchPalaute() {
      try {
        const response = await axios.get('http://localhost:3001/palauteviesti');
        setPalaute(response.data);
      } catch (error) {
        console.error('Error fetching feedback messages:', error);
      }
    }

    fetchPalaute();

    // Cleanup function to abort the fetch if the component unmounts
    return () => {
      // Optionally handle cleanup if needed
    };
  }, []);

  const kasitteleLahetys = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/palauteviesti', {
        nimi,
        viesti,
      });

      console.log('Response:', response.data);
      setNimi('');
      setViesti('');

      // Update the feedback messages list after submitting new feedback
      setPalaute(prevPalaute => [...prevPalaute, { nimi, viesti }]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Ota yhteyttä</h2>
      <form onSubmit={kasitteleLahetys} style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
          <label htmlFor="nimi">Lähettäjän nimi:</label>
          <input
            type="text"
            id="nimi"
            value={nimi}
            onChange={(e) => setNimi(e.target.value)}
            required
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
          <label htmlFor="viesti">Viesti:</label>
          <textarea
            id="viesti"
            value={viesti}
            onChange={(e) => setViesti(e.target.value)}
            required
          />
        </div>
        <button type="submit">Lähetä</button>
      </form>

      <h2>Palauteviestit</h2>
      <ul>
        {palaute.map((viesti, index) => (
          <li key={index}>
            <strong>Lähettäjä:</strong> {viesti.nimi}<br />
            <strong>Viesti:</strong> {viesti.viesti}
          </li>
        ))}
      </ul>
    </div>
  );
}
