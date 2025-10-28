// --- START OF FILE src/views/ProfilePage.js ---
import React, { useState, useEffect, useMemo } from 'react';
import { REGIONES_COMUNAS_CHILE, getUserProfile, updateUserProfile } from '../services/DataService.js';

const ProfilePage = ({ userSession, navigate }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: userSession?.email || '',
        street: '',
        department: '',
        region: '',
        commune: '',
        additionalInfo: ''
    });
    const [successMessage, setSuccessMessage] = useState('');

    // Cargar los datos del perfil del usuario cuando el componente se monta
    useEffect(() => {
        if (userSession?.email) {
            const userProfile = getUserProfile(userSession.email);
            if (userProfile) {
                // Rellenamos el formulario con los datos guardados del usuario
                setFormData({
                    firstName: userProfile.firstName || '',
                    lastName: userProfile.lastName || '',
                    email: userProfile.email,
                    street: userProfile.street || '',
                    department: userProfile.department || '',
                    region: userProfile.region || '',
                    commune: userProfile.commune || '',
                    additionalInfo: userProfile.additionalInfo || ''
                });
            }
        }
    }, [userSession]);

    // Lógica para el selector de comunas dependiente de la región
    const availableCommunes = useMemo(() => {
        return REGIONES_COMUNAS_CHILE.find(r => r.region === formData.region)?.communes || [];
    }, [formData.region]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updated = updateUserProfile(userSession.email, formData);
        if (updated) {
            setSuccessMessage('¡Tu perfil ha sido actualizado con éxito!');
            setTimeout(() => setSuccessMessage(''), 3000); // Ocultar mensaje después de 3 seg
        }
    };

    return (
        <div className="container my-5">
            <h1 className="text-center text-primary mb-4">Mi Perfil</h1>
            <p className="text-center text-muted mb-5">
                Aquí puedes actualizar tu información personal y tu dirección de entrega principal.
            </p>

            <div className="card shadow-lg">
                <div className="card-body p-4 p-md-5">
                    <form onSubmit={handleSubmit}>
                        {successMessage && <div className="alert alert-success">{successMessage}</div>}

                        <h4 className="mb-3 text-secondary">Información Personal</h4>
                        <div className="row g-3 mb-4">
                            <div className="col-md-6">
                                <label htmlFor="firstName" className="form-label">Nombre</label>
                                <input type="text" className="form-control" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="lastName" className="form-label">Apellidos</label>
                                <input type="text" className="form-control" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} />
                            </div>
                            <div className="col-12">
                                <label htmlFor="email" className="form-label">Correo</label>
                                <input type="email" className="form-control" id="email" name="email" value={formData.email} disabled readOnly />
                                <div className="form-text">Tu correo no se puede modificar.</div>
                            </div>
                        </div>

                        <hr />

                        <h4 className="my-3 text-secondary">Dirección de Entrega Principal</h4>
                        <div className="row g-3">
                            <div className="col-md-8">
                                <label htmlFor="street" className="form-label">Calle</label>
                                <input type="text" className="form-control" id="street" name="street" value={formData.street} onChange={handleChange} />
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="department" className="form-label">Departamento (Opcional)</label>
                                <input type="text" className="form-control" id="department" name="department" value={formData.department} onChange={handleChange} />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="region" className="form-label">Región</label>
                                <select className="form-select" id="region" name="region" value={formData.region} onChange={handleChange}>
                                    <option value="">Selecciona una región</option>
                                    {REGIONES_COMUNAS_CHILE.map(r => <option key={r.region} value={r.region}>{r.region}</option>)}
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="commune" className="form-label">Comuna</label>
                                <select className="form-select" id="commune" name="commune" value={formData.commune} onChange={handleChange} disabled={!formData.region}>
                                    <option value="">Selecciona una comuna</option>
                                    {availableCommunes.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                        </div>
                        
                        <div className="d-flex justify-content-end mt-4">
                            <button type="submit" className="btn btn-success btn-lg">
                                <i className="fas fa-save me-2"></i> Guardar Cambios
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
// --- END OF FILE src/views/ProfilePage.js ---```