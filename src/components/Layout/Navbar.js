// --- START OF FILE src/components/Layout/Navbar.js ---
import React from 'react';

const Navbar = ({ navigate, isAdmin }) => {
    if (isAdmin) return null;

    const categories = ['Laptops', 'TVs', 'Audio', 'Monitores'];
    
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom shadow-sm">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link text-dark fw-bold" href="#" onClick={() => navigate('home')}>Home</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle text-dark fw-bold" href="#" id="navbarDropdownCategories" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Categorías
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownCategories">
                                {categories.map(cat => (
                                    <li key={cat}>
                                        <a className="dropdown-item" href="#" onClick={() => navigate('category', cat)}>{cat}</a>
                                    </li>
                                ))}
                            </ul>
                        </li>
                        {/* ¡ENLACES ACTUALIZADOS! */}
                        <li className="nav-item">
                            <a className="nav-link text-danger fw-bold" href="#" onClick={() => navigate('offers')}>
                                <i className="fas fa-tags me-1"></i> Ofertas
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-dark fw-bold" href="#" onClick={() => navigate('contact')}>
                                <i className="fas fa-info-circle me-1"></i> Contacto
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
// --- END OF FILE src/components/Layout/Navbar.js ---