import React from 'react';
import ProductCard from '../components/ProductCard/ProductCard.js';

const CategoryPage = ({ products, category, handleAddToCart, navigate }) => {
    const filteredProducts = products.filter(p => 
        (p.categoria || '').toLowerCase() === (category || '').toLowerCase() ||
        (p.category || '').toLowerCase() === (category || '').toLowerCase()
    );

    return (
        <div className="container my-5">
            <div className="d-flex align-items-center mb-4 border-bottom border-info pb-3">
                <button className="btn btn-outline-info me-3 rounded-circle" onClick={() => navigate('home')} style={{ width: '40px', height: '40px' }}>
                    <i className="fas fa-arrow-left"></i>
                </button>
                <h2 className="text-white mb-0 cyber-font">
                    CATEGORÍA: <span className="text-neon-blue">{category?.toUpperCase()}</span>
                </h2>
            </div>

            {filteredProducts.length > 0 ? (
                <div className="row">
                    {filteredProducts.map(product => (
                        <ProductCard 
                            key={product.id} 
                            product={product} 
                            handleAddToCart={handleAddToCart}
                            navigate={navigate}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-5">
                    <div className="mb-3">
                        <i className="fas fa-search fa-3x text-secondary"></i>
                    </div>
                    <h4 className="text-muted">No hay productos en esta categoría.</h4>
                    <button className="btn btn-primary mt-3" onClick={() => navigate('home')}>Volver al Inicio</button>
                </div>
            )}
        </div>
    );
};

export default CategoryPage;