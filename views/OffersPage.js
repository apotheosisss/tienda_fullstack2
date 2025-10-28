import React from 'react';
import ProductCard from '../components/ProductCard/ProductCard.js';

const OffersPage = ({ products, handleAddToCart, navigate }) => {
    // --- ¡CORRECCIÓN CLAVE AQUÍ! ---
    // Filtramos solo los productos que tienen un descuento mayor a 0
    const offerProducts = products.filter(p => p.discountPercentage > 0);

    return (
        <div className="container my-5">
            <div className="text-center mb-5 p-5 bg-danger text-white rounded-lg shadow-lg">
                <h1 className="display-4 font-weight-bold">¡Ofertas Imperdibles!</h1>
                <p className="lead">Aprovecha nuestros descuentos especiales en productos seleccionados.</p>
            </div>

            <h2 className="mb-4 text-center text-primary">Productos en Oferta</h2>
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
                    <div className="col-12 text-center">
                        <div className="alert alert-info">
                            <p className="lead mb-0">No hay ofertas disponibles en este momento. ¡Vuelve pronto!</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OffersPage;