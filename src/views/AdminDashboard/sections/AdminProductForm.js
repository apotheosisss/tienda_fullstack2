import React, { useState, useEffect } from 'react';

const AdminProductForm = ({ product, categories, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        id: null, nombre: '', categoria: '', precio: '', stock: '', descripcion: '', imageUrl: '',
        descuento: 0 
    });

    useEffect(() => {
        if (product) {
            setFormData({
                id: product.id,
                nombre: product.nombre || '',
                categoria: product.categoria || '',
                precio: product.precio || '',
                stock: product.stock || '',
                descripcion: product.descripcion || '',
                imageUrl: product.imageUrl || '',
                descuento: product.descuento || 0,
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...formData,
            precio: parseFloat(formData.precio),
            stock: parseInt(formData.stock, 10),
            descuento: parseInt(formData.descuento, 10) || 0
        });
    };

    return (
        <div className="card shadow mb-4">
            <div className="card-header bg-transparent border-bottom border-info">
                <h5 className="mb-0 text-info cyber-font">{product ? 'Editar Producto' : 'Nuevo Producto'}</h5>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label text-white">Nombre</label>
                            <input type="text" className="form-control" name="nombre" value={formData.nombre} onChange={handleChange} required />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label text-white">Categoría</label>
                            <select className="form-select" name="categoria" value={formData.categoria} onChange={handleChange} required>
                                <option value="">Seleccionar...</option>
                                {categories.map((cat, i) => <option key={i} value={cat}>{cat}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <label className="form-label text-white">Precio Original</label>
                            <input type="number" className="form-control" name="precio" value={formData.precio} onChange={handleChange} required />
                        </div>
                        
                        <div className="col-md-4 mb-3">
                            <label className="form-label text-warning">Descuento (%)</label>
                            <input 
                                type="number" 
                                className="form-control border-warning text-warning" 
                                name="descuento" 
                                value={formData.descuento} 
                                onChange={handleChange} 
                                min="0" 
                                max="99"
                            />
                        </div>

                        <div className="col-md-4 mb-3">
                            <label className="form-label text-white">Stock</label>
                            <input type="number" className="form-control" name="stock" value={formData.stock} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label text-white">URL Imagen</label>
                        <input type="text" className="form-control" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label text-white">Descripción</label>
                        <textarea className="form-control" name="descripcion" rows="3" value={formData.descripcion} onChange={handleChange}></textarea>
                    </div>

                    <div className="text-end">
                        <button type="button" className="btn btn-outline-secondary me-2" onClick={onCancel}>Cancelar</button>
                        <button type="submit" className="btn btn-info">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminProductForm;