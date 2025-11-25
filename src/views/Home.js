import React from 'react';
import ProductCard from '../components/ProductCard/ProductCard.js';

const Home = ({ products, handleAddToCart, navigate }) => {
    // Mostrar últimos 6 productos
    const featuredProducts = products.slice(-6).reverse();

    return (
        <div className="container my-5">
            {/* Hero Banner */}
            <div className="text-center mb-5 p-5 rounded-4 border border-info shadow-lg position-relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(0, 243, 255, 0.1) 100%)' }}>
                <div className="position-relative z-1">
                    <h1 className="display-3 fw-bold text-white mb-3 cyber-font">
                        <span className="text-info">ELECTROPLUS</span> TECH STORE
                    </h1>
                    <p className="lead text-white mb-4">
                        El futuro de la tecnología en tus manos.
                    </p>
                    <button className="btn btn-outline-info btn-lg px-5 rounded-pill fw-bold shadow" onClick={() => navigate('category', 'Laptops')}>
                        VER CATÁLOGO
                    </button>
                </div>
            </div>

            <h2 className="mb-4 text-center text-white cyber-font">
                <span className="text-info">///</span> DESTACADOS
            </h2>
            
            <div className="row">
                {featuredProducts.length > 0 ? (
                    featuredProducts.map(product => (
                        <ProductCard key={product.id} product={product} handleAddToCart={handleAddToCart} navigate={navigate} />
                    ))
                ) : (
                    <div className="text-center text-secondary py-5">
                        <h4>Cargando productos...</h4>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;