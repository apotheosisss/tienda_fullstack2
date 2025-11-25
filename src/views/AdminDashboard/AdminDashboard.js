import React, { useState } from 'react';
import AdminSidenav from './AdminSidenav.js';
import AdminHome from './sections/AdminHome.js';
import AdminOrders from './sections/AdminOrders.js';
import AdminProducts from './sections/AdminProducts.js';
import AdminCategories from './sections/AdminCategories.js';
import AdminUsers from './sections/AdminUsers.js';
import AdminReports from './sections/AdminReports.js';
import AdminProfile from './sections/AdminProfile.js';

const AdminDashboard = ({ products, setProducts, navigate, isAdmin, handleLogout }) => {
    const [activeSection, setActiveSection] = useState('home');

    if (!isAdmin) return null;

    const renderSection = () => {
        switch (activeSection) {
            case 'home': return <AdminHome products={products} />;
            case 'orders': return <AdminOrders />;
            case 'products': return <AdminProducts products={products} setProducts={setProducts} />;
            case 'categories': return <AdminCategories />;
            case 'users': return <AdminUsers />;
            case 'reports': return <AdminReports />;
            case 'profile': return <AdminProfile />;
            default: return <AdminHome products={products} />;
        }
    };

    return (
        <div className="d-flex min-vh-100 bg-dark">
            <div className="flex-shrink-0">
                {/* Pasamos handleLogout al menú */}
                <AdminSidenav 
                    activeSection={activeSection} 
                    setActiveSection={setActiveSection} 
                    handleLogout={handleLogout} 
                />
            </div>
            <div className="flex-grow-1 p-4 text-white" style={{ overflowY: 'auto', background: '#050509' }}>
                <div className="container-fluid">
                    {renderSection()}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;