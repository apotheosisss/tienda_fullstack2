import React, { useState, useEffect } from 'react';
import formatPrice from '../utils/formatPrice.js';
import { REGIONES_COMUNAS_CHILE, getUserProfile, updateUserProfile } from '../services/DataService.js';

const CheckoutPage = ({ cartItems, setCartItems, navigate, userSession }) => {
    const [step, setStep] = useState(1); 
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', phone: '',
        region: '', commune: '', street: '', department: '',
        paymentMethod: 'credit'
    });

    // CORRECCIÓN: 'precio'
    const total = cartItems.reduce((sum, item) => sum + (item.precio || 0) * item.quantity, 0);

    useEffect(() => {
        if (userSession && userSession.email) {
            loadUserProfile(userSession.email);
        }
    }, [userSession]);

    const loadUserProfile = async (email) => {
        const profile = await getUserProfile(email);
        if (profile) {
            setFormData(prev => ({
                ...prev,
                firstName: profile.firstName || '',
                lastName: profile.lastName || '',
                email: profile.email || '',
                street: profile.street || '',
                region: profile.region || '',
                commune: profile.commune || ''
            }));
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (step === 1) {
            if (userSession) {
                await updateUserProfile(userSession.email, formData);
            }
            setStep(2);
        } else {
            alert("¡Compra realizada con éxito! Gracias por preferir TechStore.");
            setCartItems([]); 
            navigate('home');
        }
    };

    // ... (El resto del JSX de formulario se mantiene, solo cambia los estilos a Dark Mode) ...
    
    return (
        <div className="container my-5 text-white">
            <h2 className="mb-4 text-center fw-bold">Finalizar Compra</h2>
            <div className="row g-5">
                <div className="col-md-5 col-lg-4 order-md-last">
                    <div className="card border-0 shadow-sm" style={{ background: '#1e293b' }}>
                        <div className="card-body">
                            <h4 className="d-flex justify-content-between align-items-center mb-3">
                                <span className="text-primary">Tu Carrito</span>
                                <span className="badge bg-primary rounded-pill">{cartItems.length}</span>
                            </h4>
                            <ul className="list-group mb-3 list-group-flush">
                                {cartItems.map((item) => (
                                    <li key={item.id} className="list-group-item d-flex justify-content-between lh-sm" style={{ background: 'transparent', color: 'white' }}>
                                        <div>
                                            {/* CORRECCIÓN: nombre */}
                                            <h6 className="my-0">{item.nombre}</h6>
                                            <small className="text-secondary">Cant: {item.quantity}</small>
                                        </div>
                                        {/* CORRECCIÓN: precio */}
                                        <span className="text-info">{formatPrice((item.precio || 0) * item.quantity)}</span>
                                    </li>
                                ))}
                                <li className="list-group-item d-flex justify-content-between" style={{ background: 'transparent', color: 'white', fontWeight: 'bold' }}>
                                    <span>Total (CLP)</span>
                                    <strong>{formatPrice(total)}</strong>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div className="col-md-7 col-lg-8">
                    <div className="card border-0 shadow-sm" style={{ background: '#0f172a', border: '1px solid #334155' }}>
                        <div className="card-body p-4">
                            <h4 className="mb-3 text-primary">{step === 1 ? 'Datos de Envío' : 'Método de Pago'}</h4>
                            <form onSubmit={handleSubmit}>
                                {step === 1 ? (
                                    <>
                                        {/* Campos de Formulario (Nombre, Región, etc.) */}
                                        {/* Asegúrate de poner className="form-control bg-dark text-white border-secondary" en los inputs */}
                                        <div className="row g-3">
                                            <div className="col-sm-6">
                                                <label className="form-label">Nombre</label>
                                                <input type="text" className="form-control bg-dark text-white border-secondary" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
                                            </div>
                                            <div className="col-sm-6">
                                                <label className="form-label">Apellido</label>
                                                <input type="text" className="form-control bg-dark text-white border-secondary" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
                                            </div>
                                            <div className="col-12">
                                                <label className="form-label">Email</label>
                                                <input type="email" className="form-control bg-dark text-white border-secondary" name="email" value={formData.email} onChange={handleInputChange} required />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Región</label>
                                                <select className="form-select bg-dark text-white border-secondary" name="region" value={formData.region} onChange={handleInputChange} required>
                                                    <option value="">Seleccionar...</option>
                                                    {REGIONES_COMUNAS_CHILE.map((r, i) => <option key={i} value={r.region}>{r.region}</option>)}
                                                </select>
                                            </div>
                                            {/* ... Más campos ... */}
                                        </div>
                                        <button className="btn btn-primary w-100 btn-lg mt-4" type="submit">Continuar al Pago</button>
                                    </>
                                ) : (
                                    <>
                                        <div className="my-3">
                                            <div className="form-check">
                                                <input id="credit" name="paymentMethod" type="radio" className="form-check-input" defaultChecked />
                                                <label className="form-check-label" htmlFor="credit">Tarjeta de Crédito (WebPay)</label>
                                            </div>
                                            <div className="form-check">
                                                <input id="debit" name="paymentMethod" type="radio" className="form-check-input" />
                                                <label className="form-check-label" htmlFor="debit">Tarjeta de Débito</label>
                                            </div>
                                        </div>
                                        <button className="btn btn-success w-100 btn-lg mt-4" type="submit">Pagar {formatPrice(total)}</button>
                                        <button className="btn btn-outline-secondary w-100 mt-2" type="button" onClick={() => setStep(1)}>Volver</button>
                                    </>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;