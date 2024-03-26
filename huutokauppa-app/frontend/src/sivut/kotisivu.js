import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { KayttajaUL } from '../Komponentit/KayttajaList';
import '../App.css';

function Kotisivu() {
  const [recentItems, setRecentItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showRecentItemsLabel, setShowRecentItemsLabel] = useState(true); // State variable for toggling labels



  useEffect(() => {
    fetchRecentItems();
  }, []);

  const fetchRecentItems = async () => {
    try {
      const response = await axios.get('http://localhost:3001/recenttuotteet');
      const latestProducts = response.data.slice(0, 5); // Limiting to the 5 latest products
      setRecentItems(latestProducts);
    } catch (error) {
      console.error(error.message);
    }
  };

  // HAKUKENTÄN HANDLE, EI TOIMINASSA
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      // Perform search based on the searchTerm
      const response = await axios.get(`http://localhost:3001/tuotteet/${searchTerm}`);
      const searchResults = response.data;
      setRecentItems(searchResults);
      setShowRecentItemsLabel(false);
    } catch (error) {
      console.error('Error searching items:', error);
    }
  };

  const styles = {
    myyntiContainer: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
    },
    addProductForm: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    },
    label: {
      display: 'flex',
      flexDirection: 'column',
      fontSize: '16px',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
    productList: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '20px',
    },
    product: {
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '4px',
    },
    productH3: {
      marginTop: '0',
    },
    productP: {
      marginBottom: '0',
    },
    select: {
      padding: '8px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      width: '100%',
    },
    selectOption: {
      padding: '8px',
    },
  };

  const label = showRecentItemsLabel ? "Äskettäin lisätyt tavarat" : "Hakutulokset";

  return (
    <div>
      <h1>Tervetuloa Huutis Houseen</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Etsi tavaroita nimellä..."
          style={styles.addProductForm}
        />
        <button type="submit" style={{ ...styles.button, ...styles.buttonHover }}>
          Etsi
        </button>
      </form>

       <h2>{label}</h2>
      <div style={styles.productList}>
        {recentItems.map((item) => (
          <div key={item._id} style={styles.product}>
            <Link to={`/tuotteet/${item._id}`} onClick={() => window.scrollTo(0, 0)}>
              <img
                src={`http://localhost:3001/${item.kuva}`}
                alt={item.nimi}
                style={{ maxWidth: '100px', maxHeight: '100px' }} // Limiting size to 100px by 100px
              />
              <p style={styles.productP}>Nimi: {item.nimi}</p>
              <p style={styles.productP}>Hinta: {item.lahtohinta}€</p>
              <p style={styles.productP}>Lisätty: {new Date(item.createdAt).toLocaleString(undefined, { hour12: false, hour: '2-digit', minute: '2-digit', year: 'numeric', month: '2-digit', day: '2-digit' })}</p>
            </Link>
          </div>
        ))}
      </div>
      <KayttajaUL />
    </div>
  );
}

export default Kotisivu;
