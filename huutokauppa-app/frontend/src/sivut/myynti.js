import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../Komponentit/kayttajacontext';
import axios from "axios";
import '../App.css';

function Myynti() {
  const user = useContext(UserContext);
  const [nimi, setNimi] = useState('');
  const [lahtohinta, setLahtohinta] = useState('');
  const [hintavaraus, setHintavaraus] = useState('');
  const [kuva, setKuva] = useState('');
  const [aika, setAika] = useState('');
  const [selectedKategoria, setSelectedKategoria] = useState('');
  const [kategoriat, setKategoriat] = useState([]);
  const [timeLeft, setTimeLeft] = useState({});

  const axiosPostData = async () => {
    const formData = new FormData();
    formData.append('kayttajaid', user.user.objectId);
    formData.append('nimi', nimi);
    formData.append('lahtohinta', lahtohinta);
    formData.append('hintavaraus', hintavaraus);
    formData.append('kuva', kuva);
    formData.append('endingTime', new Date(aika).toISOString());
    try {
      const response = await axios.post('http://localhost:3001/myynti', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosPostData();
    fetchData();
  };

  const Product = ({ nimi, lahtohinta, imageUrl, hintavaraus, endingTime }) => (
    <div className="product">
      <h3>{nimi}</h3>
      <p>Lähtöhinta: {lahtohinta}€</p>
      <p>Hintavaraus: {hintavaraus}€</p>
      <p>Aika: {endingTime === 'Huutaminen päättynyt' ? endingTime : new Date(endingTime).toLocaleString()}</p>
      <img src={imageUrl} style={{ maxWidth: '100px', maxHeight: '100px' }} alt="Product" className="product-image" />
    </div>
  );

  const calculateTimeLeft = () => {
    const difference = new Date(aika) - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = 'Huutaminen päättynyt';
    }

    return timeLeft;
  };

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [aika]);

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

  const handleSelectChange = (event) => {
    setSelectedKategoria(event.target.value);
  }

  return (
    <div className="myynti-container">
      <h1>Laita uusi tuote myyntiin</h1>
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
      <br />

      <div className="product-list">
        {products.map(product => (
          <Link key={product._id} to={`/tuotteet/${product._id}`} onClick={() => window.scrollTo(0, 0)}>
            <Product 
              key={product._id} 
              nimi={product.nimi} 
              lahtohinta={product.lahtohinta}
              hintavaraus={product.hintavaraus} 
              endingTime={product.endingTime} 
              imageUrl={`http://localhost:3001/${product.kuva}`} 
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Myynti;

