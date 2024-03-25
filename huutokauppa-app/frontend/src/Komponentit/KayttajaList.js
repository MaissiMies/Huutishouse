import React, { useState, useEffect } from 'react';
import axios from "axios"
import { Link } from 'react-router-dom';

export const KayttajaUL = () => {
  const [kayttaja, setkayttaja] = useState([]);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

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
  }, [deleteSuccess]);

  const handleDeleteUser = async (id) => {
    const confirmDelete = window.confirm('Haluatko varmasti poistaa käyttäjän?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3001/users/${id}`);
        // Poista käyttäjä taulukosta
        setkayttaja(kayttaja.filter(user => user._id !== id));
        setDeleteSuccess(true); // Näytä onnistumisviesti
        setTimeout(() => {
          setDeleteSuccess(false); // Piilota viesti ajan kuluttua
        }, 3000); // Aika millisekunteina, esim. 3000 = 3 sekuntia
        console.log('Käyttäjä poistettu onnistuneesti');
      } catch (error) {
        console.error('Virhe käyttäjän poistossa:', error);
      }
    }
  };
  
  // Tyylimääritykset
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
    button: {
      backgroundColor: 'red',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      padding: '5px 10px',
    },
    successMessage: {
      color: 'green',
      marginTop: '10px',
    }
  };

  return (
    <div>
      <br/>
      
      {deleteSuccess && (
        <div style={style.successMessage}>
          Käyttäjä poistettu onnistuneesti.
        </div>
      )}
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
          {Array.isArray(kayttaja) && kayttaja.map((user) => (
            <tr key={user._id}>
              <td style={style.td} title={user._id}>{user._id.slice(-6)}</td>
              <td style={style.td}>{user.nimi}</td>
              <td style={style.td}>{user.puhnum}</td>
              <td style={style.td}>{user.sposti}</td>
              <td style={style.td}>{user.kayttajatunnus}</td>
              <td style={style.td}>
                <Link to={`/users/${user._id}`} onClick={() => window.scrollTo(0, 0)}>
                  <button>Katso tiedot</button>
                </Link>
                <button style={style.button} onClick={() => handleDeleteUser(user._id)}>Poista käyttäjä</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


// YLLÄ VERSIO JOSSA TIEDOT ILMOITETAAN TABLESSA, 
// SEKÄ ID LYHENNETTY 6 VIIMEISEEN MERKKIIN HOVERILLA NÄKEE KAIKKI TIEDOT ID:STÄ

// ALLA AIEMPI VERSIO 


// import React, { useState, useEffect } from 'react';
// import axios from "axios"
// import { Link } from 'react-router-dom';

// export const KayttajaUL = () => {
//   const[kayttaja,setkayttaja] = useState([])
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:3001/kayttajat');
//         console.log('Response:', response.data); // Log the response data
//         setkayttaja(response.data);
        
//       } catch (error) {
//         console.error('Virhe kayttajien haussa:', error);
//       }
//     };
  
//     fetchData();
//   }, []);
  

// return (
//   <ul>
//     {Array.isArray(kayttaja) ? (
//       kayttaja.map((kayttaja) => (
//         <li key={kayttaja.id}>
//          {kayttaja._id} - {kayttaja.nimi} - {kayttaja.puhnum} - {kayttaja.sposti} - {kayttaja.kayttajatunnus}
//           <Link to={`/users/${kayttaja._id}`} onClick={() => window.scrollTo(0, 0)}>
//             <button>View Details</button>
//           </Link>
//         </li>
//       ))
//     ) : (
//       <li>No users found</li>
//     )}
//   </ul>
// );
// }


