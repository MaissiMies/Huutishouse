
import React from 'react';
import LahetaViesti from './LahetaViesti';
import SaapuneetViestit from './SaapuneetViestit';
import './Viestit.css';

const Viestit = ({ myyjanNimi, tuotteenNimi }) => {
  return (
    <div className="viestit">
      <LahetaViesti myyjanNimi={myyjanNimi} tuotteenNimi={tuotteenNimi} />
      
      <br />
      
      <SaapuneetViestit />
    </div>
  );
};

export default Viestit;
