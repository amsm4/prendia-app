import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Footer = () => {
  return (
    <footer>
      <div>Prendia puede cometer errores. Revisa la información importante.</div>
      <div className="help-icon" onclick="togglePopup()">?</div>
      <div className="popup" id="popup">
        <p>Este es un mensaje de ayuda.</p>
      </div>
    </footer>
  );
};

export default Footer;