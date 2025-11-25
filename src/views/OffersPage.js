import React from 'react';
import ProductCard from '../components/ProductCard/ProductCard.js';

const OffersPage = ({ products, handleAddToCart, navigate }) => {
    // Lógica temporal: Mostrar productos con stock bajo (< 10) como "Ofertas / Liquidación"
    const offerProducts = products.filter(p => p.stock < 10);

    return (
        <div className="container my-5">
            <h2 className="mb-4 text-center text-warning fw-bold" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                <i className="fas fa-bolt me-2"></i> ÚLTIMAS UNIDADES
            </h2>
            <p className="text-center text-secondary mb-5">¡Aprovecha antes de que se agoten!</p>
            
            <div className="row">
                {offerProducts.length > 0 ? (
                    offerProducts.map(product => (
                        <ProductCard 
                            key={product.id} 
                            product={product} 
                            handleAddToCart={handleAddToCart}
                            navigate={navigate}
                        />
                    ))
                ) : (
                    <div className="text-center text-muted py-5">
                        <h4>Por el momento no hay liquidaciones activas.</h4>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OffersPage;