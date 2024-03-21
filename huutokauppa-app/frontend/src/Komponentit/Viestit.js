import React, { useState } from 'react';
import './Viestit.css'; // Tuodaan tyylitiedosto

const Viestit = ({ myyjanNimi, tuotteenNimi }) => {
  const [otsikko, setOtsikko] = useState('');
  const [viesti, setViesti] = useState('');
  const [saapuneetViestit, setSaapuneetViestit] = useState([
    // Kovakoodatut testiviestit
    {
      otsikko: 'Testiviesti 1',
      viesti: 'Tämä on ensimmäinen testiviesti.',
      lahettaja: 'Testaaja 1',
      vastaanottaja: 'Sinä',
      aika: '2024-03-21 10:00:00'
    },
    {
      otsikko: 'Testiviesti 2',
      viesti: 'Tämä on toinen testiviesti.',
      lahettaja: 'Testaaja 2',
      vastaanottaja: 'Sinä',
      aika: '2024-03-21 10:30:00'
    },
    {
      otsikko: 'Testiviesti 3',
      viesti: 'Tämä on kolmas testiviesti.',
      lahettaja: 'Testaaja 3',
      vastaanottaja: 'Sinä',
      aika: '2024-03-21 11:00:00'
    }
  ]);

  // Viesti, jota käyttäjä on valinnut
  const [valittuViesti, setValittuViesti] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Tallenna viesti
    const uusiViesti = {
      otsikko,
      viesti,
      lahettaja: 'Sinä', // Voittaja
      vastaanottaja: myyjanNimi,
      aika: new Date().toLocaleString()
    };
    setSaapuneetViestit([...saapuneetViestit, uusiViesti]);
    // Tyhjennä lomake
    setOtsikko('');
    setViesti('');
  };

  const handleDelete = (index) => {
    const uudetViestit = [...saapuneetViestit];
    uudetViestit.splice(index, 1);
    setSaapuneetViestit(uudetViestit);
  };

  const handleReply = () => {
    // Toteuta vastauksen lähettäminen täällä
    
  };

  // Näytä viestin historia
  const näytäViestiHistoria = (index) => {
    setValittuViesti(saapuneetViestit[index]);
  };

  // Piilota viestin historia
  const piilotaViestiHistoria = () => {
    setValittuViesti(null);
  };

  return (

    <div className="viestikeskus">
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
            placeholder={`Olet voittanut ${tuotteenNimi}`}
            value={viesti}
            onChange={(e) => setViesti(e.target.value)}
            required
          ></textarea>
          <button type="submit">Lähetä</button>
        </form>
      </div>

      <div className="saapuneet-viestit">
        <h3>Saapuneet viestit ({saapuneetViestit.length})</h3>
        <table>
          <thead>
            <tr>
              <th>Otsikko</th>
              <th>Lähettäjä</th>
              <th>Aika</th>
              <th>Viesti</th>
              <th>Toiminnot</th>
            </tr>
          </thead>
          <tbody>
            {saapuneetViestit.map((viesti, index) => (
              <tr
                key={index}
                onClick={() => näytäViestiHistoria(index)}
                className="viesti-rivi"
              >
                <td>{viesti.otsikko}</td>
                <td>{viesti.lahettaja}</td>
                <td>{viesti.aika}</td>
                <td>{viesti.viesti}</td>
                <td>
                  <button onClick={() => handleDelete(index)}>Poista</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Näytetään valitun viestin historia, jos sellainen on */}
      {valittuViesti && (
        <div className="viestin-historia">
          <h3>Valitun viestin historia</h3>
          <div className="viestit">
            <div className="lähettäjän-viesti">
              <h4>Lähettäjän viesti</h4>
              <p>
                <strong>Otsikko:</strong> {valittuViesti.otsikko}
              </p>
              <p>
                <strong>Aika:</strong> {valittuViesti.aika}
              </p>
              <p>{valittuViesti.viesti}</p>
            </div>
            <div className="vastaanottajan-viesti">
              <h4>Vastaanottajan viestit</h4>
              {/* Kovakoodatut testiviestit vastaanottajan puolelta */}
              <p>
                <strong>Aika:</strong> 2024-03-21 11:15:00
              </p>
              <p>Tässä on vastaus lähettäjälle.</p>
              <p>
                <strong>Aika:</strong> 2024-03-21 11:30:00
              </p>
              <p>Ja tässä toinen vastaus.</p>
            </div>
          </div>
          <button onClick={piilotaViestiHistoria}>
            Piilota viestin historia
          </button>
          <button onClick={handleReply}>Lähetä vastaus</button> {/* Lisätty painike vastauksen lähettämiseksi */}
        </div>
      )}
    </div>
    );
  };
  
  export default Viestit;
   


  



  
  
  