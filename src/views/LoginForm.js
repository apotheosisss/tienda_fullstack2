import React, { useState } from 'react';

// --- LoginForm View ---
const LoginForm = ({ navigate, handleLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        
        if (!email || !password) {
            setError('Todos los campos son obligatorios.');
            return;
        }

        const session = handleLogin(email, password);
        
        if (session) {
            // Navega al dashboard si es admin, o a home si es cliente
            navigate(session.role === 'admin' ? 'admin-dashboard' : 'home');
        } else {
            setError('Credenciales inválidas. Intenta con admin@duoc.cl / password123');
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center my-5">
            <div className="card shadow-lg p-4" style={{ maxWidth: '450px', width: '100%' }}>
                <h2 className="card-title text-center text-primary mb-4">Iniciar Sesión</h2>
                <form onSubmit={handleSubmit}>
                    {error && <div className="alert alert-danger text-center">{error}</div>}
                    
                    <div className="mb-3">
                        <label htmlFor="loginEmail" className="form-label">Email:</label>
                        <input
                            type="email"
                            className="form-control"
                            id="loginEmail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="loginPassword" className="form-label">Contraseña:</label>
                        <input
                            type="password"
                            className="form-control"
                            id="loginPassword"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 btn-lg mb-3">
                        Entrar
                    </button>
                    <p className="text-center">
                        ¿No tienes cuenta? <button type="button" className="btn btn-link p-0" onClick={() => navigate('register')}>Regístrate aquí</button>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;