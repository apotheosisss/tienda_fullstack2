import React from 'react';
import ProductCard from '../components/ProductCard/ProductCard.js';
import { hasDiscount } from '../utils/priceHelper.js';

const OffersPage = ({ products, handleAddToCart, navigate }) => {
    const offerProducts = products.filter(p => hasDiscount(p));

    return (
        <div className="container my-5">
            <h2 className="mb-4 text-center text-warning cyber-font">
                <i className="fas fa-tags me-2"></i> OFERTAS ESPECIALES
            </h2>
            
            {offerProducts.length > 0 ? (
                <div className="row">
                    {offerProducts.map(product => (
                        <ProductCard 
                            key={product.id} 
                            product={product} 
                            handleAddToCart={handleAddToCart} 
                            navigate={navigate} 
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center text-secondary py-5">
                    <i className="fas fa-frown fa-3x mb-3"></i>
                    <h4>No hay ofertas disponibles por el momento.</h4>
                </div>
            )}
        </div>
    );
};

export default OffersPage;