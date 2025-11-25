import React, { useState, useEffect } from 'react';
import formatPrice from '../utils/formatPrice.js';
import { REGIONES_COMUNAS_CHILE, createOrder } from '../services/DataService.js';
import { calculateDiscountedPrice } from '../utils/priceHelper.js';

const CheckoutPage = ({ cartItems, setCartItems, navigate, userSession }) => {
    const [step, setStep] = useState(1); 
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', phone: '',
        region: '', commune: '', street: '', department: '',
        paymentMethod: 'credit'
    });
    const [communes, setCommunes] = useState([]);

    // CÁLCULO CON DESCUENTO
    const total = cartItems.reduce((sum, item) => {
        const price = calculateDiscountedPrice(item.precio, item.descuento);
        return sum + (price * item.quantity);
    }, 0);

    useEffect(() => {
        if (userSession) {
            setFormData(prev => ({ ...prev, firstName: userSession.name || '', email: userSession.email || '' }));
        }
    }, [userSession]);

    const handleRegionChange = (e) => {
        const selectedRegion = e.target.value;
        const regionData = REGIONES_COMUNAS_CHILE.find(r => r.region === selectedRegion);
        setCommunes(regionData ? regionData.communes : []);
        setFormData({ ...formData, region: selectedRegion, commune: '' });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (step === 1) {
            setStep(2);
        } else {
            if (!userSession || !userSession.id) {
                alert("Debes iniciar sesión para confirmar la compra.");
                navigate('login');
                return;
            }

            const orderPayload = {
                usuarioId: userSession.id,
                total: total,
                items: cartItems.map(item => ({
                    productoId: item.id,
                    cantidad: item.quantity
                }))
            };

            const result = await createOrder(orderPayload);

            if (result) {
                alert("¡Compra Exitosa! Tu orden ha sido registrada.");
                setCartItems([]); 
                navigate('home');
            } else {
                alert("Hubo un problema al procesar la orden. Revisa el stock.");
            }
        }
    };

    if (cartItems.length === 0) return <div className="container my-5 text-white text-center"><h2>Carrito vacío</h2></div>;

    return (
        <div className="container my-5">
            <h2 className="mb-4 text-center cyber-font text-white">Finalizar Compra</h2>
            <div className="row g-5">
                <div className="col-md-5 col-lg-4 order-md-last">
                    <div className="card border-info shadow-lg bg-transparent">
                        <div className="card-body text-white">
                            <h4 className="d-flex justify-content-between align-items-center mb-3">
                                <span className="text-info cyber-font">Tu Carrito</span>
                                <span className="badge bg-primary rounded-pill">{cartItems.length}</span>
                            </h4>
                            <ul className="list-group mb-3 list-group-flush">
                                {cartItems.map((item) => {
                                    const finalPrice = calculateDiscountedPrice(item.precio, item.descuento);
                                    return (
                                        <li key={item.id} className="list-group-item d-flex justify-content-between lh-sm bg-transparent text-white border-secondary">
                                            <div>
                                                <h6 className="my-0 text-white">{item.nombre}</h6>
                                                <small className="text-muted">Cant: {item.quantity}</small>
                                            </div>
                                            <span className="text-success">{formatPrice(finalPrice * item.quantity)}</span>
                                        </li>
                                    );
                                })}
                                <li className="list-group-item d-flex justify-content-between bg-transparent text-white border-top border-info mt-2">
                                    <span>Total (CLP)</span>
                                    <strong className="text-info fs-5">{formatPrice(total)}</strong>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div className="col-md-7 col-lg-8">
                    <div className="card border-secondary shadow-lg bg-transparent">
                        <div className="card-body p-4">
                            <h4 className="mb-3 text-white cyber-font">{step === 1 ? 'Datos de Envío' : 'Pago'}</h4>
                            <form onSubmit={handleSubmit}>
                                {step === 1 ? (
                                    <div className="row g-3">
                                        <div className="col-sm-6">
                                            <label className="form-label text-white">Nombre</label>
                                            <input type="text" className="form-control" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
                                        </div>
                                        <div className="col-sm-6">
                                            <label className="form-label text-white">Apellido</label>
                                            <input type="text" className="form-control" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label text-white">Email</label>
                                            <input type="email" className="form-control" name="email" value={formData.email} onChange={handleInputChange} required />
                                        </div>
                                        
                                        <div className="col-md-6">
                                            <label className="form-label text-white">Región</label>
                                            <select className="form-select" name="region" value={formData.region} onChange={handleRegionChange} required>
                                                <option value="" className="bg-dark">Seleccionar...</option>
                                                {REGIONES_COMUNAS_CHILE.map((r, i) => <option key={i} value={r.region} className="bg-dark">{r.region}</option>)}
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label text-white">Comuna</label>
                                            <select className="form-select" name="commune" value={formData.commune} onChange={handleInputChange} required disabled={!formData.region}>
                                                <option value="" className="bg-dark">Seleccionar...</option>
                                                {communes.map((c, i) => <option key={i} value={c} className="bg-dark">{c}</option>)}
                                            </select>
                                        </div>

                                        <div className="col-12">
                                            <label className="form-label text-white">Dirección</label>
                                            <input type="text" className="form-control" name="street" value={formData.street} onChange={handleInputChange} required />
                                        </div>
                                        
                                        <button className="btn btn-info w-100 btn-lg mt-4 fw-bold" type="submit">Continuar</button>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="alert alert-info bg-transparent border-info text-info mb-4">
                                            <i className="fas fa-lock me-2"></i> Ambiente seguro WebPay
                                        </div>
                                        <button className="btn btn-success w-100 btn-lg mt-3 cyber-font" type="submit">
                                            CONFIRMAR PAGO {formatPrice(total)}
                                        </button>
                                        <button className="btn btn-outline-secondary w-100 mt-2" type="button" onClick={() => setStep(1)}>Volver</button>
                                    </div>
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