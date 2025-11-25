import React, { useState, useEffect } from 'react';
import { updateUserProfile } from '../../../services/DataService.js';

const AdminProfile = () => {
    const [user, setUser] = useState({ nombre: '', email: '', password: '' });
    
    useEffect(() => {
        // Cargamos la sesión actual del localStorage
        const session = JSON.parse(localStorage.getItem('USER_SESSION'));
        if (session) {
            setUser({ 
                nombre: session.name || session.nombre, 
                email: session.email, 
                password: '' // Por seguridad empieza vacía
            }); 
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await updateUserProfile(user.email, { 
            name: user.nombre, // Guardamos como 'name' para consistencia frontend
            password: user.password 
        });
        
        if (success) {
            alert("Perfil actualizado correctamente. Por favor reinicia sesión.");
            localStorage.removeItem('token');
            localStorage.removeItem('USER_SESSION');
            window.location.href = '/login';
        } else {
            alert("No se pudo actualizar el perfil.");
        }
    };

    return (
        <div className="container">
            <h2 className="mb-4 text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>Mi Perfil</h2>
            <div className="card bg-dark text-white border-secondary shadow p-4" style={{ maxWidth: '600px' }}>
                <div className="d-flex align-items-center mb-4">
                    <div className="rounded-circle d-flex justify-content-center align-items-center text-white me-4 border border-info shadow" 
                         style={{ width: '80px', height: '80px', fontSize: '2rem', background: '#0f172a' }}>
                        <i className="fas fa-user-astronaut text-info"></i>
                    </div>
                    <div>
                        <h3 className="mb-0 text-white">{user.nombre || 'Administrador'}</h3>
                        <p className="text-info mb-0">{user.email}</p>
                        <span className="badge bg-primary mt-1">Rol: Super Admin</span>
                    </div>
                </div>
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label text-secondary">Nombre Mostrado</label>
                        <input 
                            type="text" 
                            className="form-control bg-dark text-white border-secondary" 
                            value={user.nombre}
                            onChange={e => setUser({...user, nombre: e.target.value})}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label text-secondary">Correo Electrónico</label>
                        <input 
                            type="email" 
                            className="form-control bg-dark text-secondary border-secondary" 
                            value={user.email} 
                            disabled 
                            title="El correo no se puede cambiar"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label text-secondary">Nueva Contraseña</label>
                        <input 
                            type="password" 
                            className="form-control bg-dark text-white border-secondary" 
                            placeholder="Dejar en blanco para mantener la actual" 
                            value={user.password}
                            onChange={e => setUser({...user, password: e.target.value})}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mt-3">
                        <i className="fas fa-save me-2"></i> Guardar Cambios
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminProfile;