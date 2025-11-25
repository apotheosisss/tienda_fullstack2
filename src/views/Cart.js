import React from 'react';
import formatPrice from '../utils/formatPrice.js';
import { calculateDiscountedPrice } from '../utils/priceHelper.js';

const Cart = ({ cartItems, setCartItems, navigate }) => {
    
    // CÁLCULO CON DESCUENTO
    const subtotal = cartItems.reduce((sum, item) => {
        const price = calculateDiscountedPrice(item.precio, item.descuento);
        return sum + (price * item.quantity);
    }, 0);

    const handleQuantityChange = (id, newQuantity) => {
        if (newQuantity < 1) return;
        setCartItems(cartItems.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
    };

    const handleRemoveItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    if (cartItems.length === 0) {
        return (
            <div className="container my-5 text-center text-white">
                <div className="p-5 rounded-4 border border-secondary bg-transparent">
                    <i className="fas fa-shopping-cart fa-4x text-secondary mb-3 opacity-50"></i>
                    <h2 className="cyber-font">Carrito Vacío</h2>
                    <button className="btn btn-outline-info mt-4 px-5" onClick={() => navigate('home')}>
                        Volver a la Tienda
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container my-5">
            <h2 className="mb-4 text-white cyber-font">Tu Carrito</h2>
            <div className="row">
                <div className="col-lg-8">
                    <div className="card border-0 shadow bg-transparent">
                        <div className="card-body p-0">
                            {cartItems.map(item => {
                                const unitPrice = calculateDiscountedPrice(item.precio, item.descuento);
                                return (
                                    <div key={item.id} className="d-flex align-items-center p-3 border-bottom border-secondary">
                                        <img 
                                            src={item.imageUrl || 'https://via.placeholder.com/100'} 
                                            alt={item.nombre} 
                                            className="rounded-3 border border-secondary" 
                                            style={{ width: '80px', height: '80px', objectFit: 'cover' }} 
                                        />
                                        <div className="ms-3 flex-grow-1 text-white">
                                            <h5 className="mb-1 fw-bold">{item.nombre}</h5>
                                            <p className="mb-0 text-info" style={{ fontFamily: 'Rajdhani', fontSize: '1.1rem' }}>
                                                {formatPrice(unitPrice)} 
                                                {item.descuento > 0 && <span className="badge bg-danger ms-2">-{item.descuento}%</span>}
                                            </p>
                                        </div>
                                        <div className="d-flex align-items-center bg-dark rounded px-2 py-1 border border-secondary">
                                            <button className="btn btn-sm text-white" onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
                                            <span className="mx-3 text-white fw-bold">{item.quantity}</span>
                                            <button className="btn btn-sm text-white" onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                                        </div>
                                        <button className="btn btn-link text-danger ms-3" onClick={() => handleRemoveItem(item.id)}>
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 mt-4 mt-lg-0">
                    <div className="card border-info shadow bg-transparent text-white">
                        <div className="card-body">
                            <h4 className="card-title cyber-font mb-4 text-info">Resumen</h4>
                            <div className="d-flex justify-content-between mb-3">
                                <span className="text-secondary">Total</span>
                                <span className="h4 fw-bold text-success">{formatPrice(subtotal)}</span>
                            </div>
                            <button className="btn btn-info w-100 btn-lg fw-bold shadow" onClick={() => navigate('checkout')}>
                                IR A PAGAR
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;