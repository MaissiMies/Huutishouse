import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Viestit.css'; // Tuodaan tyylitiedosto
import { useAuth } from './kayttajacontext';


const SaapuneetViestit = () => {

  const [selectedThread, setSelectedThread] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [replying, setReplying] = useState(false); // Seurataan, onko vastaamassa
  const { user, login, logout } = useAuth();
  const{userid, setuserid} = useState(user);

  

  
  const [viestiketjut, setViestiketjut] = useState([]);

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        console.log("tämätapahtuii",userid)
        const response = await axios.get(`http://localhost:3001/conversation/${userid}`);
        console.log('Response:', response.data); // Log the response data
        setViestiketjut(response.data);
        console.log(userid)
        
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
        senderId:userid,
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
                <td></td>
                <td>{ketju._id}</td>
                <td>
                <button onClick={(e) => { e.stopPropagation(); handleDeleteThread(ketju.id); }}>Poista</button>
                </td>
              </tr>
              {selectedThread === ketju.id && (
                <tr className="viestiketju">
                  <td colSpan="4">
                    <div className="viestihistoria">
                      {ketju.messages.map((viesti) => (
                        <div key={viesti._id} className="viesti">
                          <p><strong>{viesti.sender}:</strong> {viesti.text}</p>
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
