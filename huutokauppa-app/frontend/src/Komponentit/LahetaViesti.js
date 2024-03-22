
// LahetaViesti.js
import React, { useState } from 'react';

const LahetaViesti = ({ myyjanNimi, tuotteenNimi }) => {
  const [otsikko, setOtsikko] = useState('');
  const [viesti, setViesti] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Tässä voisi toteuttaa viestin lähetyksen
  };

  return (
    <div className="laheta-viesti">
      <h2>Lähetä viesti myyjälle</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Otsikko"
          value={otsikko}
          onChange={(e) => setOtsikko(e.target.value)}
          required
        />
        <textarea
          placeholder={`Olet voittanut ${tuotteenNimi} käyttäjä ${myyjanNimi}`}
          value={viesti}
          onChange={(e) => setViesti(e.target.value)}
          required
        ></textarea>
        <button type="submit">Lähetä</button>
      </form>
    </div>
  );
};

export default LahetaViesti;
