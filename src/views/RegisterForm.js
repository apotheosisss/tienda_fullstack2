import React, { useState } from 'react';

const RegisterForm = ({ navigate, handleRegister }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!name || !email || !password) {
            setError('Todos los campos son obligatorios.');
            return;
        }

        setLoading(true);
        const isRegistered = await handleRegister(name, email, password);
        setLoading(false);

        if (isRegistered) {
            setSuccess('Registro exitoso. Redirigiendo al login...');
            setTimeout(() => {
                navigate('login');
            }, 2000);
        } else {
            setError('Error al registrar. Puede que el correo ya esté en uso.');
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center my-5">
            <div className="card shadow-lg p-4" style={{ maxWidth: '450px', width: '100%' }}>
                <h2 className="card-title text-center text-primary mb-4">Crear Cuenta</h2>
                <form onSubmit={handleSubmit}>
                    {error && <div className="alert alert-danger text-center">{error}</div>}
                    {success && <div className="alert alert-success text-center">{success}</div>}

                    <div className="mb-3">
                        <label className="form-label">Nombre Completo:</label>
                        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email:</label>
                        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Contraseña:</label>
                        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    
                    <button type="submit" className="btn btn-success w-100 btn-lg mb-3" disabled={loading}>
                        {loading ? 'Registrando...' : 'Registrarse'}
                    </button>
                    <p className="text-center">
                        ¿Ya tienes cuenta? <button type="button" className="btn btn-link p-0" onClick={() => navigate('login')}>Inicia Sesión</button>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;