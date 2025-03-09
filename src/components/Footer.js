import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Footer = () => {
  return (
    <footer id="footer" className="footer dark-background">
        <div className="container">
          <div className="row gy-3">
            <div className="col-lg-3 col-md-6 d-flex">
              <i className="bi bi-telephone icon"></i>
              <div>
                <h4>Contacto</h4>
                <p>
                  <strong>Email:</strong> <span>info@prendia.ai</span><br />
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 d-flex">
              <i className="bi bi-clipboard-check icon"></i>
              <div>
                <h4>Políticas de Privacidad</h4>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 d-flex">
              <i className="bi bi-card-checklist icon"></i>
              <div>
                <h4>Aviso Legal</h4>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <h4>Follow Us</h4>
              <div className="social-links d-flex">
                <a href="https://www.facebook.com/profile.php?id=61573738495747" target="_blank" className="facebook"><FontAwesomeIcon icon="fa-brands fa-facebook-f" /></a>
                <a href="https://www.instagram.com/prendiafashion/" target="_blank" className="instagram"><FontAwesomeIcon icon="fa-brands fa-instagram"></FontAwesomeIcon></a>
              </div>
            </div>

          </div>
        </div>

        <div className="container copyright text-center mt-4">
          <p>© <span>Copyright</span> <strong className="px-1 sitename">Prendia</strong> <span>Todos los derechos reservados</span></p>
        </div>

      </footer>
  );
};

export default Footer;