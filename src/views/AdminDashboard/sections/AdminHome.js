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

    // Configuración de tarjetas con estilo Cyber
    const cards = [
        { title: 'Ventas Totales', value: formatPrice(stats.ventas), icon: 'fa-wallet', color: 'text-neon-green', border: 'border-success' },
        { title: 'Usuarios', value: stats.usuarios, icon: 'fa-users', color: 'text-neon-blue', border: 'border-info' },
        { title: 'Órdenes', value: stats.ordenes, icon: 'fa-shopping-cart', color: 'text-warning', border: 'border-warning' },
        { title: 'Productos', value: stats.productos, icon: 'fa-box-open', color: 'text-neon-pink', border: 'border-danger' },
    ];

    return (
        <div>
            <h2 className="mb-4 text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>Dashboard Principal</h2>
            
            {/* Tarjetas de Estadísticas */}
            <div className="row g-4 mb-5">
                {cards.map((stat, index) => (
                    <div key={index} className="col-md-3">
                        {/* FORZAMOS CLASES bg-dark text-white para asegurar visibilidad */}
                        <div className={`card h-100 p-3 shadow-lg bg-dark text-white border-0 border-bottom border-3 ${stat.border}`} style={{ backgroundColor: '#1e293b !important' }}>
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="text-muted text-uppercase mb-2" style={{ letterSpacing: '1px', fontSize: '0.8rem' }}>{stat.title}</h6>
                                    <h3 className={`fw-bold mb-0 ${stat.color}`} style={{ fontFamily: 'Rajdhani, sans-serif' }}>
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

            {/* Sección de Actividad */}
            <div className="row g-4">
                <div className="col-md-8">
                    <div className="card bg-dark text-white border-secondary shadow h-100">
                        <div className="card-header bg-transparent border-secondary text-white">
                            <h5 className="mb-0" style={{ fontFamily: 'Orbitron' }}>Actividad de Ventas (Semanal)</h5>
                        </div>
                        <div className="card-body d-flex align-items-end justify-content-around px-4 pb-0" style={{ height: '300px' }}>
                            {/* Barras de Gráfico Simuladas con CSS y Gradientes Neón */}
                            {[30, 50, 45, 80, 60, 90, 100].map((h, i) => (
                                <div key={i} className="d-flex flex-column align-items-center w-100 mx-2">
                                    <div 
                                        className="w-100 rounded-top shadow"
                                        style={{ 
                                            height: `${h}%`, 
                                            background: 'linear-gradient(to top, #00f3ff, transparent)',
                                            opacity: 0.8,
                                            borderTop: '2px solid #00f3ff'
                                        }} 
                                    ></div>
                                    <small className="text-muted mt-2">Día {i+1}</small>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                
                <div className="col-md-4">
                    <div className="card bg-dark text-white border-secondary shadow h-100">
                        <div className="card-header bg-transparent border-secondary text-white">
                            <h5 className="mb-0" style={{ fontFamily: 'Orbitron' }}>Métricas Rápidas</h5>
                        </div>
                        <div className="card-body">
                            <div className="mb-4">
                                <div className="d-flex justify-content-between mb-1">
                                    <span>Tasa de Conversión</span>
                                    <span className="text-neon-green">4.5%</span>
                                </div>
                                <div className="progress bg-secondary" style={{ height: '5px' }}>
                                    <div className="progress-bar bg-success" style={{ width: '45%' }}></div>
                                </div>
                            </div>
                            <div className="mb-4">
                                <div className="d-flex justify-content-between mb-1">
                                    <span>Nuevos Clientes</span>
                                    <span className="text-neon-blue">+12</span>
                                </div>
                                <div className="progress bg-secondary" style={{ height: '5px' }}>
                                    <div className="progress-bar bg-info" style={{ width: '65%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="d-flex justify-content-between mb-1">
                                    <span>Satisfacción</span>
                                    <span className="text-warning">98%</span>
                                </div>
                                <div className="progress bg-secondary" style={{ height: '5px' }}>
                                    <div className="progress-bar bg-warning" style={{ width: '98%' }}></div>
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