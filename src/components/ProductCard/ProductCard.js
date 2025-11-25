import React from 'react';
import formatPrice from '../../utils/formatPrice.js';
import { calculateDiscountedPrice, hasDiscount } from '../../utils/priceHelper.js';

const ProductCard = ({ product, handleAddToCart }) => {
    const { nombre, precio, imageUrl, categoria, descuento, descripcion } = product;
    const isOffer = hasDiscount(product);
    const finalPrice = calculateDiscountedPrice(precio, descuento);

    return (
        <div className="col-md-4 mb-4">
            <div className="card h-100 text-white border-0 shadow-lg position-relative" style={{ background: '#1e293b' }}>
                
                {/* BADGE DE OFERTA */}
                {isOffer && (
                    <div className="position-absolute top-0 end-0 bg-danger text-white px-3 py-1 fw-bold shadow" 
                         style={{ borderRadius: '0 4px 0 10px', zIndex: 10 }}>
                        -{descuento}% OFF
                    </div>
                )}

                <div style={{ height: '250px', overflow: 'hidden', borderBottom: '1px solid #334155' }}>
                    <img 
                        src={imageUrl || 'https://via.placeholder.com/400x300?text=No+Image'} 
                        className="card-img-top h-100 w-100" 
                        alt={nombre} 
                        style={{ objectFit: 'cover', transition: 'transform 0.3s' }}
                        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
                        onMouseOut={e => e.currentTarget.style.transform = 'scale(1.0)'}
                    />
                </div>
                
                <div className="card-body d-flex flex-column">
                    <div className="mb-2">
                        <span className="badge bg-dark border border-info text-info me-2">{categoria}</span>
                    </div>
                    
                    <h5 className="card-title fw-bold text-white">{nombre}</h5>
                    <p className="card-text text-secondary small flex-grow-1">
                        {descripcion ? (descripcion.length > 60 ? descripcion.substring(0, 60) + '...' : descripcion) : ''}
                    </p>
                    
                    <div className="mt-auto pt-3 border-top border-secondary d-flex justify-content-between align-items-center">
                        <div>
                            {isOffer ? (
                                <>
                                    <small className="text-secondary text-decoration-line-through d-block" style={{ fontSize: '0.8rem' }}>
                                        {formatPrice(precio)}
                                    </small>
                                    <span className="h4 mb-0 text-warning fw-bold cyber-font">{formatPrice(finalPrice)}</span>
                                </>
                            ) : (
                                <span className="h4 mb-0 text-info fw-bold cyber-font">{formatPrice(precio)}</span>
                            )}
                        </div>
                        <button className="btn btn-outline-info btn-sm" onClick={() => handleAddToCart(product)}>
                            <i className="fas fa-cart-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;