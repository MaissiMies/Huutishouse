// Myynti.js

import React, { useState } from 'react';

const Myynti = () => {
  const [formData, setFormData] = useState({
    nimi: '',
    lahtohinta: '',
    hintavaraus: '',
    kuva: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      kuva: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to send files along with the POST request
    const formDataToSend = new FormData();
    formDataToSend.append('nimi', formData.nimi);
    formDataToSend.append('lahtohinta', formData.lahtohinta);
    formDataToSend.append('hintavaraus', formData.hintavaraus);
    formDataToSend.append('kuva', formData.kuva);

    try {
      const response = await fetch('http://your-backend-api.com/your-backend-route', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        console.log('Form data submitted successfully!');
      } else {
        console.error('Error submitting form data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nimi:
        <input
          type="text"
          name="nimi"
          value={formData.nimi}
          onChange={handleChange}
        />
      </label>

      <label>
        Lähtöhinta:
        <input
          type="number"
          name="lahtohinta"
          value={formData.lahtohinta}
          onChange={handleChange}
        />
      </label>

      <label>
        Hintavaraus:
        <input
          type="number"
          name="hintavaraus"
          value={formData.hintavaraus}
          onChange={handleChange}
        />
      </label>

      <label>
        Kuva:
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
};

export default Myynti;
