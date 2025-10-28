import React from 'react';

/**
 * Barra lateral de navegación para el panel de administrador.
 */
const AdminSidenav = ({ activeSection, setActiveSection, handleLogout, navigate }) => {
    
    // Lista de enlaces de navegación
    const navLinks = [
        { key: 'dashboard', icon: 'fa-tachometer-alt', label: 'Dashboard' },
        { key: 'orders', icon: 'fa-file-invoice-dollar', label: 'Órdenes' },
        { key: 'products', icon: 'fa-box', label: 'Productos' },
        { key: 'categories', icon: 'fa-tags', label: 'Categorías' },
        { key: 'users', icon: 'fa-users', label: 'Usuarios' },
        { key: 'reports', icon: 'fa-chart-bar', label: 'Reportes' },
    ];

    return (
        <>
            {/* Estilos para el Sidenav */}
            <style>
                {`
                .admin-sidebar-sticky {
                    position: sticky;
                    top: 0;
                    height: 100vh; /* Altura completa */
                    overflow-y: auto; /* Scroll si el contenido es mucho */
                }
                .admin-sidebar-sticky .nav-link {
                    font-weight: 500;
                    color: rgba(255, 255, 255, 0.7);
                    padding: 0.75rem 1.5rem;
                    display: flex;
                    align-items: center;
                }
                .admin-sidebar-sticky .nav-link .fas {
                    width: 24px; /* Espacio para el icono */
                    margin-right: 0.5rem;
                    text-align: center;
                }
                .admin-sidebar-sticky .nav-link:hover {
                    color: #ffffff;
                    background-color: rgba(255, 255, 255, 0.1);
                }
                .admin-sidebar-sticky .nav-link.active {
                    color: #ffffff;
                    background-color: #0d6efd; /* Color primario de Bootstrap */
                }
                .admin-sidebar-sticky .company-name {
                    font-size: 1.25rem;
                    font-weight: bold;
                    color: #ffffff;
                    padding: 1.5rem;
                }
                .sidebar-divider {
                    border-top: 1px solid rgba(255, 255, 255, 0.15);
                    margin: 1rem 0;
                }
                `}
            </style>

            <nav className="d-flex flex-column justify-content-between bg-dark admin-sidebar-sticky p-0">
                {/* Parte superior: Título y Navegación */}
                <div>
                    <div className="company-name text-center text-md-start">
                        ElectroPlus
                    </div>
                    
                    <ul className="nav flex-column nav-pills">
                        {navLinks.map(link => (
                            <li className="nav-item" key={link.key}>
                                <button
                                    className={`nav-link w-100 text-start ${activeSection === link.key ? 'active' : ''}`}
                                    onClick={() => setActiveSection(link.key)}
                                >
                                    <i className={`fas ${link.icon}`}></i>
                                    {link.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Parte inferior: Perfil, Tienda y Logout */}
                <div className="p-3">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <button
                                className={`nav-link w-100 text-start ${activeSection === 'profile' ? 'active' : ''}`}
                                onClick={() => setActiveSection('profile')}
                            >
                                <i className="fas fa-user-circle"></i>
                                Perfil
                            </button>
                        </li>
                    </ul>

                    <div className="sidebar-divider"></div>
                    
                    <button 
                        className="btn btn-primary w-100 mb-2"
                        onClick={() => navigate('home')} // Navega a la vista pública
                    >
                        <i className="fas fa-store me-2"></i> Ver Tienda
                    </button>
                    <button 
                        className="btn btn-danger w-100"
                        onClick={handleLogout}
                    >
                        <i className="fas fa-sign-out-alt me-2"></i> Cerrar Sesión
                    </button>
                </div>
            </nav>
        </>
    );
};

export default AdminSidenav;
