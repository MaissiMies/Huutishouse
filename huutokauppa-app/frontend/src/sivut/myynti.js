import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios"
import '../App.css'

function Myynti(){

  const [nimi, setNimi] = useState('')
  const [lahtohinta, setLahtohinta] = useState('')
  const [hintavaraus, setHintavaraus] = useState('')
  const [kuva, setKuva] = useState('')
    
    //tälle pitäisi koodata oikeat error ja response lauseet
    const axiosPostData = async () => {
      const formData = new FormData();
      formData.append('nimi', nimi);
      formData.append('lahtohinta', lahtohinta);
      formData.append('hintavaraus', hintavaraus);
      formData.append('kuva', kuva);
    
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
    
    
  //formi ajaa tämän submit painikkeen jälkeen
  const handleSubmit = (e) => {
    e.preventDefault()      
    axiosPostData()
    handleFetchData();
    
  }
  
  const productsData = [
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 },
    { id: 3, name: 'Product 3', price: 30 },
    { id: 4, name: 'Product 4', price: 40 },
  ];
  
  const Product = ({ nimi, lahtohinta, imageUrl, hintavaraus }) => (
    <div className="product">
      <h3>{nimi}</h3>
      <p>Lähtöhinta: {lahtohinta}€</p>
      <p>Hintavaraus: {hintavaraus}€</p>
      <img src={imageUrl} style={{ maxWidth: '100px', maxHeight: '100px' }} alt="Product" className="product-image" />
    </div>
  );
  //const [products] = useState(productsData);

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

  // You can call fetchData from elsewhere in your component if needed
  const handleFetchData = () => {
    fetchData();
  };


  //myynti sivun html
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
          Kuva:
          <input
            type="file"
            accept="image/*"
            id="kuva"
            onChange={(e) => setKuva(e.target.files[0])}
          />
        </label>
        <button type="submit">Submit</button>
      </form>

      <br/>
      <br/>


      <div className="product-list">
  {products.map(product => (
    <Link key={product.productId} to={`/tuotteet/${product.productId}`} onClick={() => window.scrollTo(0, 0)}>
      <Product 
        key={product.productId} 
        nimi={product.nimi} 
        lahtohinta={product.lahtohinta}
        hintavaraus={product.hintavaraus} 
        imageUrl={`http://localhost:3001/${product.kuva}`} // Adjust this URL to match your backend
      />
    </Link>
  ))}
</div>
    </div>
  );
  
};

export default Myynti;
