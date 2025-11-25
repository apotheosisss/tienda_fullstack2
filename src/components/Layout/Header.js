import React from 'react';
import formatPrice from '../../utils/formatPrice.js';

const Header = ({ totalCartPrice, cartItemCount, navigate, userSession, handleLogout }) => {
    return (
        <header className="py-2 border-bottom border-secondary">
            <div className="container d-flex justify-content-end align-items-center gap-3">
                
                {/* Buscador */}
                <div className="input-group input-group-sm d-none d-md-flex" style={{ maxWidth: '250px' }}>
                    <input type="text" className="form-control bg-dark text-white border-secondary" placeholder="Buscar..." />
                    <button className="btn btn-outline-info" type="button">
                        <i className="fas fa-search"></i>
                    </button>
                </div>

                <div className="vr text-secondary mx-2" style={{ height: '25px' }}></div>

                {/* Menú de Usuario */}
                {userSession ? (
                    <div className="dropdown">
                        <button className="btn btn-sm text-white dropdown-toggle d-flex align-items-center gap-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <div className="rounded-circle bg-info d-flex justify-content-center align-items-center text-dark fw-bold" style={{ width: '30px', height: '30px' }}>
                                {userSession.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="d-none d-sm-inline fw-bold">{userSession.name}</span>
                        </button>
                        
                        <ul className="dropdown-menu dropdown-menu-end animate slideIn">
                            {/* DETALLES DE PERFIL VISIBLES */}
                            <li><h6 className="dropdown-header border-bottom border-secondary mb-2">{userSession.email}</h6></li>
                            
                            <li>
                                <button className="dropdown-item" onClick={() => navigate('profile')}>
                                    <i className="fas fa-user me-2 text-info"></i> Mi Perfil
                                </button>
                            </li>
                            
                            {userSession.role === 'admin' && (
                                <li>
                                    <button className="dropdown-item" onClick={() => navigate('admin-dashboard')}>
                                        <i className="fas fa-tachometer-alt me-2 text-warning"></i> Dashboard
                                    </button>
                                </li>
                            )}
                            
                            <li><hr className="dropdown-divider bg-secondary" /></li>
                            
                            <li>
                                <button className="dropdown-item text-danger" onClick={handleLogout}>
                                    <i className="fas fa-sign-out-alt me-2"></i> Cerrar Sesión
                                </button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <div className="d-flex gap-2">
                        <button className="btn btn-sm btn-outline-light" onClick={() => navigate('login')}>Ingresar</button>
                        <button className="btn btn-sm btn-info fw-bold" onClick={() => navigate('register')}>Registro</button>
                    </div>
                )}

                {/* Carrito */}
                <button className="btn-icon-nav position-relative ms-2" onClick={() => navigate('cart')}>
                    <i className="fas fa-shopping-cart"></i>
                    {cartItemCount > 0 && (
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill badge-cart">
                            {cartItemCount}
                        </span>
                    )}
                </button>
                
                <div className="d-none d-md-block text-end lh-1" style={{ fontSize: '0.8rem' }}>
                    <div className="text-muted">Total</div>
                    <div className="text-info fw-bold">{formatPrice(totalCartPrice)}</div>
                </div>
            </div>
        </header>
    );
};

export default Header;