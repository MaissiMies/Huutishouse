   
      import React, { useState, useEffect } from 'react';
      import { useParams,Link } from 'react-router-dom';
      import axios from 'axios';
      import { useAuth } from '../Komponentit/kayttajacontext';
      import HuudotList from '../Komponentit/HuutoUL';
      
      const ProductPage = () => {
        const { productId } = useParams();
        const { user, login } = useAuth();
        const [ghettoid] = useState(productId);
      
        const [productData, setProductData] = useState([]);
        const [updatedProductData, setUpdatedProductData] = useState([]);
        const [HuutoData, setHuutoData] = useState({ huuto: '' });
        const [isEditable, setIsEditable] = useState(false);
        const [buttonClicked, setButtonClicked] = useState(false);
        const [remainingTime, setRemainingTime] = useState('');
        const [huutoError, setHuutoError] = useState('');
        const [userData, setUserData] = useState("");
        const [access, setaccess] = useState(false);

    
        useEffect(() => {
          const fetchProductData = async () => {
            
            setHuutoData({ ...HuutoData, kayttajaid: user.objectId });
            
            try {
              const response = await axios.get(`http://localhost:3001/tuotteet/${productId}`);
              setProductData(response.data);
              console.log(response.data)
              setUpdatedProductData(response.data);
              const uresponse = await axios.get(`http://localhost:3001/users/${response.data.kayttajaid}`);
              setUserData(uresponse.data);
              
              if (user.objectId === "66029af4b6e195fa450ce67c" || user.objectId === response.data.kayttajaid) {
                setaccess(true);
                console.log(user.objectId,"1  2")
              } else {
                setaccess(false);
              }
      
              const difference = new Date(response.data.endingTime) - new Date();
              if (difference > 0) {
                const seconds = Math.floor((difference / 1000) % 60);
                const minutes = Math.floor((difference / (1000 * 60)) % 60);
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      
                setRemainingTime(`${days} päiviä, ${hours} tuntia, ${minutes} minuuttia, ${seconds} sekunttia`);
              } else {
                setRemainingTime('Huutaminen päättynyt');
                setIsEditable(false);
              }
            } catch (error) {
              console.error('Error fetching product data:', error);
            }
          };
      
          fetchProductData();
        }, [productId]);

        

        
      
        const handlePrivilegeCheck = () => {
          setIsEditable(!isEditable);
          setButtonClicked(true);
          if (!isEditable) {
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
      
        const handleHuutoUpdate = async () => {
          if (!HuutoData.huuto || isNaN(Number(HuutoData.huuto)) || Number(HuutoData.huuto) <= 0) {
            setHuutoData({ ...HuutoData, huuto: '' });
            setHuutoError('Tarkista huutotarjous!');
            handleUpdate()
            return;
          } else {
            setHuutoError('');
          }
      
          try {
            const response = await axios.post(`http://localhost:3001/tuotteet/${productId}/huudot`, HuutoData);
            console.log('Product data updated successfully:', response.data);
            window.location.reload();
          } catch (error) {
            console.error('Error updating product data:', error);
          }
        };
      
        if (!productData) {
          return <div>Loading...</div>;
        }
       
       
          const handleUpdate = async () => {
            const huudot = productData.huudot;

            // Filter out invalid huudot entries
            const validHuudot = huudot.filter(huuto => huuto.huuto !== undefined);
          
            // Sort the validHuudot array based on the huuto value
            validHuudot.sort((a, b) => parseInt(b.huuto) - parseInt(a.huuto));
           
            try {
              await axios.post(`/tuote-updatesingle/${productId}`, { fieldToUpdate: 'lahtohinta', newValue: validHuudot[0].huuto });
              console.log('Field updated successfully');
            } catch (error) {
              console.error('Error updating field:', error);
            }
          };
          
       
  

        
      
        return (
          <div style={styles.container}>
            
            <h2 style={styles.heading}>Tuotetiedot</h2>
            <p style={styles.text}><Link to={`/users/${userData._id}`}>Myyjä: {userData.nimi}</Link></p>
            <p style={styles.text}>Nimi: {productData.nimi}</p>
            <p style={styles.text}>Viimesin hinta: {productData.lahtohinta}</p>
            <p style={styles.text}>Hintavaraus: {productData.hintavaraus}</p>
            <p style={styles.text}>Kuva:</p>
            <p><img src={`http://localhost:3001/${productData.kuva}`} style={styles.image} alt="Tuotekuva" /></p>
      
            <p style={styles.text}>Jäljellä oleva huutoaika: {remainingTime}</p>
            {access ? (
        <p> <button onClick={handlePrivilegeCheck} style={styles.button}>
              
        {isEditable ? "Peruuta" : "Päivitä tuotteen tietoja"}
      </button></p>
      ) : (
        <p></p>
      )}

           
      
            {isEditable && buttonClicked && (
              <>
                <h3 style={styles.subheading}>Päivitä tuotteen tietoja</h3>
                <input
                  type="text"
                  placeholder="Uusi nimi"
                  value={updatedProductData?.nimi || ''}
                  onChange={(e) => setUpdatedProductData({ ...updatedProductData, nimi: e.target.value })}
                  style={styles.input}
                />
                <br />
                <input
                  type="text"
                  placeholder="Uusi lähtöhinta"
                  value={updatedProductData?.lahtohinta || ''}
                  onChange={(e) => setUpdatedProductData({ ...updatedProductData, lahtohinta: e.target.value })}
                  style={styles.input}
                />
                <br />
                <input
                  type="text"
                  placeholder="Uusi hintavaraus"
                  value={updatedProductData?.hintavaraus || ''}
                  onChange={(e) => setUpdatedProductData({ ...updatedProductData, hintavaraus: e.target.value })}
                  style={styles.input}
                />
                <br />
                
                <button onClick={handleUpdateProductData} style={styles.button}>Päivitä</button>
              </>
            )}
      
            {remainingTime !== 'Huutaminen päättynyt' && (
              <>
                <div>
                  <input
                    type="text"
                    placeholder={huutoError || "Huuto hinta"}
                    value={HuutoData?.huuto || ''}
                    onChange={(e) => setHuutoData({ ...HuutoData, huuto: e.target.value })}
                    style={styles.input}
                  />
                </div>
                <div>
                  <button onClick={handleHuutoUpdate} style={styles.button}>Huuda</button>
                </div>
              </>
            )}
      
            <HuudotList productId={ghettoid} />
          </div>
        );
      };


const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  subheading: {
    fontSize: '20px',
    marginBottom: '10px',
  },
  text: {
    fontSize: '20px',
    marginBottom: '10px',
  },
  input: {
    width: '300px',
    height: '40px',
    marginBottom: '10px',
    padding: '5px',
    fontSize: '16px',
  },
  button: {
    width: '200px',
    height: '40px',
    backgroundColor: 'blue',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    marginBottom: '10px',
  },
  image: {
    maxWidth: '400px',
    maxHeight: '400px',
  },
};

export default ProductPage;
