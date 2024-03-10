import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductPage = () => {
  const { productId } = useParams();
  const [productData, setproductData] = useState(null);

  useEffect(() => {
    // Fetch product data based on productId
    fetchproductData(productId);
  }, [productId]);

  const fetchproductData = async (productId) => {
    try {
      const response = await fetch(/*`Tähän mikä sinne fetchi nyt tulee`*/);
      const data = await response.json();
      setproductData(data);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  return (
    <div>
      {productData ? (
        <div>
          <h2>product Details</h2>
          <p>Name: {productData.name}</p>
          <p>Email: {productData.email}</p>
          {/* Render other product data */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductPage;