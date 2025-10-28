import React, { useState } from 'react';

// --- RegisterForm View ---
const RegisterForm = ({ navigate, handleRegister }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!name || !email || !password) {
            setError('Todos los campos son obligatorios.');
            return;
        }

        // Validación simple de contraseña
        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres.');
            return;
        }

        const result = handleRegister(name, email, password);
        
        if (result) {
            setSuccess('Registro exitoso. Ahora puedes iniciar sesión.');
            setName('');
            setEmail('');
            setPassword('');
            setTimeout(() => navigate('login'), 2000);
        } else {
            setError('El email ya está registrado.');
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center my-5">
            <div className="card shadow-lg p-4" style={{ maxWidth: '450px', width: '100%' }}>
                <h2 className="card-title text-center text-success mb-4">Crear Cuenta</h2>
                <form onSubmit={handleSubmit}>
                    {error && <div className="alert alert-danger text-center">{error}</div>}
                    {success && <div className="alert alert-success text-center">{success}</div>}
                    
                    <div className="mb-3">
                        <label htmlFor="registerName" className="form-label">Nombre:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="registerName"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="registerEmail" className="form-label">Email:</label>
                        <input
                            type="email"
                            className="form-control"
                            id="registerEmail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="registerPassword" className="form-label">Contraseña:</label>
                        <input
                            type="password"
                            className="form-control"
                            id="registerPassword"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 btn-lg mb-3">
                        Registrarme
                    </button>
                    <p className="text-center">
                        ¿Ya tienes cuenta? <button type="button" className="btn btn-link p-0" onClick={() => navigate('login')}>Inicia sesión</button>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;