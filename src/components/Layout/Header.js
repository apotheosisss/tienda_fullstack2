import React from 'react';
import formatPrice from '../../utils/formatPrice.js';

// --- Header ---
const Header = ({ totalCartPrice, cartItemCount, navigate, userSession, handleLogout }) => {
    const isLoggedIn = !!userSession;
    const isAdmin = userSession?.role === 'admin';

    return (
        <header className="navbar navbar-expand-lg navbar-dark bg-primary shadow-lg sticky-top">
            <div className="container-fluid">
                <a className="navbar-brand fs-3 font-weight-bold text-white" href="#" onClick={() => navigate('home')}>
                    ElectroPlus
                </a>
                
                <div className="d-flex align-items-center">
                    {/* Botón Carrito solo visible si NO es admin (el admin no compra) */}
                    {!isAdmin && (
                        <button 
                            className="btn btn-warning me-3 position-relative" 
                            onClick={() => navigate('cart')}
                            aria-label={`Ver carrito, ${cartItemCount} items, total ${formatPrice(totalCartPrice)}`}
                        >
                            <i className="fas fa-shopping-cart me-2"></i> 
                            <span className="d-none d-sm-inline">Carrito</span>
                            <span className="badge bg-danger rounded-pill position-absolute top-0 start-100 translate-middle">
                                {cartItemCount}
                            </span>
                        </button>
                    )}

                    {/* Botones de Auth */}
                    {isLoggedIn ? (
                        <div className="dropdown">
                            <button className="btn btn-outline-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fas fa-user-circle me-1"></i> 
                                {isAdmin ? 'ADMIN' : userSession.email}
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end">
                                {isAdmin && (
                                    <>
                                        <li>
                                            <button className="dropdown-item fw-bold text-success" onClick={() => navigate('admin-dashboard')}>
                                                <i className="fas fa-tachometer-alt me-2"></i> Dashboard Admin
                                            </button>
                                        </li>
                                        <li><hr className="dropdown-divider" /></li>
                                    </>
                                )}
                                <li><a className="dropdown-item" href="#">Perfil ({isAdmin ? 'Admin' : 'Cliente'})</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><button className="dropdown-item text-danger" onClick={handleLogout}>Cerrar Sesión</button></li>
                            </ul>
                        </div>
                    ) : (
                        <>
                            <button className="btn btn-outline-light me-2" onClick={() => navigate('login')}>
                                Iniciar Sesión
                            </button>
                            <button className="btn btn-light" onClick={() => navigate('register')}>
                                Crear Cuenta
                            </button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
