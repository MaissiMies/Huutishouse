// frontend/src/sivut/rekistrointisivu.js

import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [nimi, setNimi] = useState('');
  const [salasana, setSalasana] = useState('');
  const [sposti, setSposti] = useState('');
  const [puhnum, setPuhnum] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('/api/register', { nimi, salasana, sposti, puhnum });
      console.log(response.data);
      setRegistrationSuccess(true);
      setErrorMessage('');
      setNimi('');
      setSalasana('');
      setSposti('');
      setPuhnum('');
      setTimeout(() => {
        window.location.href = '/';
      }, 5000);
    } catch (error) {
      console.error('Error registering user:', error);
      setRegistrationSuccess(false);
      setErrorMessage(error.response.data);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Käyttäjän rekisteröityminen</h1>
      {registrationSuccess && (
        <p style={styles.successMessage}>Registration successful! You will be redirected to the homepage shortly.</p>
      )}
      {errorMessage && (
        <p style={styles.errorMessage}>{errorMessage}</p>
      )}
      <input
        type="text"
        placeholder="Nimi"
        value={nimi}
        onChange={(e) => setNimi(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Salasana"
        value={salasana}
        onChange={(e) => setSalasana(e.target.value)}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Sähköposti"
        value={sposti}
        onChange={(e) => setSposti(e.target.value)}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Puhelinnumero"
        value={puhnum}
        onChange={(e) => setPuhnum(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleRegister} style={styles.button}>Rekisteröi</button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
  },
  title: {
    marginBottom: '20px',
    fontSize: '24px',
  },
  input: {
    width: '300px',
    height: '40px',
    marginBottom: '10px',
    padding: '5px',
    fontSize: '16px',
  },
  button: {
    width: '200px',
    height: '40px',
    backgroundColor: 'blue',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  successMessage: {
    marginBottom: '10px',
    color: 'green',
    fontSize: '16px',
  },
  errorMessage: {
    marginBottom: '10px',
    color: 'red',
    fontSize: '16px',
  },
};

export default Register;
