import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useParams } from 'react-router-dom';

function Tuoteetsivu() {
  const { kategoria } = useParams();
  const [timeLeft, setTimeLeft] = useState({});
  const [products, setProducts] = useState([]);
  const [aika, setAika] = useState('');

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
        const response = await axios.get(`http://localhost:3001/tuotteet/kategoria/${kategoria}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    fetchData();

    return () => {
      clearTimeout(timer);
    };
  }, [kategoria, aika]);

  return (
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
  );
}

export default Tuoteetsivu;
