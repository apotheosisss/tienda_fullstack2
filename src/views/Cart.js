import React from 'react';
import formatPrice from '../utils/formatPrice.js';

const Cart = ({ cartItems, setCartItems, navigate }) => {
    
    // CORRECCIÓN: 'precio' en vez de 'price'
    const subtotal = cartItems.reduce((sum, item) => sum + (item.precio || 0) * item.quantity, 0);

    const handleQuantityChange = (id, newQuantity) => {
        if (newQuantity < 1) return;
        setCartItems(cartItems.map(item => 
            item.id === id ? { ...item, quantity: newQuantity } : item
        ));
    };

    const handleRemoveItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    if (cartItems.length === 0) {
        return (
            <div className="container my-5 text-center text-white">
                <div className="p-5 rounded-4" style={{ background: '#1e293b' }}>
                    <i className="fas fa-shopping-cart fa-4x text-secondary mb-3"></i>
                    <h2>Tu carrito está vacío</h2>
                    <p className="text-muted">¡Explora nuestro catálogo tecnológico!</p>
                    <button className="btn btn-primary mt-3" onClick={() => navigate('home')}>
                        Ir a la Tienda
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container my-5">
            <h2 className="mb-4 text-white fw-bold"><i className="fas fa-shopping-cart me-2 text-primary"></i> Carrito de Compras</h2>
            <div className="row">
                <div className="col-lg-8">
                    <div className="card shadow-sm border-0" style={{ background: '#1e293b' }}>
                        <div className="card-body p-0">
                            {cartItems.map(item => (
                                <div key={item.id} className="d-flex align-items-center p-3 border-bottom border-secondary">
                                    <img 
                                        src={item.imageUrl || 'https://via.placeholder.com/100'} 
                                        alt={item.nombre} 
                                        className="rounded-3 object-fit-cover" 
                                        style={{ width: '80px', height: '80px' }} 
                                    />
                                    <div className="ms-3 flex-grow-1">
                                        {/* CORRECCIÓN: item.nombre */}
                                        <h5 className="mb-1 text-white fw-bold">{item.nombre}</h5>
                                        <p className="mb-0 text-info">{formatPrice(item.precio)}</p>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <button className="btn btn-sm btn-dark border-secondary" onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
                                        <span className="mx-3 text-white fw-bold">{item.quantity}</span>
                                        <button className="btn btn-sm btn-dark border-secondary" onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                                    </div>
                                    <button className="btn btn-outline-danger btn-sm ms-4" onClick={() => handleRemoveItem(item.id)}>
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 mt-4 mt-lg-0">
                    <div className="card shadow-sm border-0 text-white" style={{ background: '#0f172a', border: '1px solid #334155' }}>
                        <div className="card-body">
                            <h4 className="card-title fw-bold mb-4">Resumen</h4>
                            <div className="d-flex justify-content-between mb-3">
                                <span className="text-secondary">Subtotal</span>
                                <span className="fw-bold">{formatPrice(subtotal)}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <span className="text-secondary">Envío</span>
                                <span className="text-success">Gratis</span>
                            </div>
                            <hr className="border-secondary" />
                            <div className="d-flex justify-content-between mb-4">
                                <span className="h5 fw-bold">Total</span>
                                <span className="h5 fw-bold text-primary">{formatPrice(subtotal)}</span>
                            </div>
                            <button className="btn btn-success w-100 btn-lg fw-bold shadow" onClick={() => navigate('checkout')}>
                                PROCEDER AL PAGO
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;