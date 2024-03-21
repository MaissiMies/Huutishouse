import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [nimi, setNimi] = useState('');
  const [salasana, setSalasana] = useState('');
  const [sposti, setSposti] = useState('');
  const [puhnum, setPuhnum] = useState('');

  const handleRegister = async () => {
    try {
      await axios.post('/api/register', { nimi, salasana, sposti, puhnum });
      console.log('User registered successfully');
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>User Registration</h1>
      <input
        type="text"
        placeholder="Username"
        value={nimi}
        onChange={(e) => setNimi(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Password"
        value={salasana}
        onChange={(e) => setSalasana(e.target.value)}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Email"
        value={sposti}
        onChange={(e) => setSposti(e.target.value)}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Phone number"
        value={puhnum}
        onChange={(e) => setPuhnum(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleRegister} style={styles.button}>Register</button>
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
};

export default Register;
