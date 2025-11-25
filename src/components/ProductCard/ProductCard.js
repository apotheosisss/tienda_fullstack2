import React from 'react';
import formatPrice from '../../utils/formatPrice.js';

const ProductCard = ({ product, handleAddToCart, navigate }) => {
    // Mapeo de propiedades (Backend -> Frontend)
    const { id, nombre, precio, imageUrl, descripcion, categoria } = product;

    return (
        <div className="col-md-4 mb-4">
            <div className="card h-100 text-white border-0 shadow-lg" style={{ background: '#1e293b' }}>
                {/* Imagen con ajuste de tamaño */}
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
                    <div className="d-flex justify-content-between align-items-start mb-2">
                        <span className="badge bg-primary bg-gradient">{categoria || 'Tecnología'}</span>
                    </div>
                    
                    <h5 className="card-title fw-bold text-info">{nombre || 'Producto Sin Nombre'}</h5>
                    <p className="card-text text-secondary flex-grow-1">
                        {descripcion 
                            ? (descripcion.length > 80 ? descripcion.substring(0, 80) + '...' : descripcion)
                            : 'Sin descripción disponible.'}
                    </p>
                    
                    <div className="mt-auto pt-3 border-top border-secondary">
                        <div className="d-flex justify-content-between align-items-center">
                            <span className="h4 mb-0 text-white fw-bold">{formatPrice(precio || 0)}</span>
                            <button 
                                className="btn btn-outline-info btn-sm"
                                onClick={() => handleAddToCart(product)}
                            >
                                <i className="fas fa-cart-plus me-2"></i>Agregar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;