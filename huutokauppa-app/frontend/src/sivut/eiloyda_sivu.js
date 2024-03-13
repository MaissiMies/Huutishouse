import React from "react";
import { Link } from "react-router-dom";

// CSS-tyylit
const styles = {
  errorTemplate: {
    padding: "40px 15px",
    textAlign: "center",
    width: "50%", // Kiinteä leveys
    margin: "auto", // Keskitetään sivulla
  },
  errorActions: {
    marginTop: "15px",
    marginBottom: "15px",
  },
  btn: {
    marginRight: "10px",
  },
};

const NotFoundPage = () => {
  return (
    <div style={styles.errorTemplate}>
      <h1>Oopsie Daisy!</h1>
      <h2>404 Ei löydetty, kuinka noloa!</h2>
      <div className="error-details">
        Hupsista keikkaa! Näyttää siltä, että jokin meni mönkään. Tätä sivua ei ole olemassa!
        <br />
        Ehkä joku piilotti sen pöydän alle. Onneksi voimme auttaa sinua takaisin oikeille poluille!
      </div>
      <div style={styles.errorActions}>
        <Link to="/" className="btn btn-outline-primary btn-lg">
          &#127968; Takaisin turvaan
        </Link>
      </div>
      <div style={styles.errorActions}>
        <Link to="/otayhteytta" className="btn btn-outline-secondary btn-lg">
          &#9993; Ota yhteyttä
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
