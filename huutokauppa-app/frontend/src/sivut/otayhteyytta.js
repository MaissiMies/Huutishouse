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
    <div style={styles.container}>
      <h2 style={styles.title}>Ota yhteyttä</h2>
      <form onSubmit={kasitteleLahetys} style={styles.form}>
        <div style={styles.inputGroup}>
          <label htmlFor="nimi" style={styles.label}>Lähettäjän nimi:</label>
          <input
            type="text"
            id="nimi"
            value={nimi}
            onChange={(e) => setNimi(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="viesti" style={styles.label}>Viesti:</label>
          <textarea
            id="viesti"
            value={viesti}
            onChange={(e) => setViesti(e.target.value)}
            required
            style={styles.textarea}
          />
        </div>
        <button type="submit" style={styles.button}>Lähetä</button>
      </form>

      <h2 style={styles.title}>Palauteviestit</h2>
      <ul style={styles.feedbackList}>
        {palaute.map((viesti, index) => (
          <li key={index} style={styles.feedbackItem}>
            <strong style={styles.feedbackLabel}>Lähettäjä:</strong> {viesti.nimi}<br />
            <strong style={styles.feedbackLabel}>Viesti:</strong> {viesti.viesti}
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    marginBottom: '20px',
    fontSize: '24px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '300px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '10px',
  },
  label: {
    marginBottom: '5px',
    fontSize: '18px',
  },
  input: {
    width: '300px',
    height: '20px',
    marginBottom: '10px',
    padding: '5px',
    fontSize: '16px',
  },
  textarea: {
    width: '100%',
    height: '100px',
    marginBottom: '10px',
    padding: '5px',
    fontSize: '16px',
  },
  button: {
    width: '300px',
    height: '40px',
    backgroundColor: 'blue',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  feedbackList: {
    listStyleType: 'none',
    padding: '0',
    margin: '0',
    fontSize: '18px',
  },
  feedbackItem: {
    marginBottom: '20px',
  },
  feedbackLabel: {
    marginRight: '5px',
  },
};

export default Otayhteytta;
