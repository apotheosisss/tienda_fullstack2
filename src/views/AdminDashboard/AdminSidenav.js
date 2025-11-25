import React from 'react';

const AdminSidenav = ({ activeSection, setActiveSection, handleLogout }) => {
    const menuItems = [
        { id: 'home', label: 'Dashboard', icon: 'fa-tachometer-alt' },
        { id: 'orders', label: 'Órdenes', icon: 'fa-shopping-bag' },
        { id: 'products', label: 'Productos', icon: 'fa-box' },
        { id: 'categories', label: 'Categorías', icon: 'fa-tags' },
        { id: 'users', label: 'Usuarios', icon: 'fa-users' },
        { id: 'reports', label: 'Reportes', icon: 'fa-chart-line' },
        { id: 'profile', label: 'Perfil', icon: 'fa-user-cog' },
    ];

    return (
        <div 
            className="d-flex flex-column flex-shrink-0 p-3 text-white h-100 shadow-lg position-relative" 
            style={{ width: '280px', background: '#0f172a', borderRight: '1px solid #00f3ff' }}
        >
            <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-decoration-none">
                <span className="fs-4 fw-bold text-info" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    <i className="fas fa-shield-alt me-2"></i>ADMIN
                </span>
            </div>
            <hr className="border-info" />
            <ul className="nav nav-pills flex-column mb-auto">
                {menuItems.map(item => (
                    <li key={item.id} className="nav-item mb-2">
                        <button
                            className={`nav-link w-100 text-start ${activeSection === item.id ? 'active' : 'text-secondary'}`}
                            onClick={() => setActiveSection(item.id)}
                            style={{ 
                                borderRadius: '0px', 
                                borderLeft: activeSection === item.id ? '4px solid #00f3ff' : '4px solid transparent',
                                transition: 'all 0.3s' 
                            }}
                        >
                            <i className={`fas ${item.icon} me-3`} style={{ width: '20px' }}></i>
                            {item.label}
                        </button>
                    </li>
                ))}
            </ul>
            <hr className="border-info" />
            
            {/* Botón de Salida */}
            <div className="mb-3">
                <button 
                    className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2"
                    onClick={handleLogout}
                >
                    <i className="fas fa-sign-out-alt"></i> Cerrar Sesión
                </button>
            </div>

            <div className="text-center text-muted small">
                <p className="mb-0">v2.0 TechStore</p>
            </div>
        </div>
    );
};

export default AdminSidenav;