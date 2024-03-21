import React, { useState, useEffect } from 'react';
import axios from "axios"
import { Link } from 'react-router-dom';

export const KayttajaUL = () => {
  const [kayttaja, setkayttaja] = useState([])
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
  };

  return (
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
                <Link to={`/users/${kayttaja._id}`} onClick={() => window.scrollTo(0, 0)}>
                  <button>View Details</button>
                </Link>
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


