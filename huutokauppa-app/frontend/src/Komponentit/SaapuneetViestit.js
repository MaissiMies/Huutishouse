import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Viestit.css'; // Tuodaan tyylitiedosto
import { useAuth } from './kayttajacontext';


const SaapuneetViestit = () => {

  const [selectedThread, setSelectedThread] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [replying, setReplying] = useState(false); // Seurataan, onko vastaamassa
  const { user, login, logout } = useAuth();
  const [viestiketjut, setViestiketjut] = useState([]);
  

  useEffect(() => {
    
    const fetchData = async () => {
     
      try {
        console.log("tämätapahtuii",user.objectId)
        const response = await axios.get(`http://localhost:3001/conversation/${user.objectId}`);
        console.log('Response:', response.data); // Log the response data
        setViestiketjut(response.data);
        console.log(user.objectId)
        
      } catch (error) {
        console.error('help', error);
      }
    };
  
    fetchData();
  }, []);
  

  const handleThreadClick = (threadId) => {
    setSelectedThread(threadId === selectedThread ? null : threadId);
  };
 
  
    
    
      async function handleReply(conversationId) {
    try {
      const response = await axios.post(`/api/conversations/${conversationId}/messages`, {
        senderId:user.objectId,
        sendernameid:user.nimi,
        messageText:replyText
      });
      console.log(response)
    // Clear reply text area
    
  
      console.log(response.data.message);
    } catch (error) {
      console.error('Error adding message to conversation:', error.response.data.error);
    }
    
    // Clear reply text area
    
  
  }
    

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
    
  };
  const fetchUserData = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3001/users/${id}`);
      return(
        response.data.nimi
      );
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  const [userNames, setUserNames] = useState({});

  useEffect(() => {
    const fetchUserNames = async () => {
      const names = {};
      for (const ketju of viestiketjut) {
        const participants = ketju.participants[0]; // Access the first object in the participants array
        if (participants && participants.user1 && participants.user2) {
          const user1Id = participants.user1;
          const user2Id = participants.user2;
          const user1Name = await fetchUserData(user1Id);
          const user2Name = await fetchUserData(user2Id);
          names[ketju._id] = { user1Name, user2Name }; // Use ketju._id as the key
        }
      }
      setUserNames(names);
    };
  
    fetchUserNames();
  }, [viestiketjut]);



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
  <React.Fragment key={ketju._id}>
    <tr onClick={() => handleThreadClick(ketju.id)} className="viesti-rivi">
      <td></td>
      <td>{userNames[ketju._id] ? `${userNames[ketju._id].user1Name}, ${userNames[ketju._id].user2Name}` : 'Loading...'}</td>
      <td>
        <button onClick={(e) => { e.stopPropagation(); handleDeleteThread(ketju._id); }}>Poista</button>
      </td>
    </tr>
              {selectedThread === ketju.id && (
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
