import React from 'react';
import formatPrice from '../../utils/formatPrice.js';

const ProductCard = ({ product, handleAddToCart, navigate }) => {
  
  // --- ¡NUEVA LÓGICA DE DESCUENTO! ---
  const isOnOffer = product.discountPercentage > 0;
  
  // Calculamos el precio con descuento si aplica
  const discountedPrice = isOnOffer 
    ? product.price * (1 - product.discountPercentage / 100) 
    : product.price;

  // Creamos un producto para el carrito que SIEMPRE tenga el precio final
  const productForCart = { ...product, price: discountedPrice };

  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <div className="card h-100 shadow-sm border-0 rounded-lg overflow-hidden transition duration-300 hover:shadow-lg">
        <img 
          src={product.imageUrl} 
          className="card-img-top object-cover h-48" 
          alt={product.name} 
          onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x200/94A3B8/FFFFFF?text=Imagen+No+Disp" }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title text-primary font-weight-bold">{product.name}</h5>
          <p className="card-text text-muted mb-2"><small>{product.category}</small></p>

          {/* --- ¡VISUALIZACIÓN DE PRECIO MODIFICADA! --- */}
          <div className="mt-auto">
            {isOnOffer ? (
              <div>
                <div className="d-flex align-items-center">
                  <span className="fw-bold fs-4 text-success">{formatPrice(discountedPrice)}</span>
                  <span className="badge bg-danger ms-2">-{product.discountPercentage}%</span>
                </div>
                <del className="text-muted small">{formatPrice(product.price)}</del>
              </div>
            ) : (
              <p className="card-text fw-bold fs-4 text-success mb-0">{formatPrice(product.price)}</p>
            )}
          </div>

          <button 
            className="btn btn-primary mt-3 btn-lg d-flex align-items-center justify-content-center" 
            onClick={() => handleAddToCart(productForCart)} // ¡IMPORTANTE! Pasamos el producto con el precio ya descontado
            disabled={product.stock === 0}
          >
            {product.stock > 0 ? (
                <>
                    <i className="fas fa-cart-plus me-2"></i> Añadir al Carrito
                </>
            ) : (
                'Sin Stock'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;