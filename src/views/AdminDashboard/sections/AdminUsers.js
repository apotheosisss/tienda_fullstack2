import React, { useState, useEffect } from 'react';
import { getUsers } from '../../../services/DataService.js';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const data = await getUsers();
            setUsers(data);
        };
        fetchUsers();
    }, []);

    return (
        <div>
            <h2 className="mb-4 text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>Gestión de Usuarios</h2>
            <div className="card bg-dark border-0 shadow">
                <div className="table-responsive">
                    <table className="table table-dark table-hover mb-0 align-middle">
                        <thead>
                            <tr className="text-info">
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Rol</th>
                                <th className="text-end">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td className="text-muted">#{user.id}</td>
                                    <td className="fw-bold text-white">{user.nombre}</td>
                                    <td className="text-secondary">{user.email}</td>
                                    <td>
                                        <span className={`badge ${user.rol === 'ADMIN' ? 'bg-danger' : 'bg-primary'}`}>
                                            {user.rol}
                                        </span>
                                    </td>
                                    <td className="text-end">
                                        <button className="btn btn-sm btn-outline-light" title="Ver Detalle">
                                            <i className="fas fa-eye"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {users.length === 0 && (
                                <tr><td colSpan="5" className="text-center py-4 text-muted">No hay usuarios registrados.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminUsers;