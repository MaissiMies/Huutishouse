import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
function Register() {
  const [nimi, setnimi] = useState('');
  const [salasana, setsalasana] = useState('');
  const [sposti, setsposti] = useState('');
  const [puhnum, setpuhnum] = useState('');

  const handleRegister = async () => {
    try {
      await axios.post('/api/register', { nimi, salasana, sposti, puhnum});
      console.log('User registered successfully');
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  const handleLogin = async () => {
    try {
      await axios.post('/api/login', { nimi, salasana });
      console.log('Login successful');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div>
      <h1>User Registration</h1>
      <input type="text" placeholder="Username" value={nimi} onChange={(e) => setnimi(e.target.value)} />
      <input type="password" placeholder="Password" value={salasana} onChange={(e) => setsalasana(e.target.value)} />
      <input type="text" placeholder="Email" value={sposti} onChange={(e) => setsposti(e.target.value)} />
      <input type="text" placeholder="Phone number" value={puhnum} onChange={(e) => setpuhnum(e.target.value)} />
      <button onClick={handleRegister}>Register</button>
      
    </div>
  );
}

export default Register;