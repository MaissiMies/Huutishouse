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
  const [userData, setUserData] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [puhnum, setPuhnum] = useState('');
  const [sposti, setSposti] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [notification, setNotification] = useState('');
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false); // Lisätty resetPasswordOpen-tila seuramaan salasanan palautusikkunan tilaa

  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
      setUserData({ nimi: savedUsername });
    }
  }, []);

  const handleLogin = async () => {
    try {
      if (!nimi || !salasana) {
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
        return;
      }

      const response = await axios.post('/api/login', { nimi, salasana });
      console.log('Login successful');
      console.log(response.data)
      setUserData({ nimi });
      login(response.data);
      localStorage.setItem('username', nimi);
      console.log(userData, "tämä")
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleLogout = () => {
    setUserData(null);
    localStorage.removeItem('username');
    logout();
  };

// Inside the reset password button click handler
const handleResetPassword = async () => {
  try {
    if (!nimi || !puhnum || ! sposti || !newPassword) {
      setNotification('Täytä kaikki vaaditut kentät');
      return;
    }

    const response = await axios.post('/api/password-reset', {
      nimi,
      sposti: sposti, // Use the correct field name 'sposti' instead of 'email'
      salasana: newPassword // Pass the new password correctly
    });

    setNotification(response.data);
    // Reset the form and hide the reset password button
    setUsername('');
    setPuhnum('');
    setSposti('');
    setNewPassword('');
    setResetPasswordOpen(false);
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
            {userData && (
              <p className='loggedintext'>Kirjauduttu {userData.nimi}</p>
            )}
            {!userData && (
              <p className='loggedintext'>Kirjaudu</p>
            )}
            <button className="login-button" onClick={() => setIsOpen(!isOpen)}>
              {userData ? 'Logout' : 'Login'}
            </button>
            {showNotification && (
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
                {userData ? 'Logout' : 'Login'}
              </button>
            </div>
          )}
        </div>
        <div>
          <button className="reset-password-button" onClick={() => setResetPasswordOpen(!resetPasswordOpen)}>
            Unohtuiko salasana?
          </button>
          {resetPasswordOpen && (
            <div className="reset-password-popup">
              <input
                type="text"
                placeholder="Username"
                value={nimi}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={puhnum}
                onChange={(e) => setPuhnum(e.target.value)}
              />
              <input
                type="text"
                placeholder="Email"
                value={sposti}
                onChange={(e) => setSposti(e.target.value)}
              />
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button className="reset-password-submit" onClick={handleResetPassword}>
                Reset Password
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
