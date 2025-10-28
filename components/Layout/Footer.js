import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-dark text-white p-4 text-center mt-auto">
            <div className="container">
                <p className="mb-0">&copy; {new Date().getFullYear()} ElectroPlus. Desarrollado con React, Bootstrap y la guía del ERS (DSY1104).</p>
                <p className="mb-0 text-muted"><small>Usuario Admin: admin@duoc.cl / password123. **La lista de usuarios y productos ahora incluye roles y se gestiona en el Dashboard.**</small></p>
            </div>
        </footer>
    );
};

export default Footer;
