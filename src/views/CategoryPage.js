import React from 'react';
import ProductCard from '../components/ProductCard/ProductCard.js';

const CategoryPage = ({ products, category, handleAddToCart, navigate }) => {
    // CORRECCIÓN: Filtramos por 'categoria' (español)
    const filteredProducts = products.filter(p => 
        p.categoria === category || p.category === category // Soporte dual por seguridad
    );

    return (
        <div className="container my-5">
            <div className="d-flex align-items-center mb-4">
                <button className="btn btn-outline-secondary me-3" onClick={() => navigate('home')}>
                    <i className="fas fa-arrow-left"></i>
                </button>
                <h2 className="text-white mb-0 fw-bold" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    CATEGORÍA: <span className="text-primary">{category.toUpperCase()}</span>
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
                <div className="alert alert-info text-center" style={{ background: '#1e293b', color: '#fff', border: 'none' }}>
                    <i className="fas fa-search me-2"></i> No se encontraron productos en esta categoría.
                </div>
            )}
        </div>
    );
};

export default CategoryPage;