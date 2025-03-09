import React, { useState } from 'react';
import Footer from '../components/Footer';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [helpStep, setHelpStep] = useState(0);
  const [promptData, setPromptData] = useState({ event: "", style: "", budget: "" });  
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsLoading(true); 
    try {
      const API_URL = `https://personalshopper.marcosdomain.com/search?query=${encodeURIComponent(searchQuery)}`;

      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'x-api-key': 'bc2ca672-8daf-46c4-a68f-676c73c541ba',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error al buscar productos');
      }

      const data = await response.json();
      setProducts(data); // Guardamos los productos en el estado
    } catch (error) {
      console.error('Error:', error);
      setProducts([]); // Vacía la lista en caso de error
    } finally {
        setIsLoading(false); 
    }
  };

  const openPopup = () => {
    setIsPopupOpen(true);
    setHelpStep(1);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setHelpStep(0);
  };

  const nextHelpStep = (value) => {
    const newData = { ...promptData };
    if (helpStep === 1) newData.event = value;
    if (helpStep === 2) newData.style = value;
    if (helpStep === 3) newData.budget = value;

    setPromptData(newData);
    if (helpStep === 3) {
      setSearchQuery(`Quiero ir a ${newData.event}, vestir ${newData.style}, y tengo un presupuesto de ${newData.budget} euros.`);
      closePopup();
    } else {
      setHelpStep(helpStep + 1);
    }
  };

  return (
    <>
      {/* HEADER */}
      <div className="banner_bg_main">
      <div className="logo_section">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="logo"><a href="index.html"><img src="images/logo.png" alt="Logo" /></a></div>
            </div>
          </div>
        </div>
      </div>

      <div className="header_section">
        <div className="container">
          <div className="containt_main">
            <div className="main">
              <div className="input-group chatgpt-container">
                <textarea
                  className="chatgpt-input"
                  placeholder="¿Qué tienes en mente?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                ></textarea>
                <div className="buttons-container">
                  <button className="chatgpt-send-button" onClick={handleSearch} disabled={isLoading}>
                  {isLoading ? "⏳" : "➤"}
                  </button>
                </div>
              </div>
              <div className="help-link-container">
                <a href="#" className="help-link" onClick={(e) => { e.preventDefault(); openPopup(); }}>
                  Dame una idea
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isLoading && (
        <div className="loading-message">
          🔍 Buscando productos... Por favor espera.
        </div>
      )}
      {/* Popup Modal */}
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button className="popup-close" onClick={closePopup}>✖</button>
            {helpStep === 1 && (
              <>
                <p>¿Para qué evento necesitas la ropa?</p>
                <button onClick={() => nextHelpStep("una boda")}>Una boda</button>
                <button onClick={() => nextHelpStep("una fiesta")}>Una fiesta</button>
                <button onClick={() => nextHelpStep("un evento formal")}>Evento formal</button>
              </>
            )}
            {helpStep === 2 && (
              <>
                <p>¿Qué estilo prefieres?</p>
                <button onClick={() => nextHelpStep("elegante")}>Elegante</button>
                <button onClick={() => nextHelpStep("casual")}>Casual</button>
                <button onClick={() => nextHelpStep("moderno")}>Moderno</button>
              </>
            )}
            {helpStep === 3 && (
              <>
                <p>¿Cuál es tu presupuesto?</p>
                <button onClick={() => nextHelpStep("100")}>100€</button>
                <button onClick={() => nextHelpStep("500")}>500€</button>
                <button onClick={() => nextHelpStep("1000")}>1000€</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>


      {products.length > 0 && (
        <div className="fashion_section content-container">
          <div className="container">
            <div className="row">
              {products.map((product, index) => (
                <div key={index} className="col-lg-4 col-sm-4 p-6">
                  <div className="box_main">
                    <h4 className="product_text">{product.name}</h4>
                    <p className="price_text">
                      Price <span style={{ color: "#262626" }}>${product.price}</span>
                    </p>
                    <div className="product_img">
                      <img src={`data:image/png;base64,${product.image}`} alt={product.name} />
                    </div>
                    <p className='product_desc'>{product.description}</p>
                    <p><strong>Sizes:</strong> {product.sizes.join(', ')}</p>
                    <div className="btn_main">
                      <div className="buy_bt">
                        <a href={product.url} target="_blank" rel="noopener noreferrer">Comprar</a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <Footer />
    </>
  );
};

export default Home;
