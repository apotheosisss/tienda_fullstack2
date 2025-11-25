import React, { useState, useEffect } from 'react';
import { getOrders, updateOrderStatus } from '../../../services/DataService.js';
import formatPrice from '../../../utils/formatPrice.js';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        const data = await getOrders();
        setOrders(data);
    };

    const handleStatusChange = async (id, newStatus) => {
        await updateOrderStatus(id, newStatus);
        loadOrders(); // Recargar para ver cambios
    };

    return (
        <div>
            <h2 className="mb-4 text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>Gestión de Órdenes</h2>
            <div className="card bg-dark border-0 shadow">
                <div className="table-responsive">
                    <table className="table table-dark table-hover mb-0 align-middle">
                        <thead>
                            <tr className="text-warning">
                                <th>ID</th>
                                <th>Fecha</th>
                                <th>Cliente</th>
                                <th>Total</th>
                                <th>Estado</th>
                                <th className="text-end">Gestionar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.id}>
                                    <td className="fw-bold">#{order.id}</td>
                                    <td className="text-muted">{new Date(order.fecha).toLocaleDateString()}</td>
                                    <td>{order.usuario ? order.usuario.nombre : 'Anónimo'}</td>
                                    <td className="text-success fw-bold">{formatPrice(order.total)}</td>
                                    <td>
                                        <span className={`badge ${
                                            order.estado === 'COMPLETADO' ? 'bg-success' : 
                                            order.estado === 'PENDIENTE' ? 'bg-warning text-dark' : 'bg-secondary'
                                        }`}>
                                            {order.estado}
                                        </span>
                                    </td>
                                    <td className="text-end">
                                        {order.estado === 'PENDIENTE' && (
                                            <button 
                                                className="btn btn-sm btn-success me-2"
                                                onClick={() => handleStatusChange(order.id, 'COMPLETADO')}
                                            >
                                                <i className="fas fa-check"></i> Aprobar
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {orders.length === 0 && (
                                <tr><td colSpan="6" className="text-center py-4">No hay órdenes registradas.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminOrders;