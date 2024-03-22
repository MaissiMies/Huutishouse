import React, { useState } from 'react';
import './Viestit.css'; // Tuodaan tyylitiedosto

const SaapuneetViestit = () => {
  const [viestiketjut, setViestiketjut] = useState([
    // Kovakoodatut viestiketjut
    {
        id: 1,
        otsikko: 'Ostotarjous tuotteesta X',
        lahettaja: 'Myyjä1',
        aika: '2024-03-21 09:30',
        viestit: [
          { id: 1, lahettaja: 'Myyjä1', teksti: 'Hei, kiitos tarjouksestasi.' },
          { id: 2, lahettaja: 'Ostaja1', teksti: 'Olisitko valmis laskemaan hintaa?' },
          { id: 3, lahettaja: 'Myyjä1', teksti: 'Kyllä, voisin laskea hintaa hieman.' },
          { id: 4, lahettaja: 'Ostaja1', teksti: 'Hienoa, voimmeko sopia tapaamisesta?' },
          { id: 5, lahettaja: 'Myyjä1', teksti: 'Tottakai, milloin sinulle sopii?' }
        ]
      },
      {
        id: 2,
        otsikko: 'Kysymys tuotteesta Y',
        lahettaja: 'Myyjä2',
        aika: '2024-03-20 15:45',
        viestit: [
          { id: 1, lahettaja: 'Myyjä2', teksti: 'Hei, miten voin auttaa?' },
          { id: 2, lahettaja: 'Asiakas1', teksti: 'Onko tuote saatavilla vielä?' },
          { id: 3, lahettaja: 'Myyjä2', teksti: 'Kyllä, tuote on edelleen saatavilla.' }
        ]
      }
  ]);

  const [selectedThread, setSelectedThread] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [replying, setReplying] = useState(false); // Seurataan, onko vastaamassa

  const handleThreadClick = (threadId) => {
    setSelectedThread(threadId === selectedThread ? null : threadId);
  };

  const handleReply = () => {
    // Implement sending reply logic here
    console.log('Reply sent:', replyText);
    // Clear reply text area
    setReplyText('');
  };

  const handleHideHistory = () => {
    setSelectedThread(null);
  };

  const handleDeleteThread = (threadId) => {
    // Kopioidaan viestiketjut ja suodatetaan poistettava ketju pois
    const updatedThreads = viestiketjut.filter((ketju) => ketju.id !== threadId);
    // Asetetaan päivitetty viestiketjujen tila
    setViestiketjut(updatedThreads);
  };
  

  const toggleReplying = () => {
    setReplying(!replying);
    setReplyText(''); // Tyhjennä tekstikenttä
  };

  return (
    <div className="saapuneet-viestit">
      <h3>Saapuneet viestit ({viestiketjut.length})</h3>
      <table>
        <thead>
          <tr>
            <th>Otsikko</th>
            <th>Lähettäjä</th>
            <th>Aika</th>
            <th>Toiminnot</th>
          </tr>
        </thead>
        <tbody>
          {viestiketjut.map((ketju) => (
            <React.Fragment key={ketju.id}>
              <tr onClick={() => handleThreadClick(ketju.id)} className="viesti-rivi">
                <td>{ketju.otsikko}</td>
                <td>{ketju.lahettaja}</td>
                <td>{ketju.aika}</td>
                <td>
                <button onClick={(e) => { e.stopPropagation(); handleDeleteThread(ketju.id); }}>Poista</button>
                </td>
              </tr>
              {selectedThread === ketju.id && (
                <tr className="viestiketju">
                  <td colSpan="4">
                    <div className="viestihistoria">
                      {ketju.viestit.map((viesti) => (
                        <div key={viesti.id} className="viesti">
                          <p><strong>{viesti.lahettaja}:</strong> {viesti.teksti}</p>
                        </div>
                      ))}
                      <div className="viestitoiminnot">
                        {replying && (
                          <div className="vastaa-viestiin">
                            <textarea
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              placeholder="Vastaa viestiin..."
                            ></textarea>
                            <button onClick={handleReply}>Lähetä</button>
                          </div>
                        )}
                        <div className="viestitoiminnot-buttons">
                          <button onClick={toggleReplying}>
                            {replying ? 'Peruuta' : 'Vastaa viestiin'}
                          </button>
                          <button onClick={handleHideHistory}>Piilota historia</button>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SaapuneetViestit;
