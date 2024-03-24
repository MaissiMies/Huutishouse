
import React, { useState, useEffect } from 'react';
import axios from "axios"
import { Link } from 'react-router-dom';
import { useAuth } from './kayttajacontext';

const style = {
  table: {
    borderCollapse: 'collapse',
    width: '100%',
  },
  th: {
    border: '1px solid #dddddd',
    textAlign: 'left',
    padding: '8px',
  },
  td: {
    border: '1px solid #dddddd',
    textAlign: 'left',
    padding: '8px',
  },
};

const LahetaViesti = ({ myyjanNimi, tuotteenNimi }) => {
  const { user, login, logout } = useAuth();
  const [otsikko, setOtsikko] = useState('');
  const [viesti, setViesti] = useState('');
  const [kayttaja, setkayttaja] = useState([])
  const [kkayttaja1, setkkayttaj1] = useState([])
  const[participants, setparticipants] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/kayttajat');
        console.log('Response:', response.data); // Log the response data
        setkayttaja(response.data);
        
      } catch (error) {
        console.error('Virhe kayttajien haussa:', error);
      }
    };
  
    fetchData();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    // Tässä voisi toteuttaa viestin lähetyksen
  };
  async function createConversation() {
    try {
    
      const response = await axios.post('/api/conversations', {participants});
      console.log('New conversation created:', response.data);
      return response.data; // Return the created conversation
    } catch (error) {
      console.error('Error creating conversation:', error.response.data.error);
      throw error; // Propagate the error
    }
  }
  const handlekayttaja = (kayttaja) =>{
    console.log(kayttaja,"usersasda")
    setkkayttaj1(kayttaja._id)
    setparticipants({user1 : user.objectId, user2: kayttaja})
    console.log(participants);
  }

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
      <button onClick={() => createConversation()}>luo keskustelu</button>
      <table style={style.table}>
      <thead>
        <tr>
          <th style={style.th}>ID</th>
          <th style={style.th}>Nimi</th>
          <th style={style.th}>Puhelinnumero</th>
          <th style={style.th}>Sähköposti</th>
          <th style={style.th}>Käyttäjätunnus</th>
          <th style={style.th}>Toiminnot</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(kayttaja) ? (
          kayttaja.map((kayttaja) => (
            <tr key={kayttaja.id}>
              <td style={style.td} title={kayttaja._id}>{kayttaja._id.slice(-6)}</td>
              <td style={style.td}>{kayttaja.nimi}</td>
              <td style={style.td}>{kayttaja.puhnum}</td>
              <td style={style.td}>{kayttaja.sposti}</td>
              <td style={style.td}>{kayttaja.kayttajatunnus}</td>
              <td style={style.td}>
              <button onClick={() => handlekayttaja(kayttaja._id)}></button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td style={style.td} colSpan="6">No users found</td>
          </tr>
        )}
      </tbody>
    </table>
    </div>
  );
};

export default LahetaViesti;
