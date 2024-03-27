import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../Komponentit/kayttajacontext';
import axios from "axios";
import '../App.css';

function Myynti() {

  // Käyttäjäkontekstin käyttöön ottaminen
  const user = useContext(UserContext);
  // Tilamuuttujien määrittely
  const [nimi, setNimi] = useState('');
  const [lahtohinta, setLahtohinta] = useState('');
  const [hintavaraus, setHintavaraus] = useState('');
  const [kuva, setKuva] = useState('');
  const [aika, setAika] = useState('');
  const [selectedKategoria, setSelectedKategoria] = useState('');
  const [kategoriat, setKategoriat] = useState([]);
  const [timeLeft, setTimeLeft] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [access, setaccess] = useState(false);

  // Funktio lähettää tiedot backendiin
  const axiosPostData = async () => {
    const formData = new FormData();
    formData.append('kayttajaid', user.user.objectId);
    formData.append('nimi', nimi);
    formData.append('lahtohinta', lahtohinta);
    formData.append('hintavaraus', hintavaraus);
    formData.append('kuva', kuva);
    formData.append('endingTime', new Date(aika).toISOString());
    formData.append('kategoria', selectedKategoria);
    try {
      const response = await axios.post('http://localhost:3001/myynti', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccessMessage('Tuote lisätty onnistuneesti!');
      // Clear fields
      setNimi('');
      setLahtohinta('');
      setHintavaraus('');
      setKuva('');
      setAika('');
      setSelectedKategoria('');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000); // Display message for 3 seconds
    } catch (error) {
      console.log(error);
    }
  };
  // Lomakkeen lähetyksen käsittely
  const handleSubmit = (e) => {
    e.preventDefault();
    axiosPostData();
    fetchData();
  };

  // Tuotteen esittelykomponentti
  const Product = ({ nimi, lahtohinta, imageUrl, hintavaraus, endingTime }) => (
    <div className="product">
      <h3>{nimi}</h3>
      <p>Viimeisin Hinta: {lahtohinta}€</p>
      <p>Hintavaraus: {hintavaraus}€</p>
      <p>Aika: {endingTime}</p>
      <img src={imageUrl} style={{ maxWidth: '100px', maxHeight: '100px' }} alt="Product" className="product-image" />
    </div>
  );

  // Ajan laskeminen
  const calculateTimeLeft = (endingTime) => {
    if (endingTime) {
      const difference = new Date(endingTime) - new Date();
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        return `${days} päivat ${hours} tunnit ${minutes} minuutit ${seconds} sekunnit`;
      } else {
        return 'Huutaminen päättynyt';
      }
    } else {
      return 'Huutaminen päättynyt';
    }
  };

  // Kategorian haku
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/kategoriat');
        setKategoriat(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Ajan päivitys
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(aika));
    }, 1000);

    return () => clearInterval(timer);
  }, [aika]);

  // Tuotteiden haku
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
   
    try {
      const response = await axios.get('http://localhost:3001/tuotteet');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Kategorian valinnan käsittely
  const handleSelectChange = (event) => {
    setSelectedKategoria(event.target.value);
  }

  return (
    <div className="myynti-container">
      
        <p>{successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="add-product-form">
          <label>
            Nimi:
            <input
              type="text"
              id="nimi"
              name="nimi"
              value={nimi}
              onChange={(e) => setNimi(e.target.value)}
            />
          </label>
          <label>
            Lähtöhinta:
            <input
              type="number"
              id="lahtohinta"
              name="lahtohinta"
              value={lahtohinta}
              onChange={(e) => setLahtohinta(e.target.value)}
            />
          </label>
          <label>
            Hintavaraus:
            <input
              type="number"
              id="hintavaraus"
              name="hintavaraus"
              value={hintavaraus}
              onChange={(e) => setHintavaraus(e.target.value)}
            />
          </label>
          <label>
            Aika:
            <input
              type="datetime-local"
              id="aika"
              name="aika"
              value={aika}
              onChange={(e) => setAika(e.target.value)}
            />
          </label>
          <label>
            Kuva:
            <input
              type="file"
              accept="image/*"
              id="kuva"
              onChange={(e) => setKuva(e.target.files[0])}
            />
          </label>
          <label htmlFor="kategoria">Valitse:
            <select id="kategoria" value={selectedKategoria} onChange={handleSelectChange}>
              <option value="">Valitse...</option>
              {kategoriat.map((kategoria) => (
                <option key={kategoria._id} value={kategoria.selite}>
                  {kategoria.selite}
                </option>
              ))}
            </select>
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
        <br /></p>
    
      <h1>Laita uusi tuote myyntiin</h1>
      

      <div className="product-list">
        {products.map(product => (
          <Link key={product._id} to={`/tuotteet/${product._id}`} onClick={() => window.scrollTo(0, 0)}>
            <Product 
              key={product._id} 
              nimi={product.nimi} 
              lahtohinta={product.lahtohinta}
              hintavaraus={product.hintavaraus} 
              endingTime={calculateTimeLeft(product.endingTime)} 
              imageUrl={`http://localhost:3001/${product.kuva}`} 
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Myynti;

