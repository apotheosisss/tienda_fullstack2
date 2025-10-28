import React from 'react';
import formatPrice from '../utils/formatPrice.js';

// --- Cart View ---
const Cart = ({ cartItems, setCartItems, navigate }) => {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const updateQuantity = (id, change) => {
        setCartItems(currentItems => {
            const newItems = currentItems.map(item =>
                item.id === id ? { ...item, quantity: item.quantity + change } : item
            ).filter(item => item.quantity > 0);
            return newItems;
        });
    };

    const removeItem = (id) => {
        setCartItems(currentItems => currentItems.filter(item => item.id !== id));
    };

    const handleCheckout = () => {
        if (cartItems.length > 0) {
            // ¡CAMBIO CLAVE AQUÍ!
            // Ahora navegamos a la página de checkout en lugar de procesar directamente
            navigate('checkout'); 
        } else {
            console.log("El carrito está vacío.");
        }
    };

    return (
        <div className="container my-5">
            <h1 className="mb-4 text-center text-primary">Tu Carrito de Compras</h1>
            <div className="row">
                <div className="col-lg-8">
                    {cartItems.length === 0 ? (
                        <div className="alert alert-info text-center" role="alert">
                            Tu carrito está vacío. ¡Añade algunos productos!
                            <button className="btn btn-info ms-3" onClick={() => navigate('home')}>
                                Ir a comprar
                            </button>
                        </div>
                    ) : (
                        <div className="list-group shadow">
                            {cartItems.map(item => (
                                <div key={item.id} className="list-group-item d-flex align-items-center justify-content-between p-3">
                                    <div className="d-flex align-items-center">
                                        <img src={item.imageUrl} alt={item.name} className="img-fluid rounded me-3" style={{ width: '60px', height: '60px', objectFit: 'cover' }} />
                                        <div>
                                            <h5 className="mb-1">{item.name}</h5>
                                            <p className="mb-1 text-muted"><small>{formatPrice(item.price)} c/u</small></p>
                                        </div>
                                    </div>
                                    
                                    <div className="d-flex align-items-center">
                                        <div className="btn-group me-3" role="group" aria-label="Control de cantidad">
                                            <button className="btn btn-outline-secondary btn-sm" onClick={() => updateQuantity(item.id, -1)}>-</button>
                                            <span className="btn btn-light btn-sm disabled">{item.quantity}</span>
                                            <button className="btn btn-outline-secondary btn-sm" onClick={() => updateQuantity(item.id, 1)}>+</button>
                                        </div>
                                        <p className="mb-0 fw-bold me-3">{formatPrice(item.price * item.quantity)}</p>
                                        <button className="btn btn-danger btn-sm" onClick={() => removeItem(item.id)} aria-label="Eliminar producto">
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="col-lg-4 mt-4 mt-lg-0">
                    <div className="card shadow-lg">
                        <div className="card-body">
                            <h4 className="card-title text-center text-success mb-4">Resumen de Compra</h4>
                            <div className="d-flex justify-content-between mb-3 border-bottom pb-2">
                                <p className="mb-0">Subtotal ({cartItems.length} items):</p>
                                <p className="mb-0 fw-bold">{formatPrice(total)}</p>
                            </div>
                            <div className="d-flex justify-content-between mb-4">
                                <h5 className="mb-0">Total:</h5>
                                <h5 className="mb-0 fw-bold text-success">{formatPrice(total)}</h5>
                            </div>
                            <button 
                                className="btn btn-success btn-lg w-100" 
                                onClick={handleCheckout}
                                disabled={cartItems.length === 0}
                            >
                                <i className="fas fa-credit-card me-2"></i> Procesar Pago
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
// --- END OF FILE Cart.js ---