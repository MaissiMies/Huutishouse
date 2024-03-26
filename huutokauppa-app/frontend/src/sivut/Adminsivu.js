import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../Komponentit/kayttajacontext';
import '../App.css';
import { KategoriaUL } from '../Komponentit/kategoriatUL';
import { KayttajaUL } from '../Komponentit/KayttajaList';

function Adminsivu(){
const [access, setaccess] = useState(false)
const { user } = useAuth();
const [products, setProducts] = useState([]);
const [deleteSuccess, setDeleteSuccess] = useState(false);


useEffect(() => {
    if (user.objectId === "66029af4b6e195fa450ce67c") {
      setaccess(true);
      console.log(user.objectId,"1  2")
    } else {
      setaccess(false);
    }
  }, [user.objectId]);

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

 const handleDeleteproduct = async (id) => {
  const confirmDelete = window.confirm('Haluatko varmasti poistaa Tuotteen?');
    if (confirmDelete) {
      try {
        await axios.delete(`/tuotteet/delete/${id}`);
        // Poista käyttäjä taulukosta
        setProducts(products.filter(user => products._id !== id));
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

 return(
  <>
  <KayttajaUL/>
  <div>
      <h1>Product List</h1>
      <table>
        <thead>
          <tr>
            <th>nimi</th>
            <th>kategoria</th>
            <th>Viimeisin hinta</th>
            <th>kayttaja</th>
            {/* Add more table headings as needed */}
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td>{product.nimi}</td>
              <td>{product.kategoria}</td>
              <td>{product.lahtohinta}</td>
              <td>{product.kayttajaid}</td>
              <button onClick={() => handleDeleteproduct(product._id)}>Poista Tuotteet</button>
              {/* Add more table data cells as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>

  
 )
}
export default Adminsivu
