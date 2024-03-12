import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


function ProductPage() {
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);
  const [updatedProductData, setUpdatedProductData] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/tuotteet/${productId}`);
        setProductData(response.data); 
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductData();
  }, [productId]);
  const handleUpdateProductData = async () => {
    try {
      const response = await axios.put(`http://localhost:3001/tuotteet/${productId}`, updatedProductData);     
      console.log('Product data updated successfully:', response.data);
      window.location.reload();
    } catch (error) {
      console.error('Error updating product data:', error);
    }
  };
  if (!productData) {
    return <div>Loading...</div>;
  }
  return (
    <div>
    <h2>Tuotetiedot</h2>
    <p>Nimi: {productData.nimi}</p>
    <p>Lähtöhinta: {productData.lahtohinta}</p>
    <p>Hintavaraus: {productData.hintavaraus}</p>
    <p>Kuva: {productData.kuva}</p>

    <h3>Update Product Data</h3>
    <input
      type="text"
      placeholder="New Name"
      value={updatedProductData?.nimi || ''}
      onChange={(e) => setUpdatedProductData({ ...updatedProductData, nimi: e.target.value })}
    />
    <button onClick={handleUpdateProductData} >Update Product Data</button>
  </div>
  );
};

export default ProductPage;