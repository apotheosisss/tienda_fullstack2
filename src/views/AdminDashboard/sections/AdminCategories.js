import React, { useState } from 'react';

const AdminCategories = () => {
    // Estado inicial simulado (podría venir de BD en el futuro)
    const [categories, setCategories] = useState(['Laptops', 'TVs', 'Audio', 'Monitores', 'Accesorios']);
    const [newCat, setNewCat] = useState('');

    const handleAdd = (e) => {
        e.preventDefault();
        if (newCat.trim()) {
            setCategories([...categories, newCat.trim()]);
            setNewCat('');
        }
    };

    const handleDelete = (cat) => {
        if (window.confirm(`¿Eliminar categoría ${cat}?`)) {
            setCategories(categories.filter(c => c !== cat));
        }
    };

    return (
        <div>
            <h2 className="text-white mb-4" style={{ fontFamily: 'Orbitron' }}>Gestión de Categorías</h2>
            
            <div className="row">
                <div className="col-md-4">
                    <div className="card bg-dark border-secondary text-white p-3 mb-4 shadow">
                        <h5>Nueva Categoría</h5>
                        <form onSubmit={handleAdd}>
                            <input 
                                type="text" 
                                className="form-control bg-dark text-white border-secondary mb-3" 
                                placeholder="Nombre de categoría"
                                value={newCat}
                                onChange={(e) => setNewCat(e.target.value)}
                            />
                            <button className="btn btn-primary w-100">
                                <i className="fas fa-plus me-2"></i> Agregar
                            </button>
                        </form>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="row g-3">
                        {categories.map((cat, index) => (
                            <div key={index} className="col-md-6">
                                <div className="card bg-dark border-info text-white p-3 d-flex flex-row justify-content-between align-items-center shadow-sm">
                                    <span className="fw-bold">{cat}</span>
                                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(cat)}>
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminCategories;