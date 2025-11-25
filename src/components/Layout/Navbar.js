import React from 'react';

const Navbar = ({ navigate, isAdmin }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark sticky-top py-3">
            <div className="container">
                {/* Logo o Marca */}
                <button className="navbar-brand btn btn-link text-decoration-none p-0 border-0" onClick={() => navigate('home')}>
                    <i className="fas fa-robot me-2" style={{ color: '#00f3ff' }}></i>
                    <span className="fw-bold" style={{ fontFamily: 'Orbitron', letterSpacing: '2px', color: '#fff' }}>ELECTRO</span>
                    <span className="fw-bold" style={{ fontFamily: 'Orbitron', letterSpacing: '2px', color: '#00f3ff' }}>PLUS</span>
                </button>

                <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon" style={{ filter: 'drop-shadow(0 0 5px #00f3ff)' }}></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-center gap-3">
                        <li className="nav-item">
                            <button className="nav-link btn btn-link" onClick={() => navigate('home')}>INICIO</button>
                        </li>
                        
                        {/* Dropdown Categorías */}
                        <li className="nav-item dropdown">
                            <button className="nav-link btn btn-link dropdown-toggle" data-bs-toggle="dropdown">
                                CATEGORÍAS
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end animate slideIn">
                                <li><button className="dropdown-item" onClick={() => navigate('category', 'Laptops')}><i className="fas fa-laptop me-2"></i>Laptops</button></li>
                                <li><button className="dropdown-item" onClick={() => navigate('category', 'TVs')}><i className="fas fa-tv me-2"></i>Smart TVs</button></li>
                                <li><button className="dropdown-item" onClick={() => navigate('category', 'Audio')}><i className="fas fa-headphones me-2"></i>Audio</button></li>
                                <li><button className="dropdown-item" onClick={() => navigate('category', 'Monitores')}><i className="fas fa-desktop me-2"></i>Monitores</button></li>
                                <li><hr className="dropdown-divider bg-secondary" /></li>
                                <li><button className="dropdown-item" onClick={() => navigate('offers')}><i className="fas fa-bolt text-warning me-2"></i>Ofertas</button></li>
                            </ul>
                        </li>

                        <li className="nav-item">
                            <button className="nav-link btn btn-link" onClick={() => navigate('contact')}>CONTACTO</button>
                        </li>

                        {/* Botón Admin (Solo si es admin) */}
                        {isAdmin && (
                            <li className="nav-item">
                                <button className="btn btn-sm btn-outline-danger border-2 fw-bold ms-2" onClick={() => navigate('admin-dashboard')}>
                                    <i className="fas fa-shield-alt me-2"></i>ADMIN PANEL
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;