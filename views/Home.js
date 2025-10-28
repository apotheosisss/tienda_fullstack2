import React from 'react';
import ProductCard from '../components/ProductCard/ProductCard.js';

// --- Home View ---
const Home = ({ products, handleAddToCart, navigate }) => {
    // Tomamos los primeros 6 productos para la Home
    const featuredProducts = products.slice(0, 6); 

    return (
        <div className="container my-5">
            {/* Banner principal (Placeholder según plantilla) */}
            <div className="text-center mb-5 p-5 bg-info text-white rounded-lg shadow-lg">
                <h1 className="display-4 font-weight-bold">Nuevos Lanzamientos en Tecnología</h1>
                <p className="lead">Explora lo último en Laptops y Smart TVs.</p>
                <button className="btn btn-warning btn-lg mt-3" onClick={() => navigate('category', 'Laptops')}>Ver Laptops</button>
            </div>

            <h2 className="mb-4 text-center text-primary">Productos Destacados</h2>
            <div className="row">
                {featuredProducts.map(product => (
                    <ProductCard 
                        key={product.id} 
                        product={product} 
                        handleAddToCart={handleAddToCart}
                        navigate={navigate}
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;
