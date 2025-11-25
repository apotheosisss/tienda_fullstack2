import React, { useState, useEffect } from 'react';
import { getDashboardStats } from '../../../services/DataService.js';
import formatPrice from '../../../utils/formatPrice.js';

const AdminHome = () => {
    const [stats, setStats] = useState({ ventas: 0, usuarios: 0, ordenes: 0, productos: 0 });

    useEffect(() => {
        const loadStats = async () => {
            const data = await getDashboardStats();
            setStats(data);
        };
        loadStats();
    }, []);

    const cards = [
        { title: 'Ventas Totales', value: formatPrice(stats.ventas), icon: 'fa-wallet', color: 'text-success', border: 'border-success' },
        { title: 'Usuarios', value: stats.usuarios, icon: 'fa-users', color: 'text-info', border: 'border-info' },
        { title: 'Órdenes', value: stats.ordenes, icon: 'fa-shopping-cart', color: 'text-warning', border: 'border-warning' },
        { title: 'Productos', value: stats.productos, icon: 'fa-box-open', color: 'text-danger', border: 'border-danger' },
    ];

    return (
        <div className="container-fluid">
            <h2 className="mb-4 cyber-font text-white">Dashboard General</h2>
            
            <div className="row g-4 mb-5">
                {cards.map((stat, index) => (
                    <div key={index} className="col-md-3">
                        <div className={`card h-100 p-3 shadow-lg border-0 border-bottom border-3 ${stat.border}`}>
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    {/* AQUÍ ESTABA EL ERROR: Cambiado de text-muted a text-info (Neón Claro) */}
                                    <h6 className="text-info text-uppercase mb-2 fw-bold" style={{ letterSpacing: '1px', fontSize: '0.8rem' }}>
                                        {stat.title}
                                    </h6>
                                    <h3 className="fw-bold mb-0 text-white" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                                        {stat.value}
                                    </h3>
                                </div>
                                <div className={`fs-1 ${stat.color} opacity-50`}>
                                    <i className={`fas ${stat.icon}`}></i>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="row g-4">
                <div className="col-md-8">
                    <div className="card h-100">
                        <div className="card-header bg-transparent border-secondary">
                            <h5 className="mb-0 cyber-font text-white">Actividad de Ventas</h5>
                        </div>
                        <div className="card-body d-flex align-items-end justify-content-around" style={{ height: '300px' }}>
                            {[40, 70, 55, 90, 65, 85, 100].map((h, i) => (
                                <div key={i} className="d-flex flex-column align-items-center w-100 mx-2">
                                    <div 
                                        className="w-100 rounded-top"
                                        style={{ 
                                            height: `${h}%`, 
                                            background: 'linear-gradient(to top, #00f3ff, transparent)',
                                            opacity: 0.8,
                                            borderTop: '2px solid #00f3ff'
                                        }} 
                                    ></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                
                <div className="col-md-4">
                    <div className="card h-100">
                        <div className="card-header bg-transparent border-secondary">
                            <h5 className="mb-0 cyber-font text-white">Estado del Sistema</h5>
                        </div>
                        <div className="card-body">
                            <div className="mb-4">
                                <div className="d-flex justify-content-between mb-1">
                                    <span className="text-secondary">Servidor</span>
                                    <span className="text-success">En Línea</span>
                                </div>
                                <div className="progress" style={{ height: '6px', background: '#333' }}>
                                    <div className="progress-bar bg-success" style={{ width: '100%' }}></div>
                                </div>
                            </div>
                            <div className="mb-4">
                                <div className="d-flex justify-content-between mb-1">
                                    <span className="text-secondary">Base de Datos</span>
                                    <span className="text-info">Conectado</span>
                                </div>
                                <div className="progress" style={{ height: '6px', background: '#333' }}>
                                    <div className="progress-bar bg-info" style={{ width: '100%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;