import React, { useState, useEffect } from 'react';
import AdminSidenav from './AdminSidenav.js';

// Importar las secciones
import AdminHome from './sections/AdminHome.js';
import AdminProducts from './sections/AdminProducts.js';
import AdminOrders from './sections/AdminOrders.js';
import AdminUsers from './sections/AdminUsers.js';
import AdminCategories from './sections/AdminCategories.js';
import AdminReports from './sections/AdminReports.js';
import AdminProfile from './sections/AdminProfile.js';

/**
 * Componente principal del layout del administrador.
 * Maneja la navegación interna del panel.
 */
const AdminDashboard = ({ products, setProducts, navigate, isAdmin, handleLogout }) => {
    const [activeSection, setActiveSection] = useState('dashboard'); // 'dashboard' es el default
    
    // NOTA: users es null por ahora. Se puede expandir para cargar la lista real de usuarios.
    const users = null; 

    // Redirigir si no es admin (copiado de tu lógica anterior)
    useEffect(() => {
        if (!isAdmin) {
            navigate('home');
        }
    }, [isAdmin, navigate]);

    if (!isAdmin) {
        return <div className="container my-5"><div className="alert alert-danger">Acceso Denegado. Redirigiendo...</div></div>;
    }

    // Función para renderizar la sección activa
    const renderSection = () => {
        switch (activeSection) {
            case 'dashboard':
                // PASAMOS LA DATA REAL AQUÍ
                // Aseguramos que se pase la lista de productos
                return <AdminHome setActiveSection={setActiveSection} products={products} users={users} />;
            case 'orders':
                return <AdminOrders />;
            case 'products':
                return <AdminProducts products={products} setProducts={setProducts} />;
            case 'categories':
                return <AdminCategories />;
            case 'users':
                return <AdminUsers />;
            case 'reports':
                return <AdminReports />;
            case 'profile':
                return <AdminProfile />;
            default:
                // PASAMOS LA DATA REAL AQUÍ
                return <AdminHome setActiveSection={setActiveSection} products={products} users={users} />;
        }
    };

    return (
        <>
            {/* Estilos para el layout del admin */}
            <style>
                {`
                .admin-layout {
                    display: flex;
                    min-height: 100vh; 
                    background-color: #f8f9fa; /* Color de fondo general */
                }
                .admin-sidenav {
                    width: 260px; /* Ancho fijo para la barra lateral */
                    flex-shrink: 0; /* Evita que se encoja */
                }
                .admin-content {
                    flex-grow: 1; /* Ocupa el resto del espacio */
                    padding: 2.5rem;
                    overflow-x: hidden; /* Evita scroll horizontal */
                }
                @media (max-width: 768px) {
                    .admin-layout {
                        flex-direction: column;
                    }
                    .admin-sidenav {
                        width: 100%;
                        height: auto; /* Altura automática en móvil */
                        position: relative;
                    }
                    .admin-content {
                        padding: 1rem;
                    }
                }
                `}
            </style>
            <div className="admin-layout">
                {/* Barra lateral de navegación */}
                <div className="admin-sidenav">
                    <AdminSidenav 
                        activeSection={activeSection}
                        setActiveSection={setActiveSection}
                        handleLogout={handleLogout}
                        navigate={navigate}
                    />
                </div>
                
                {/* Contenido principal de la sección */}
                <main className="admin-content">
                    {renderSection()}
                </main>
            </div>
        </>
    );
};

export default AdminDashboard;
