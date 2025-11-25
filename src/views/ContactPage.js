import React, { useState } from 'react';

const ContactPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("¡Mensaje enviado! Nos pondremos en contacto contigo pronto.");
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="container my-5">
            <h2 className="text-center mb-5 text-white cyber-font">Contáctanos</h2>
            
            <div className="row g-5">
                {/* Información de Contacto */}
                <div className="col-md-5">
                    <div className="card h-100 border-0 shadow-lg bg-transparent">
                        <div className="card-body text-white">
                            <h4 className="mb-4 text-info cyber-font">Información</h4>
                            
                            <div className="mb-4 d-flex align-items-start">
                                <i className="fas fa-map-marker-alt fa-2x text-info me-3"></i>
                                <div>
                                    <h5 className="fw-bold mb-1 text-white">Ubicación</h5>
                                    <p className="text-secondary mb-0">Av. Siempre Viva 742, Santiago, Chile</p>
                                </div>
                            </div>

                            <div className="mb-4 d-flex align-items-start">
                                <i className="fas fa-phone fa-2x text-info me-3"></i>
                                <div>
                                    <h5 className="fw-bold mb-1 text-white">Teléfono</h5>
                                    <p className="text-secondary mb-0">+56 9 1234 5678</p>
                                </div>
                            </div>

                            <div className="mb-4 d-flex align-items-start">
                                <i className="fas fa-envelope fa-2x text-info me-3"></i>
                                <div>
                                    <h5 className="fw-bold mb-1 text-white">Email</h5>
                                    <p className="text-secondary mb-0">contacto@techstore.cl</p>
                                </div>
                            </div>

                            <hr className="border-secondary my-4" />

                            <h5 className="text-info cyber-font mb-3">Síguenos</h5>
                            <div className="d-flex gap-3">
                                <button className="btn btn-outline-light rounded-circle" style={{ width: '45px', height: '45px' }}>
                                    <i className="fab fa-facebook-f"></i>
                                </button>
                                <button className="btn btn-outline-light rounded-circle" style={{ width: '45px', height: '45px' }}>
                                    <i className="fab fa-twitter"></i>
                                </button>
                                <button className="btn btn-outline-light rounded-circle" style={{ width: '45px', height: '45px' }}>
                                    <i className="fab fa-instagram"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Formulario */}
                <div className="col-md-7">
                    <div className="card border-info shadow-lg bg-transparent">
                        <div className="card-body p-4">
                            <h4 className="mb-4 text-white cyber-font">Envíanos un Mensaje</h4>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label text-white">Nombre Completo</label>
                                    <input 
                                        type="text" 
                                        className="form-control text-white" 
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        required 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label text-white">Correo Electrónico</label>
                                    <input 
                                        type="email" 
                                        className="form-control text-white" 
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        required 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label text-white">Mensaje</label>
                                    <textarea 
                                        className="form-control text-white" 
                                        rows="5" 
                                        value={formData.message}
                                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                                        required
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn btn-info w-100 fw-bold shadow">
                                    <i className="fas fa-paper-plane me-2"></i> ENVIAR MENSAJE
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;