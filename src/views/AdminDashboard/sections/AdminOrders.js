import React, { useState, useEffect } from 'react';
import { getOrders, updateOrderStatus } from '../../../services/DataService.js';
import formatPrice from '../../../utils/formatPrice.js';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const loadOrders = async () => {
            const data = await getOrders();
            setOrders(data);
        };
        loadOrders();
    }, []);

    const handleStatusChange = async (id, newStatus) => {
        await updateOrderStatus(id, newStatus);
        const data = await getOrders();
        setOrders(data);
    };

    return (
        <div>
            <h2 className="mb-4 cyber-font text-white">Órdenes</h2>
            <div className="card border-0 shadow">
                <div className="table-responsive">
                    {/* AGREGADO: table-dark */}
                    <table className="table table-dark table-hover mb-0 align-middle text-white">
                        <thead>
                            <tr className="text-warning" style={{ borderBottom: '1px solid #facc15' }}>
                                <th>ID</th>
                                <th>Fecha</th>
                                <th>Cliente</th>
                                <th>Total</th>
                                <th>Estado</th>
                                <th className="text-end">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.id} style={{ borderBottom: '1px solid #334155' }}>
                                    <td className="text-white">#{order.id}</td>
                                    <td className="text-secondary">{new Date(order.fecha).toLocaleDateString()}</td>
                                    <td className="text-white">{order.usuario ? order.usuario.nombre : 'Anon'}</td>
                                    <td className="text-success fw-bold">{formatPrice(order.total)}</td>
                                    <td><span className="badge bg-secondary">{order.estado}</span></td>
                                    <td className="text-end">
                                        {order.estado === 'PENDIENTE' && (
                                            <button className="btn btn-sm btn-success" onClick={() => handleStatusChange(order.id, 'COMPLETADO')}>
                                                <i className="fas fa-check"></i>
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminOrders;