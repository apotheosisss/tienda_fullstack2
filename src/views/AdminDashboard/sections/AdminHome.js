import React from 'react';

/**
 * Vista principal del Dashboard (AdminHome).
 * Muestra tarjetas de resumen y navegación con datos DINÁMICOS.
 */
const AdminHome = ({ setActiveSection, products, users }) => { // Recibe productos y usuarios

    // --- DATOS DINÁMICOS ---
    const productCount = products ? products.length : 0;
    // Asumimos 5 usuarios base si no se pasan, o el recuento real
    const userCount = users ? users.length : 5; 
    
    // --- DATOS SIMULADOS (Necesitarías una lista de órdenes real para esto) ---
    // Simulamos un número de órdenes
    const orderCount = 27; 
    // Simulamos un valor de ventas
    const salesValue = 1850000; 
    const salesFormatted = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 }).format(salesValue);


    // Datos de las tarjetas de resumen (dinámicos)
    const summaryCards = [
        { 
            key: 'ventas', 
            bg: 'primary', 
            icon: 'fa-chart-line', 
            title: 'Ventas (CLP)', 
            value: salesFormatted, 
            text: `Basado en ${orderCount} órdenes.`,
            action: 'orders'
        },
        { 
            key: 'productos', 
            bg: 'success', 
            icon: 'fa-box', 
            title: 'Productos', 
            value: productCount, 
            text: `Productos únicos en inventario.`,
            action: 'products'
        },
        { 
            key: 'usuarios', 
            bg: 'warning', 
            icon: 'fa-users', 
            title: 'Usuarios', 
            value: userCount, 
            text: 'Total de usuarios registrados.',
            action: 'users'
        },
    ];

    // Datos de las tarjetas de navegación
    const navCards = [
        { key: 'orders', icon: 'fa-file-invoice-dollar', title: 'Órdenes', text: 'Gestión y seguimiento de órdenes.' },
        { key: 'products', icon: 'fa-box', title: 'Productos', text: 'Administrar inventario y detalles.' },
        { key: 'categories', icon: 'fa-tags', title: 'Categorías', text: 'Organizar productos en categorías.' },
        { key: 'reports', icon: 'fa-chart-bar', title: 'Reportes', text: 'Generación de informes detallados.' },
    ];

    const handleNavClick = (key) => {
        setActiveSection(key);
    };

    return (
        <div>
            <h1 className="h2 mb-4">Dashboard Principal</h1>
            <p className="text-muted">Resumen de indicadores clave de rendimiento</p>

            {/* Tarjetas de Resumen (Métricas Reales) */}
            <div className="row mb-4">
                {summaryCards.map(card => (
                    <div className="col-md-4 mb-3" key={card.key}>
                        <div className={`card bg-${card.bg} text-white shadow h-100`} style={{cursor: 'pointer'}} onClick={() => setActiveSection(card.action)}>
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h5 className="card-title mb-0">{card.title}</h5>
                                        <h2 className="display-6 fw-bold">{card.value}</h2>
                                    </div>
                                    <i className={`fas ${card.icon} fa-3x opacity-50`}></i>
                                </div>
                                <p className="card-text opacity-75 mt-2 mb-0">{card.text}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <h2 className="h4 mt-5 mb-3">Accesos Directos</h2>
            {/* Tarjetas de Navegación */}
            <div className="row">
                {navCards.map(card => (
                    <div className="col-lg-3 col-md-6 mb-4" key={card.key}>
                        <div 
                            className="card shadow-sm h-100 text-center border-start border-primary border-5" 
                            onClick={() => handleNavClick(card.key)}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="card-body d-flex flex-column justify-content-center align-items-center p-4">
                                <i className={`fas ${card.icon} fa-3x text-primary mb-3`}></i>
                                <h5 className="card-title fw-bold">{card.title}</h5>
                                <p className="card-text text-muted small">{card.text}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminHome;
