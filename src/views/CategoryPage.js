import React from 'react';
import ProductCard from '../components/ProductCard/ProductCard.js';

// --- CategoryPage View ---
const CategoryPage = ({ products, category, handleAddToCart, navigate }) => {
    const filteredProducts = products.filter(p => p.category === category);

    return (
        <div className="container my-5">
            <h1 className="mb-4 text-center text-secondary">Categoría: {category}</h1>
            <button className="btn btn-outline-secondary mb-4" onClick={() => navigate('home')}>
                <i className="fas fa-arrow-left me-2"></i> Volver a Home
            </button>
            <div className="row">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                        <ProductCard 
                            key={product.id} 
                            product={product} 
                            handleAddToCart={handleAddToCart}
                            navigate={navigate}
                        />
                    ))
                ) : (
                    <div className="col-12 text-center">
                        <p className="lead">No hay productos disponibles en esta categoría.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryPage;
