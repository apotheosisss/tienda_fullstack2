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

    return (
        <div>
            <h2 className="mb-4 cyber-font text-white">Reportes</h2>
            <div className="row mb-4">
                <div className="col-md-6">
                    <div className="card p-4 border-success">
                        <h5 className="text-white">Ingresos Totales</h5>
                        <h2 className="text-success fw-bold">{formatPrice(totalSales)}</h2>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card p-4 border-info">
                        <h5 className="text-white">Total Transacciones</h5>
                        <h2 className="text-info fw-bold">{orders.length}</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminReports;