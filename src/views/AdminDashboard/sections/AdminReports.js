import React, { useState, useEffect } from 'react';
import { getOrders } from '../../../services/DataService.js';
import formatPrice from '../../../utils/formatPrice.js';

const AdminReports = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const data = await getOrders();
            setOrders(data);
        };
        fetchOrders();
    }, []);

    const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
    const completedOrders = orders.filter(o => o.estado === 'COMPLETADO').length;

    return (
        <div>
            <h2 className="text-white mb-4" style={{ fontFamily: 'Orbitron' }}>Reportes Financieros</h2>
            
            <div className="row mb-4">
                <div className="col-md-6">
                    <div className="card bg-dark border-success text-white p-3 shadow">
                        <h5 className="text-muted">Ingresos Totales</h5>
                        <h2 className="text-neon-green" style={{ fontFamily: 'Rajdhani', fontWeight: 'bold' }}>
                            {formatPrice(totalSales)}
                        </h2>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card bg-dark border-info text-white p-3 shadow">
                        <h5 className="text-muted">Tasa de Completitud</h5>
                        <h2 className="text-neon-blue" style={{ fontFamily: 'Rajdhani', fontWeight: 'bold' }}>
                            {orders.length > 0 ? ((completedOrders / orders.length) * 100).toFixed(1) : 0}%
                        </h2>
                    </div>
                </div>
            </div>

            <div className="card bg-dark border-secondary text-white shadow">
                <div className="card-header bg-transparent border-secondary">
                    <h5 className="mb-0">Historial de Transacciones</h5>
                </div>
                <div className="table-responsive">
                    <table className="table table-dark table-hover mb-0">
                        <thead>
                            <tr className="text-secondary">
                                <th>ID Transacción</th>
                                <th>Fecha</th>
                                <th>Cliente</th>
                                <th>Monto</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.id}>
                                    <td>#{order.id}</td>
                                    <td>{new Date(order.fecha).toLocaleDateString()}</td>
                                    <td>{order.usuario ? order.usuario.nombre : 'Desconocido'}</td>
                                    <td className="text-success fw-bold">{formatPrice(order.total)}</td>
                                    <td>
                                        <span className={`badge ${order.estado === 'COMPLETADO' ? 'bg-success' : 'bg-warning text-dark'}`}>
                                            {order.estado}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {orders.length === 0 && (
                                <tr><td colSpan="5" className="text-center py-3 text-muted">Sin movimientos financieros.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminReports;