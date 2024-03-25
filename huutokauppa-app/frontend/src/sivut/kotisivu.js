import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { KayttajaUL } from '../Komponentit/KayttajaList';
import '../App.css';

function Kotisivu() {
  const [recentItems, setRecentItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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

    //HAKUKENTÄN HANDLE, EI TOIMINNASSA
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      // Perform search based on the searchTerm
      const response = await axios.get(`http://localhost:3001/tuotteet/${searchTerm}`) 
      console.log(response)
        const searchResults = response.data;
        setRecentItems(searchResults);
    } catch (error) {
      console.error('Error searching items:', error);
    }
  };

  return (
    <div>
      <h1>Tervetuloa Huutis Houseen</h1>
      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          placeholder="Etsi tavaroita nimellä..."
        />
        <button type="submit">Etsi</button>
      </form>
      
      <h2>Äskettäin lisätyt tavarat</h2>
      <div className="product-list">
        {recentItems.map((item) => (
          <div key={item._id}>
          <Link to={`/tuotteet/${item._id}`} onClick={() => window.scrollTo(0, 0)}>
            <img 
              src={`http://localhost:3001/${item.kuva}`} 
              alt={item.nimi} 
              style={{ maxWidth: '100px', maxHeight: '100px' }} // Limiting size to 100px by 100px
            />
            <p>Nimi: {item.nimi}</p>
            <p>Hinta: {item.lahtohinta}€</p>
            <p>Lisätty: {new Date(item.createdAt).toLocaleString(undefined, { hour12: false, hour: '2-digit', minute: '2-digit', year: 'numeric', month: '2-digit', day: '2-digit' })}</p>
            </Link>
        </div>
        ))}
      </div>
      <KayttajaUL/>
    </div>
  );
}

export default Kotisivu;
