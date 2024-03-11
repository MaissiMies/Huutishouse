import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


function ProductPage() {
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);
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

 
  console.log(productData);

  return (
    <div>
      {productData ? (
        <div>
          <h2>Product Details</h2>
          <p>ID: {productData.productId}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductPage;
