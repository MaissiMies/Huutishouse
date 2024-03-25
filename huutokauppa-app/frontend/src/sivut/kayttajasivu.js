import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../Komponentit/kayttajacontext';
import '../App.css';

function UserPage() {
  const { _id } = useParams();
  const { user } = useAuth();
  const [nimi, setNimi] = useState('');
  const [lahtohinta, setLahtohinta] = useState('');
  const [hintavaraus, setHintavaraus] = useState('');
  const [kuva, setKuva] = useState('');
  const [aika, setAika] = useState('');
  const [products, setProducts] = useState([]);
  const [kategoriat, setKategoriat] = useState([]);
  const [selectedKategoria, setSelectedKategoria] = useState('');
  const [access, setaccess] = useState(false);

  const [userData, setUserData] = useState(null);
  const [updatedUserData, setUpdatedUserData] = useState(null);
  const [isEditable, setIsEditable] = useState(false);

  
  const axiosPostData = async () => {
    const formData = new FormData();
    formData.append('kayttajaid', _id);
    formData.append('nimi', nimi);
    formData.append('kategoria', selectedKategoria);
    formData.append('lahtohinta', lahtohinta);
    formData.append('hintavaraus', hintavaraus);
    formData.append('kuva', kuva);
    formData.append('endingTime', new Date(aika).toISOString());
    try {
      const response = await axios.post('http://localhost:3001/myynti', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);
      fetchData(); // Haetaan päivitetyt tiedot palvelimelta
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user.objectId === _id || user.objectId === "temp") {
      setaccess(true);
      console.log(user.objectId,"1  2",_id)
    } else {
      setaccess(false);
    }
  }, [user.objectId, _id]); //
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/tuotteet');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/kategoriat');
        setKategoriat(response.data);
        console.log(kategoriat,"tämä")
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const handleSelectChange = (event) => {
    setSelectedKategoria(event.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosPostData();
  };

  const Product = ({ _id, nimi, lahtohinta, imageUrl, hintavaraus, endingTime }) => {
    const [timeLeft, setTimeLeft] = useState({});

    useEffect(() => {
      const calculateTimeLeft = () => {
        const difference = new Date(endingTime) - new Date();
        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((difference / 1000 / 60) % 60);
          const seconds = Math.floor((difference / 1000) % 60);
          return { days, hours, minutes, seconds };
        } else {
          return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
      };

      const timer = setTimeout(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);

      return () => clearTimeout(timer);
    }, [endingTime]);

    return (
      <div className="product">
        <h3>{nimi}</h3>
        
        <p>Lähtöhinta: {lahtohinta}€</p>
        <p>Hintavaraus: {hintavaraus}€</p>
        <p>Aika jäljellä: {timeLeft.days} päivää, {timeLeft.hours} tuntia, {timeLeft.minutes} minuuttia, {timeLeft.seconds} sekuntia</p>
        <img src={imageUrl} style={{ maxWidth: '100px', maxHeight: '100px' }} alt="Product" className="product-image" />
      </div>
    );
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/users/${_id}`);
        setUserData(response.data);
        setUpdatedUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [_id]);

  const handlePrivilegeCheck = () => {
    setIsEditable(!isEditable);
    if (!isEditable) {
      setUpdatedUserData(userData);
    }
  };

  const handleUpdateUserData = async () => {
    try {
      const response = await axios.put(`http://localhost:3001/users/${_id}`, updatedUserData);     
      console.log('User data updated successfully:', response.data);
      window.location.reload();
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }
 

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Käyttäjän tiedot</h2>
      <p>Nimi: {userData.nimi}</p>
      <p>Puhelinnumero: {userData.puhnum}</p>
      <p>Sähköposti: {userData.sposti}</p>
      <p>Käyttäjänimi: {userData.kayttajatunnus}</p>
      
       {access ? (
        <>
        <button onClick={handlePrivilegeCheck} style={styles.button}>
        {isEditable ? "Takaisin" : "Päivitä"}
      </button>
      
      {isEditable && (
        <>
          <h3 style={styles.subtitle}>Päivitä Käyttäjän tietoja</h3>
          <label htmlFor="newName" style={styles.label}>Nimi:</label>
          <input
            id="newName"
            type="text"
            placeholder="Uusi nimi"
            value={updatedUserData?.nimi || ''}
            onChange={(e) => setUpdatedUserData({ ...updatedUserData, nimi: e.target.value })}
            style={styles.input}
          />
          <br />
          <label htmlFor="newPhoneNumber" style={styles.label}>Puhelinnumero:</label>
          <input
            id="newPhoneNumber"
            type="text"
            placeholder="Uusi puhnum"
            value={updatedUserData?.puhnum || ''}
            onChange={(e) => setUpdatedUserData({ ...updatedUserData, puhnum: e.target.value })}
            style={styles.input}
          />
          <br />
          <label htmlFor="newEmail" style={styles.label}>Sähköposti:</label>
          <input
            id="newEmail"
            type="text"
            placeholder="Uusi sposti"
            value={updatedUserData?.sposti || ''}
            onChange={(e) => setUpdatedUserData({ ...updatedUserData, sposti: e.target.value })}
            style={styles.input}
          />
          <br />
          <label htmlFor="newUsername" style={styles.label}>Käyttäjätunnus:</label>
          <input
            id="newUsername"
            type="text"
            placeholder="Uusi käyttäjätunnus"
            value={updatedUserData?.kayttajatunnus || ''}
            onChange={(e) => setUpdatedUserData({ ...updatedUserData, kayttajatunnus: e.target.value })}
            style={styles.input}
          />
          <br />
          <button onClick={handleUpdateUserData} style={styles.button}>Päivitä</button>
        </>
      )}
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
              Aika:
              <input
                type="datetime-local"
                id="aika"
                name="aika"
                value={aika}
                onChange={(e) => setAika(e.target.value)}
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
            <label htmlFor="kategoria">Choose a category:
              <select id="kategoria" value={selectedKategoria} onChange={handleSelectChange}>
                <option value="">Select...</option>
                {kategoriat.map((kategoria) => (
                  <option key={kategoria._id} value={kategoria.selite}>
                    {kategoria.selite}
                  </option>
                ))}
              </select>
            </label>
            <button type="submit">Submit</button>
          </form>
        </>
      ) : (
        <h1>User objectId is not available.</h1>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    marginBottom: '20px',
    fontSize: '24px',
  },
  subtitle: {
    marginTop: '20px',
    marginBottom: '10px',
    fontSize: '20px',
  },
  label: {
    marginRight: '10px',
    fontSize: '16px',
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
    marginTop: '20px',
  },
};

export default UserPage;
