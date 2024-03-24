import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../Komponentit/kayttajacontext';



function ProductPage() {
  const { user, login, logout } = useAuth();
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);
  const [updatedProductData, setUpdatedProductData] = useState(null);
  const [HuutoData, setHuutoData] = useState([]);
  const [iseditable, setiseditable] = useState(false);
 

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/tuotteet/${productId}`);
        setProductData(response.data); 
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };
    
    fetchProductData();
  }, [productId]);
  const handlePrivilegeCheck = () =>{
    if (iseditable) {
      setiseditable (false)
    }
    else {
      setiseditable (true)
    }
  }
  const handleUpdateProductData = async () => {
    try {
      const response = await axios.put(`http://localhost:3001/tuotteet/${productId}`, updatedProductData);     
      console.log('Product data updated successfully:', response.data);
      window.location.reload();
    } catch (error) {
      console.error('Error updating product data:', error);
    }
    
  };
  const handleHuutoUpdate = async () =>{
    setHuutoData({...HuutoData, kayttajaid : user.objectId});
    console.log("user", user);
    console.log("Huutodata", HuutoData);
    setHuutoData({...HuutoData, kayttajaid : user.objectId});
    try{
      const response = await axios.post(`http://localhost:3001/tuotteet/${productId}/huudot`, HuutoData)
      console.log('Product data updated successfully:', response.data);

    }catch(error){
      console.error('Error updating product data:', error);
    }
  }
  if (!productData) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {iseditable ? (
        <>
        <button onClick={handlePrivilegeCheck}>Päivitä</button>
    <h2>Tuotetiedot</h2>
    <p>Nimi: {productData.nimi}</p>
    <p>Lähtöhinta: {productData.lahtohinta}</p>
    <p>Hintavaraus: {productData.hintavaraus}</p>
    <p>Kuva:</p>
    <p> <img src={`http://localhost:3001/${productData.kuva}`}style={{ maxWidth: '400px', maxHeight: '400px' }} alt="Tuotekuva" /></p>
    </>
    ) : (
      <>
      <button onClick={handlePrivilegeCheck}>Päivitä</button>
    <h3>Päivitä tuotteen tietoja</h3>
    <input
      type="text"
      placeholder="Uusi nimi"
      value={updatedProductData?.nimi || ''}
      onChange={(e) => setUpdatedProductData({ ...updatedProductData, nimi: e.target.value })}
    />
    <br/>
    <input
      type="text"
      placeholder="Uusi lahtohinta"
      value={updatedProductData?.lahtohinta || ''}
      onChange={(e) => setUpdatedProductData({ ...updatedProductData, lahtohinta: e.target.value })}
    />
    <br/>
    <input
      type="text"
      placeholder="Uusi hintavaraus"
      value={updatedProductData?.hintavaraus || ''}
      onChange={(e) => setUpdatedProductData({ ...updatedProductData, hintavaraus: e.target.value })}
    />
    <br/>
    <button onClick={handleUpdateProductData} >Päivitä</button>
    </>
    )}
    <div>
    <input
      type="text"
      placeholder="huuto hinta"
      value={HuutoData?.huuto || ''}
      onChange={(e) => setHuutoData({ ...HuutoData, huuto: e.target.value, kayttajaid : user.objectId })}
    />
    <button onClick={handleHuutoUpdate} >Huuda</button>
    </div>
  </div>
  );
};

export default ProductPage;