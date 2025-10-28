// --- START OF FILE CheckoutPage.js ---
import React, { useState, useEffect, useMemo } from 'react';
import formatPrice from '../utils/formatPrice.js';
import { REGIONES_COMUNAS_CHILE } from '../services/DataService.js'; // Importamos la data
// Nota: REGIONES_COMUNAS_CHILE se definirá en DataService.js en el siguiente paso

const CheckoutPage = ({ cartItems, setCartItems, navigate, userSession }) => {
    // -----------------------------------------------------------
    // Estado para los datos del formulario
    // -----------------------------------------------------------
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: userSession?.email || '', // Precarga el email si el usuario está logueado
        street: '',
        department: '',
        region: '',
        commune: '',
        additionalInfo: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const [formSuccess, setFormSuccess] = useState('');

    // Pre-rellenar nombre y apellido si el usuario está logeado (si tu userSession los tuviera)
    // Para este ejemplo, solo precargaremos el email. Si userSession tuviera name, se podría hacer:
    // useEffect(() => {
    //     if (userSession) {
    //         setFormData(prev => ({
    //             ...prev,
    //             email: userSession.email,
    //             firstName: userSession.name.split(' ')[0] || '', // Asumiendo que 'name' es un string completo
    //             lastName: userSession.name.split(' ').slice(1).join(' ') || ''
    //         }));
    //     }
    // }, [userSession]);

    // Actualizar comunas cuando cambia la región seleccionada
    const availableCommunes = useMemo(() => {
        return REGIONES_COMUNAS_CHILE.find(r => r.region === formData.region)?.communes || [];
    }, [formData.region]);

    // -----------------------------------------------------------
    // Handlers
    // -----------------------------------------------------------
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Limpiar error específico al cambiar el campo
        if (formErrors[name]) {
            setFormErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.firstName) errors.firstName = 'El nombre es obligatorio.';
        if (!formData.lastName) errors.lastName = 'El apellido es obligatorio.';
        if (!formData.email) errors.email = 'El correo es obligatorio.';
        if (!formData.street) errors.street = 'La calle es obligatoria.';
        if (!formData.region) errors.region = 'La región es obligatoria.';
        if (!formData.commune) errors.commune = 'La comuna es obligatoria.';
        
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleConfirmPurchase = (e) => {
        e.preventDefault();
        setFormSuccess('');

        if (!validateForm()) {
            console.log('Formulario con errores:', formErrors);
            return;
        }

        // Simulación de procesamiento de la compra
        console.log('Datos de la compra:', {
            cartItems,
            customerInfo: formData,
            total: totalCartPrice
        });

        // Simular éxito
        setFormSuccess('¡Tu compra ha sido procesada con éxito!');
        setCartItems([]); // Vaciar carrito
        setTimeout(() => {
            navigate('home'); // Redirigir a home después de un tiempo
        }, 3000);
    };

    // -----------------------------------------------------------
    // Cálculos derivados del carrito (Memoization)
    // -----------------------------------------------------------
    const totalCartPrice = useMemo(() => 
        cartItems.reduce((total, item) => total + item.price * item.quantity, 0), 
        [cartItems]
    );

    // Si el carrito está vacío, no deberíamos estar en esta página
    if (cartItems.length === 0 && !formSuccess) {
        // Podríamos redirigir automáticamente o mostrar un mensaje
        return (
            <div className="container my-5 text-center">
                <div className="alert alert-warning">
                    Tu carrito está vacío. <button className="btn btn-warning ms-2" onClick={() => navigate('home')}>Ir a Home</button>
                </div>
            </div>
        );
    }

    return (
        <div className="container my-5">
            <h1 className="mb-4 text-center text-primary">Completar Compra</h1>
            
            {formSuccess && (
                <div className="alert alert-success text-center mb-4">
                    {formSuccess}
                </div>
            )}

            <form onSubmit={handleConfirmPurchase}>
                <div className="card shadow-lg mb-4">
                    <div className="card-header bg-primary text-white">
                        <h4 className="mb-0">Resumen del Pedido</h4>
                    </div>
                    <div className="card-body p-0">
                        <div className="table-responsive">
                            <table className="table table-striped mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th>Imagen</th>
                                        <th>Producto</th>
                                        <th>Precio</th>
                                        <th>Cantidad</th>
                                        <th>Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map(item => (
                                        <tr key={item.id}>
                                            <td>
                                                <img src={item.imageUrl} alt={item.name} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                                            </td>
                                            <td>{item.name}</td>
                                            <td>{formatPrice(item.price)}</td>
                                            <td>{item.quantity}</td>
                                            <td>{formatPrice(item.price * item.quantity)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot className="table-primary text-white">
                                    <tr>
                                        <td colSpan="4" className="text-end fw-bold">Total a pagar:</td>
                                        <td className="fw-bold">{formatPrice(totalCartPrice)}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="card shadow-lg mb-4">
                    <div className="card-header bg-secondary text-white">
                        <h4 className="mb-0">Información del Cliente</h4>
                    </div>
                    <div className="card-body">
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label htmlFor="firstName" className="form-label">Nombre <span className="text-danger">*</span></label>
                                <input 
                                    type="text" 
                                    className={`form-control ${formErrors.firstName ? 'is-invalid' : ''}`} 
                                    id="firstName" 
                                    name="firstName" 
                                    value={formData.firstName} 
                                    onChange={handleChange} 
                                    required 
                                />
                                {formErrors.firstName && <div className="invalid-feedback">{formErrors.firstName}</div>}
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="lastName" className="form-label">Apellidos <span className="text-danger">*</span></label>
                                <input 
                                    type="text" 
                                    className={`form-control ${formErrors.lastName ? 'is-invalid' : ''}`} 
                                    id="lastName" 
                                    name="lastName" 
                                    value={formData.lastName} 
                                    onChange={handleChange} 
                                    required 
                                />
                                {formErrors.lastName && <div className="invalid-feedback">{formErrors.lastName}</div>}
                            </div>
                            <div className="col-12">
                                <label htmlFor="email" className="form-label">Correo <span className="text-danger">*</span></label>
                                <input 
                                    type="email" 
                                    className={`form-control ${formErrors.email ? 'is-invalid' : ''}`} 
                                    id="email" 
                                    name="email" 
                                    value={formData.email} 
                                    onChange={handleChange} 
                                    required 
                                    disabled={!!userSession} // Deshabilitar si el usuario está logueado
                                />
                                {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
                                {!!userSession && <div className="form-text">Este campo se auto-completa al iniciar sesión.</div>}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card shadow-lg mb-4">
                    <div className="card-header bg-info text-white">
                        <h4 className="mb-0">Dirección de Entrega</h4>
                    </div>
                    <div className="card-body">
                        <div className="row g-3">
                            <div className="col-md-8">
                                <label htmlFor="street" className="form-label">Calle <span className="text-danger">*</span></label>
                                <input 
                                    type="text" 
                                    className={`form-control ${formErrors.street ? 'is-invalid' : ''}`} 
                                    id="street" 
                                    name="street" 
                                    value={formData.street} 
                                    onChange={handleChange} 
                                    required 
                                />
                                {formErrors.street && <div className="invalid-feedback">{formErrors.street}</div>}
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="department" className="form-label">Departamento (Opcional)</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="department" 
                                    name="department" 
                                    value={formData.department} 
                                    onChange={handleChange} 
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="region" className="form-label">Región <span className="text-danger">*</span></label>
                                <select 
                                    className={`form-select ${formErrors.region ? 'is-invalid' : ''}`} 
                                    id="region" 
                                    name="region" 
                                    value={formData.region} 
                                    onChange={handleChange} 
                                    required
                                >
                                    <option value="">Selecciona una región</option>
                                    {REGIONES_COMUNAS_CHILE.map(r => (
                                        <option key={r.region} value={r.region}>{r.region}</option>
                                    ))}
                                </select>
                                {formErrors.region && <div className="invalid-feedback">{formErrors.region}</div>}
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="commune" className="form-label">Comuna <span className="text-danger">*</span></label>
                                <select 
                                    className={`form-select ${formErrors.commune ? 'is-invalid' : ''}`} 
                                    id="commune" 
                                    name="commune" 
                                    value={formData.commune} 
                                    onChange={handleChange} 
                                    required
                                    disabled={!formData.region} // Deshabilitar hasta que se seleccione una región
                                >
                                    <option value="">Selecciona una comuna</option>
                                    {availableCommunes.map(c => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                                {formErrors.commune && <div className="invalid-feedback">{formErrors.commune}</div>}
                            </div>
                            <div className="col-12">
                                <label htmlFor="additionalInfo" className="form-label">Indicaciones adicionales (Ej: Entre calles, color del edificio, no tiene timbre)</label>
                                <textarea 
                                    className="form-control" 
                                    id="additionalInfo" 
                                    name="additionalInfo" 
                                    rows="3" 
                                    value={formData.additionalInfo} 
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-end mt-4">
                    <button type="button" className="btn btn-secondary btn-lg me-3" onClick={() => navigate('cart')}>
                        <i className="fas fa-arrow-left me-2"></i> Volver al Carrito
                    </button>
                    <button 
                        type="submit" 
                        className="btn btn-success btn-lg"
                        disabled={cartItems.length === 0}
                    >
                        <i className="fas fa-money-check-alt me-2"></i> Pagar ahora {formatPrice(totalCartPrice)}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CheckoutPage;
// --- END OF FILE CheckoutPage.js ---