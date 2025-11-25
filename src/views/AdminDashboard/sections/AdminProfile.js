import React, { useState, useEffect } from 'react';
import { updateUserProfile } from '../../../services/DataService.js';

const AdminProfile = () => {
    const [user, setUser] = useState({ nombre: '', email: '', password: '' });
    
    useEffect(() => {
        const session = JSON.parse(localStorage.getItem('USER_SESSION'));
        if (session) setUser({ ...session, password: '' });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await updateUserProfile(user.email, { name: user.nombre, password: user.password });
        if (success) alert("Perfil actualizado.");
    };

    return (
        <div className="container">
            <h2 className="mb-4 cyber-font text-white">Perfil Admin</h2>
            <div className="card p-4 shadow" style={{ maxWidth: '600px' }}>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label text-white">Nombre</label>
                        <input type="text" className="form-control" value={user.nombre} onChange={e => setUser({...user, nombre: e.target.value})} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label text-white">Email</label>
                        <input type="email" className="form-control" value={user.email} disabled />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Actualizar</button>
                </form>
            </div>
        </div>
    );
};

export default AdminProfile;