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

 return(
  <KayttajaUL/>
 )
}
export default Adminsivu
