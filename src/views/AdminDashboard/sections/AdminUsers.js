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
            <h2 className="mb-4 cyber-font text-white">Usuarios</h2>
            <div className="card border-0 shadow">
                <div className="table-responsive">
                    {/* AGREGADO: table-dark */}
                    <table className="table table-dark table-hover mb-0 align-middle text-white">
                        <thead>
                            <tr className="text-info" style={{ borderBottom: '1px solid #00f3ff' }}>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Rol</th>
                                <th className="text-end">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id} style={{ borderBottom: '1px solid #334155' }}>
                                    <td className="text-secondary">#{user.id}</td>
                                    <td className="text-white">{user.nombre}</td>
                                    <td className="text-secondary">{user.email}</td>
                                    <td>
                                        <span className={`badge ${user.rol === 'ADMIN' ? 'bg-danger' : 'bg-primary'}`}>
                                            {user.rol}
                                        </span>
                                    </td>
                                    <td className="text-end">
                                        <button className="btn btn-sm btn-outline-light"><i className="fas fa-eye"></i></button>
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

export default AdminUsers;