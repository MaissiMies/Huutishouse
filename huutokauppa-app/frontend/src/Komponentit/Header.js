import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './Header.css';
import logo from '../assets/Huutis House-logos.jpeg';
import axios from "axios"
import { useAuth } from './kayttajacontext';

function Header(){
  const { user, login, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [nimi, setUsername] = useState('');
  const [salasana, setPassword] = useState('');
  const [userData, setUserData] = useState([]);
  const [showNotification, setShowNotification] = useState(false); // Tilaa ilmoitukselle

  const handleLogin = async () => {
    try {
      if (!nimi || !salasana) {
        setShowNotification(true); // Näytä ilmoitus jos käyttäjänimi tai salasana puuttuu
        setTimeout(() => setShowNotification(false), 3000); // Aseta ajastin ilmoituksen piilottamiseksi 5 sekunnin kuluttua
        return; // Älä jatka kirjautumista
      }

      const response = await axios.post('/api/login', { nimi, salasana });
      console.log('Login successful');
      console.log(response.data)
      setUserData(response.data)
      setUserData(prevData =>({
        ...prevData, // Spread existing JSON data
        nimi: nimi
      }))
      login(userData);
      console.log(userData, "tämä")
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <header>
      <div className="logo-container">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo" onClick={() => window.scrollTo(0, 0)}  />
        </Link>
        <div className="site-info">
          <h1 className="site-name">Huutis House</h1>
          <p className="slogan">Tervetuloa Huutis Houseen - missä jokainen huuto on askel kohti unelma kauppoja</p>
        </div>
        <div className="drop-popout-login">
          <div className="login-area">
            <p className='loggedintext'>Kirjaudu {userData.nimi}</p>
            <button className="login-button" onClick={() => setIsOpen(!isOpen)}>
              Login
            </button>
            {showNotification && ( // Näytä ilmoitus jos showNotification on true
              <div className="notification">
                Kirjaudu sisään kirjoittamalla käyttäjänimi ja salasana.
              </div>
            )}
          </div>
          {isOpen && (
            <div className="popout">
              <input
                type="text"
                placeholder="Username"
                value={nimi}
                onChange={(e) => setUsername(e.target.value)}
              />
              
              <input
                type="password"
                placeholder="Password"
                value={salasana}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="login-submit" onClick={handleLogin}>
                Submit
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
