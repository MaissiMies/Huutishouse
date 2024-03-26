import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Viestit.css'; // Tuodaan tyylitiedosto
import { useAuth } from './kayttajacontext';

// SaapuneetViestit-komponentti
const SaapuneetViestit = () => {

  // Tilamuuttujien määrittely
  const [selectedThread, setSelectedThread] = useState(null); // Valittu viestiketju
  const [replyText, setReplyText] = useState(''); // Vastauksen teksti
  const [replying, setReplying] = useState(false); // Seurataan, onko vastaamassa
  const { user, login, logout } = useAuth(); // Autentikaatiokontekstin käyttö
  const [viestiketjut, setViestiketjut] = useState([]); // Viestiketjujen tila
  

  // Tietojen haku käyttäjän ID:llä
  useEffect(() => {

    // fetchData-funktio, joka hakee viestiketjut käyttäjän ID:n perusteella
    const fetchData = async () => {
     
      try {
        console.log("tämätapahtuii",user.objectId)
        // Tietojen haku palvelimelta
        const response = await axios.get(`http://localhost:3001/conversation/${user.objectId}`);
        console.log('Response:', response.data); // Log the response data // Kirjaa vastauksen tietoja konsoliin
        setViestiketjut(response.data); // Asettaa haetut viestiketjut tilaan
        console.log(user.objectId)
        
      } catch (error) {
        console.error('help', error);
      }
    };
    
    fetchData();
    // Set up interval for fetching new messages every 30 seconds
    const interval = setInterval(fetchData, 5000);
    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);// Tyhjä taulukko varmistaa, että useEffect suoritetaan vain kerran, komponentin alustuksen yhteydessä
  

  // Klikkauskäsittelijä viestiketjun valitsemiselle
  const handleThreadClick = (threadId) => {
    console.log('Clicked thread id:', threadId); 
    setSelectedThread(threadId === selectedThread ? null : threadId);
  };
 

  
    
      // Vastauksen lähettämiskäsittelijä    
      async function handleReply(conversationId) {
    try {
      // Lähetetään viesti palvelimelle
      const response = await axios.post(`/api/conversations/${conversationId}/messages`, {
        senderId:user.objectId,
        sendernameid:user.nimi,
        messageText:replyText
      });
      // Päivitetään sivu
      console.log(response)
    // Clear reply text area
    
  
      console.log(response.data.message);
    } catch (error) {
      console.error('Error adding message to conversation:', error.response.data.error);
    }
    
    // Clear reply text area
    
    
  }
    
  // Piilota viestihistoria -käsittelijä
  const handleHideHistory = () => {
    setSelectedThread(null);
  };

  // Viestiketjun poistamiskäsittelijä
  const handleDeleteThread = (threadId) => {
    // Kopioidaan viestiketjut ja suodatetaan poistettava ketju pois
    const updatedThreads = viestiketjut.filter((ketju) => ketju.id !== threadId);
    // Asetetaan päivitetty viestiketjujen tila
    setViestiketjut(updatedThreads);
  };
  
  // Vastauksen näyttämisen tilan vaihtokäsittelijä
  const toggleReplying = () => {
    setReplying(!replying);
    
  };

  // Käyttäjän tietojen haku ID:n perusteella
  const fetchUserData = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3001/users/${id}`);
      return(
        response.data.nimi // Palautetaan käyttäjän nimi
      );
    } catch (error) {
      console.error('Error fetching user data:', error); // Virheenkäsittely
    }
  };

  // Käyttäjänimet tila
  const [userNames, setUserNames] = useState({});

  // Tietojen haku käyttäjänimien kanssa
  useEffect(() => {
    // fetchUserNames-funktio, joka hakee käyttäjänimet
    const fetchUserNames = async () => {
      const names = {};
      // Käydään läpi viestiketjut ja haetaan käyttäjänimet
      for (const ketju of viestiketjut) {
        const participants = ketju.participants[0]; // Käydään läpi viestiketjut ja haetaan käyttäjänimet
        if (participants && participants.user1 && participants.user2) {
          const user1Id = participants.user1;
          const user2Id = participants.user2;
          const user1Name = await fetchUserData(user1Id);
          const user2Name = await fetchUserData(user2Id);
          names[ketju._id] = { user1Name, user2Name }; 
        }
      }
      setUserNames(names); // Asetetaan käyttäjänimet tilaan
    };
  
    fetchUserNames(); // Kutsutaan fetchUserNames-funktiota
  }, [viestiketjut]); // Suoritetaan aina, kun viestiketjujen tila muuttuu

 

 
  


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
            {viestiketjut.map((ketju, index) => (
              <React.Fragment key={index}>
                <tr onClick={() => handleThreadClick(index)} className="viesti-rivi">
                  <td>{ketju.title}</td>
                  <td>{userNames[ketju._id] ? `${userNames[ketju._id].user1Name}, ${userNames[ketju._id].user2Name}` : 'Loading...'}</td>
                  <td>{ketju.time}</td>
                  <td>
                    <button onClick={(e) => { e.stopPropagation(); handleDeleteThread(ketju._id); }}>Poista</button>
                  </td>
                </tr>
                {selectedThread === index && (
                  <tr className="viestiketju">
                    <td colSpan="4">
                      <div className="viestihistoria">
                        {ketju.messages.map((viesti) => (
                          <div key={viesti._id} className="viesti">
                            <p><strong>{viesti.sendername}:</strong> {viesti.text}</p>
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
                              <button onClick={() => handleReply(ketju._id)}>Lähetä</button>
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
