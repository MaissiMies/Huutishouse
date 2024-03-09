import React, { useState } from 'react';

export function Otayhteytta() {
  const [nimi, setNimi] = useState('');
  const [sahkoposti, setSahkoposti] = useState('');
  const [viesti, setViesti] = useState('');

  const kasitteleLahetys = (e) => {
    e.preventDefault();
    // Tähän voi lisätä koodin viestien lisäämiseen databaseen yms
    
    console.log('Nimi:', nimi);
    console.log('Sähköposti:', sahkoposti);
    console.log('Viesti:', viesti);
    setNimi('');
    setSahkoposti('');
    setViesti('');
  };

  return (
    <div>
      <h2>Ota yhteyttä</h2>
      <form onSubmit={kasitteleLahetys} style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
          <label htmlFor="nimi">Nimi:</label>
          <input
            type="text"
            id="nimi"
            value={nimi}
            onChange={(e) => setNimi(e.target.value)}
            required
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
          <label htmlFor="sahkoposti">Sähköposti:</label>
          <input
            type="email"
            id="sahkoposti"
            value={sahkoposti}
            onChange={(e) => setSahkoposti(e.target.value)}
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
    </div>
  );
  
}
