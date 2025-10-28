// --- START OF FILE src/views/ContactPage.js ---
import React from 'react';

const ContactPage = () => {
    return (
        <div className="container my-5">
            <h1 className="text-center text-primary mb-5">Contáctanos</h1>
            <div className="row g-4">
                {/* Tarjeta de Información General */}
                <div className="col-lg-6">
                    <div className="card h-100 shadow border-primary">
                        <div className="card-body text-center p-4">
                            <i className="fas fa-store fa-3x text-primary mb-3"></i>
                            <h4 className="card-title">ElectroPlus</h4>
                            <p className="card-text text-muted">
                                Tu tienda de confianza para los mejores productos electrónicos. Estamos aquí para ayudarte con cualquier consulta que tengas.
                            </p>
                            <hr />
                            <h5 className="mt-4">Horario de Atención</h5>
                            <p className="mb-0">Lunes a Viernes: 9:00 AM - 6:00 PM</p>
                            <p>Sábados: 10:00 AM - 2:00 PM</p>
                        </div>
                    </div>
                </div>

                {/* Tarjeta con Detalles de Contacto */}
                <div className="col-lg-6">
                    <div className="card h-100 shadow border-secondary">
                        <div className="card-body p-4">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item d-flex align-items-center border-0">
                                    <i className="fas fa-map-marker-alt fa-2x text-secondary me-3"></i>
                                    <div>
                                        <strong>Dirección:</strong><br />
                                        Av. Siempre Viva 742, Santiago, Chile
                                    </div>
                                </li>
                                <li className="list-group-item d-flex align-items-center border-0">
                                    <i className="fas fa-phone-alt fa-2x text-secondary me-3"></i>
                                    <div>
                                        <strong>Teléfono:</strong><br />
                                        <a href="tel:+56212345678">+56 2 1234 5678</a>
                                    </div>
                                </li>
                                <li className="list-group-item d-flex align-items-center border-0">
                                    <i className="fas fa-envelope fa-2x text-secondary me-3"></i>
                                    <div>
                                        <strong>Email:</strong><br />
                                        <a href="mailto:contacto@electroplus.cl">contacto@electroplus.cl</a>
                                    </div>
                                </li>
                                <li className="list-group-item d-flex align-items-center border-0">
                                    <i className="fab fa-whatsapp fa-2x text-secondary me-3"></i>
                                    <div>
                                        <strong>WhatsApp:</strong><br />
                                        <a href="https://wa.me/56912345678" target="_blank" rel="noopener noreferrer">+56 9 1234 5678</a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
// --- END OF FILE src/views/ContactPage.js ---