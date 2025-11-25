import React from 'react';
import ProductCard from '../components/ProductCard/ProductCard.js';

const Home = ({ products, handleAddToCart, navigate }) => {
    // Mostramos los últimos 6 productos
    const featuredProducts = products.slice(0, 6); 

    return (
        <div className="container my-5">
            {/* Banner Hero Tech */}
            <div 
                className="text-center mb-5 p-5 rounded-4 shadow-lg position-relative overflow-hidden"
                style={{ 
                    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                    border: '1px solid #3b82f6'
                }}
            >
                <div className="position-relative z-1">
                    <h1 className="display-3 fw-bold text-white mb-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                        <span style={{ color: '#3b82f6' }}>ELECTROPLUS</span> TECH STORE
                    </h1>
                    <p className="lead text-secondary mb-4">
                        Equípate con la tecnología del mañana, hoy. Envíos a todo Chile.
                    </p>
                    <button 
                        className="btn btn-primary btn-lg px-5 rounded-pill shadow-lg fw-bold"
                        onClick={() => navigate('category', 'Laptops')}
                    >
                        VER CATÁLOGO
                    </button>
                </div>
            </div>

            <h2 className="mb-4 text-center text-white fw-bold" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                <span className="text-primary">///</span> DESTACADOS
            </h2>
            
            <div className="row">
                {featuredProducts.length > 0 ? (
                    featuredProducts.map(product => (
                        <ProductCard 
                            key={product.id} 
                            product={product} 
                            handleAddToCart={handleAddToCart}
                            navigate={navigate}
                        />
                    ))
                ) : (
                    <div className="text-center text-muted py-5">
                        <h4>Cargando productos o inventario vacío...</h4>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;