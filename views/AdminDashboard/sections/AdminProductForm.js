import React, { useState } from 'react';

const AdminProductForm = ({ product, categories, onSave, onCancel }) => {
    // ¡MODIFICADO! Ahora usa 'discountPercentage' en lugar de 'onOffer'
    const initialFormState = product || { name: '', price: 0, category: categories[0], stock: 0, imageUrl: 'https://placehold.co/400x200/94A3B8/FFFFFF?text=Imagen', description: '', discountPercentage: 0 };
    const [form, setForm] = useState(initialFormState);
    
    const handleChange = (e) => {
        const { name, value, type } = e.target;
        // Aseguramos que los valores numéricos se guarden como números
        const val = type === 'number' ? parseInt(value, 10) || 0 : value;
        setForm(prev => ({ ...prev, [name]: val }));
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(form);
    };
    
    return (
        <div className="card shadow-lg mb-5">
            <div className="card-header bg-primary text-white">
                <h4 className="mb-0">{product ? 'Editar Producto' : 'Crear Nuevo Producto'}</h4>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="name" className="form-label">Nombre</label>
                            <input type="text" id="name" name="name" className="form-control" value={form.name} onChange={handleChange} required />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="category" className="form-label">Categoría</label>
                            <select id="category" name="category" className="form-select" value={form.category} onChange={handleChange} required>
                                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="price" className="form-label">Precio</label>
                            <input type="number" id="price" name="price" className="form-control" value={form.price} onChange={handleChange} required min="0" />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="stock" className="form-label">Stock</label>
                            <input type="number" id="stock" name="stock" className="form-control" value={form.stock} onChange={handleChange} required min="0" />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="imageUrl" className="form-label">URL Imagen (Mock)</label>
                            <input type="url" id="imageUrl" name="imageUrl" className="form-control" value={form.imageUrl} onChange={handleChange} />
                        </div>

                        {/* ¡CAMPO MODIFICADO! De Switch a Input numérico para el descuento */}
                        <div className="col-md-12 mb-3">
                            <label htmlFor="discountPercentage" className="form-label fw-bold text-danger">Porcentaje de Descuento (%)</label>
                            <input 
                                type="number" 
                                id="discountPercentage"
                                name="discountPercentage" 
                                className="form-control" 
                                value={form.discountPercentage} 
                                onChange={handleChange} 
                                min="0" 
                                max="99"
                                placeholder="Ej: 25"
                            />
                            <div className="form-text">
                                Ingresa un número entre 0 y 99. Si es 0, el producto no estará en oferta.
                            </div>
                        </div>

                        <div className="col-12 mb-4">
                            <label className="form-label">Descripción</label>
                            <textarea name="description" className="form-control" rows="3" value={form.description} onChange={handleChange}></textarea>
                        </div>
                    </div>
                    <div className="d-flex justify-content-end">
                        <button type="button" className="btn btn-secondary me-2" onClick={onCancel}>Cancelar</button>
                        <button type="submit" className="btn btn-success">
                            <i className="fas fa-save me-2"></i> Guardar Producto
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminProductForm;