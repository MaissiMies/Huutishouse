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
  const [userData, setUserData] = useState(null); // Muutettu tyhjästä taulukosta nulliksi
  const [showNotification, setShowNotification] = useState(false); // Tilaa ilmoitukselle
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
      setUserData({ nimi: savedUsername }); // Asetetaan käyttäjänimi userDataan
    }
  }, []);

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
      setUserData({ nimi }); // Tallenna käyttäjänimi userDataan
      login(response.data); // Kirjaa käyttäjä sisään
      localStorage.setItem('username', nimi); // Tallennetaan käyttäjänimi localStorageen
      console.log(userData, "tämä")
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleLogout = () => {
    // Redirect to the homepage
    window.location.href = '/';
  
    // Logout after redirecting
    setTimeout(() => {
      setUserData(null);
      localStorage.removeItem('username');
      logout();
    }, 0); // Ajastin
  };
  
  const handleResetPassword = async () => {
        try {
           if (!nimi || !phoneNumber || !email || !newPassword) {
            setNotification('Täytä kaikki vaaditut kentät');
             return;
         }
    
         const response = await axios.post('/api/reset-password', {
          nimi,
          phoneNumber,
          email,
          newPassword
         });
         setNotification(response.data);
        } catch (error) {
         console.error('Virhe salasanan palautuksessa:', error);
         setNotification('Salasanan palauttaminen epäonnistui');
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
            {userData && ( // Näytä käyttäjänimi jos se on olemassa
              <p className='loggedintext'>Kirjauduttu {userData.nimi}</p>
            )}
            {!userData && ( // Näytä "Kirjaudu" jos käyttäjänimiä ei ole
              <p className='loggedintext'>Kirjaudu</p>
            )}
            <button className="login-button" onClick={() => setIsOpen(!isOpen)}>
              {userData ? 'Logout' : 'Login'} {/* Vaihda tekstin "Login" tai "Logout" mukaan käyttäjän kirjautumistilan perusteella */}
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
              <button className="login-submit" onClick={userData ? handleLogout : handleLogin}>
                {userData ? 'Logout' : 'Login'} {/* Vaihda tekstin "Login" tai "Logout" mukaan käyttäjän kirjautumistilan perusteella */}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;


// HOMOSTELUA, SALASANAN PALATUS YRITYS PLUS MUUTA SEURAAVASSA 
// KUN AJAA EI KIRJATUMINEN ONNISTUNUT EIKÄ SEN LISÄKSI MUUTKAAN



// import { Link } from 'react-router-dom';
// import React, { useState } from 'react';
// import './Header.css';
// import logo from '../assets/Huutis House-logos.jpeg';
// import axios from "axios"
// import { useAuth } from './kayttajacontext';

// function Header() {
//   const { user, login, logout } = useAuth();
//   const [isOpen, setIsOpen] = useState(false);
//   const [nimi, setNimi] = useState('');
//   const [salasana, setSalasana] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [email, setEmail] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [userData, setUserData] = useState({});
//   const [showNotification, setShowNotification] = useState(false); 
//   const [isLoggedIn, setIsLoggedIn] = useState(false); 
//   const [notification, setNotification] = useState('');
//   const [showResetPassword, setShowResetPassword] = useState(false);

//   const handleResetPassword = async () => {
//     try {
//       if (!nimi || !phoneNumber || !email || !newPassword) {
//         setNotification('Täytä kaikki vaaditut kentät');
//         return;
//       }

//       const response = await axios.post('/api/reset-password', {
//         nimi,
//         phoneNumber,
//         email,
//         newPassword
//       });
//       setNotification(response.data);
//     } catch (error) {
//       console.error('Virhe salasanan palautuksessa:', error);
//       setNotification('Salasanan palauttaminen epäonnistui');
//     }
//   };

//   const handleLogin = async () => {
//     try {
//       if (!nimi || !salasana) {
//         setShowNotification(true); // Näytä ilmoitus jos käyttäjänimi tai salasana puuttuu
//         setTimeout(() => setShowNotification(false), 3000); // Aseta ajastin ilmoituksen piilottamiseksi 5 sekunnin kuluttua
//         return; // Älä jatka kirjautumista
//       }

//       const response = await axios.post('/api/login', { nimi, salasana });
//       console.log('Login successful');
//       console.log(response.data)
//       setUserData(response.data)
//       setUserData(prevData =>({
//         ...prevData, // Spread existing JSON data
//         nimi: nimi
//       }))
//       login(userData);
//       console.log(userData, "tämä")
//     } catch (error) {
//       console.error('Error logging in:', error);
//     }
//   };

//   return (
//     <header>
//       <div className="logo-container">
//         <Link to="/">
//           <img src={logo} alt="Logo" className="logo" onClick={() => window.scrollTo(0, 0)} />
//         </Link>
//         <div className="site-info">
//           <h1 className="site-name">Huutis House</h1>
//           <p className="slogan">Tervetuloa Huutis Houseen - missä jokainen huuto on askel kohti unelma kauppoja</p>
//         </div>
//         <div className="drop-popout-login">
//           <div className="login-area">
//             <p className='loggedintext'>{isLoggedIn ? `Kirjauduttu ${userData.username}` : 'Kirjaudu'}</p>
//             <button className="login-button" onClick={() => setIsOpen(!isOpen)}>
//               Kirjaudu
//             </button>
//             {showNotification && (
//               <div className="notification">
//                 Kirjaudu sisään kirjoittamalla käyttäjänimi ja salasana.
//               </div>
//             )}
//           </div>
//           {isOpen && (
//             <div className="popout">
//               <input
//                 type="text"
//                 placeholder="Käyttäjänimi"
//                 value={nimi}
//                 onChange={(e) => setNimi(e.target.value)}
//               />
//               <input
//                 type="password"
//                 placeholder="Salasana"
//                 value={salasana}
//                 onChange={(e) => setSalasana(e.target.value)}
//               />
//               <button className="login-submit" onClick={handleLogin}>
//                 Kirjaudu
//               </button>

//               <button className="forgot-password" onClick={() => setShowResetPassword(!showResetPassword)}>
//                 Unohtuiko salasana?
//               </button>

//               {showResetPassword && (
//                 <div className="reset-password-form">
//                   <input
//                     type="text"
//                     placeholder="Käyttäjänimi"
//                     value={nimi}
//                     onChange={(e) => setNimi(e.target.value)}
//                   />
//                   <input
//                     type="text"
//                     placeholder="Puhelinnumero"
//                     value={phoneNumber}
//                     onChange={(e) => setPhoneNumber(e.target.value)}
//                   />
//                   <input
//                     type="text"
//                     placeholder="Sähköposti"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                   <input
//                     type="password"
//                     placeholder="Uusi salasana"
//                     value={newPassword}
//                     onChange={(e) => setNewPassword(e.target.value)}
//                   />
//                   <button className="reset-password-button" onClick={handleResetPassword}>
//                     Palauta salasana
//                   </button>
//                 </div>
//               )}
//               {notification && <div className="notification">{notification}</div>}
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// }

// export default Header;
