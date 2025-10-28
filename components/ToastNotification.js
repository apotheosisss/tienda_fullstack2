// --- START OF FILE src/components/ToastNotification.js ---
import React from 'react';

const ToastNotification = ({ message, show, type = 'success' }) => {
    // Determina el color del ícono y el borde según el tipo
    const iconClass = type === 'success' ? 'fa-check-circle text-success' : 'fa-exclamation-circle text-danger';
    const borderClass = type === 'success' ? 'border-success' : 'border-danger';

    return (
        <>
            <style>
                {`
                .toast-container {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    z-index: 1090; /* Asegura que esté sobre otros elementos */
                }
                .custom-toast {
                    width: 350px;
                    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
                    opacity: 0;
                    transform: translateY(20px);
                }
                .custom-toast.show {
                    opacity: 1;
                    transform: translateY(0);
                }
                `}
            </style>
            <div className="toast-container">
                <div 
                    className={`toast custom-toast shadow-lg ${show ? 'show' : ''} ${borderClass}`} 
                    role="alert" 
                    aria-live="assertive" 
                    aria-atomic="true"
                    style={{ borderLeftWidth: '5px' }}
                >
                    <div className="toast-body d-flex align-items-center p-3">
                        <i className={`fas ${iconClass} fa-2x me-3`}></i>
                        <strong className="me-auto">{message}</strong>
                        <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ToastNotification;
// --- END OF FILE src/components/ToastNotification.js ---