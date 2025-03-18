import React, { useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [helpStep, setHelpStep] = useState(0);
  const [promptData, setPromptData] = useState({ event: "", style: "", budget: "" });  
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [animateUp, setAnimateUp] = useState(false);

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
      setProducts(data);
      setTimeout(() => {
        setAnimateUp(true);
      }, 1000);

      
    } catch (error) {
      console.error('Error:', error);
      setProducts([]); 
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
      <Header />
      <main className="main-container">
        <div className={`input-container ${animateUp ? 'move-up' : ''}`}>
          <button className="btn-ideas" onClick={() => setIsPopupOpen(!isPopupOpen)}>
            <img src="https://img.icons8.com/ios-filled/50/000000/idea.png" alt="Idea Icon" />
            Dame ideas
          </button>
          <textarea type="text" placeholder="Qué tienes en mente?" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <button className="btn-enviar" onClick={handleSearch} disabled={isLoading}>
            {isLoading ? "⏳" : "Enviar"}
          </button>
          {isPopupOpen && (
          <div className="idea-popup-overlay">
            <div className="idea-popup-close" onClick={() => setIsPopupOpen(false)}>✖</div>
            <div className="idea-popup-option" onClick={() => { 
              setSearchQuery("Remeras blancas"); 
              setIsPopupOpen(false); 
            }}>
              Remeras blancas
            </div>
            <div className="idea-popup-option" onClick={() => { 
              setSearchQuery("Pantalones grises de boda"); 
              setIsPopupOpen(false); 
            }}>
              Pantalones grises de boda
            </div>
            <div className="idea-popup-option" onClick={() => { 
              setSearchQuery("Camisas formales azules"); 
              setIsPopupOpen(false); 
            }}>
              Camisas formales azules
            </div>
            <div className="idea-popup-option" onClick={() => { 
              setSearchQuery("Zapatos elegantes negros"); 
              setIsPopupOpen(false); 
            }}>
              Zapatos elegantes negros
            </div>
          </div>
        )}
        </div>
        {isLoading && (
          <div className="loading-message">
            🔍 Buscando productos... Por favor espera.
          </div>
        )}
        {products.length > 0 && (
          <div className="products-container">
            {products.map((product, index) => (
              <div key={index} className="product-card">
                <h6>{product.name}</h6>
                <p><strong>Precio:</strong> €{product.price}</p>
                <div className='card-image'>
                  <a href={product.url} target="_blank" rel="noopener noreferrer">
                    <img src={`data:image/png;base64,${product.image}`} alt={product.name} />
                  </a>
                </div>
                <p className='description'>{product.description}</p>
                <p><strong>Talles:</strong> {product.sizes.join(', ')}</p>
              </div>
            ))}
          </div>
        )}

        
      </main>



      {/* FOOTER */}
      <Footer />
    </>
  );
};

export default Home;
