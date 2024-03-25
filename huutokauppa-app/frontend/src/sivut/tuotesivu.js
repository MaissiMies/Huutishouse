import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../Komponentit/kayttajacontext';

function ProductPage() {
  const { productId } = useParams();
  const { user } = useAuth();

  const [productData, setProductData] = useState(null);
  const [updatedProductData, setUpdatedProductData] = useState(null);
  const [HuutoData, setHuutoData] = useState([]);
  const [isEditable, setIsEditable] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false); // Track if the button is clicked

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/tuotteet/${productId}`);
        setProductData(response.data);
        setUpdatedProductData(response.data); // Initialize updatedProductData with existing data
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };
    
    fetchProductData();
  }, [productId]);

  const handlePrivilegeCheck = () => {
    setIsEditable(!isEditable);
    setButtonClicked(true); // Set buttonClicked to true when the button is clicked
    if (!isEditable) {
      // Reset updatedProductData to current productData when switching to "Päivitä" mode
      setUpdatedProductData(productData);
    }
  };

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
      <h2>Tuotetiedot</h2>
      <p>Nimi: {productData.nimi}</p>
      <p>Lähtöhinta: {productData.lahtohinta}</p>
      <p>Hintavaraus: {productData.hintavaraus}</p>
      <p>Kuva:</p>
      <p><img src={`http://localhost:3001/${productData.kuva}`} style={{ maxWidth: '400px', maxHeight: '400px' }} alt="Tuotekuva" /></p>

      <button onClick={handlePrivilegeCheck}>
        {isEditable ? "Peruuta" : "Päivitä tuotteen tietoja"}
      </button>
      
      {isEditable && buttonClicked && (
        <>
          <h3>Päivitä tuotteen tietoja</h3>
          <input
            type="text"
            placeholder="Uusi nimi"
            value={updatedProductData?.nimi || ''}
            onChange={(e) => setUpdatedProductData({ ...updatedProductData, nimi: e.target.value })}
          />
          <br />
          <input
            type="text"
            placeholder="Uusi lähtöhinta"
            value={updatedProductData?.lahtohinta || ''}
            onChange={(e) => setUpdatedProductData({ ...updatedProductData, lahtohinta: e.target.value })}
          />
          <br />
          <input
            type="text"
            placeholder="Uusi hintavaraus"
            value={updatedProductData?.hintavaraus || ''}
            onChange={(e) => setUpdatedProductData({ ...updatedProductData, hintavaraus: e.target.value })}
          />
          <br />
          <button onClick={handleUpdateProductData}>Päivitä</button>
        </>
      )}

      <div>
        <input
          type="text"
          placeholder="Huuto hinta"
          value={HuutoData?.huuto || ''}
          onChange={(e) => setHuutoData({ ...HuutoData, huuto: e.target.value })}
        />
        <button onClick={handleHuutoUpdate}>Huuda</button>
      </div>
    </div>
  );
}

export default ProductPage;
