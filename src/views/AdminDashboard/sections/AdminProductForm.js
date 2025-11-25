import React, { useState, useEffect } from 'react';

const AdminProductForm = ({ product, categories, onSave, onCancel }) => {
    // 1. ALINEACIÓN CON BACKEND: Usamos nombre, categoria, descripcion
    const [formData, setFormData] = useState({
        id: null,
        nombre: '',       // Antes: name
        categoria: '',    // Antes: category
        precio: '',       // precio (igual)
        stock: '',        // stock (igual)
        descripcion: '',  // Antes: description
        imageUrl: '',     // imageUrl (igual - asegúrate que backend tenga este campo exacto o cámbialo a imagenUrl)
        // Nota: El backend actual NO tiene 'discountPercentage', así que este campo no se guardará en la BD
        // a menos que lo agregues en el modelo Java.
    });

    useEffect(() => {
        if (product) {
            setFormData({
                id: product.id,
                nombre: product.nombre || product.name || '', // Compatibilidad mientras migras
                categoria: product.categoria || product.category || '',
                precio: product.precio || product.price || '',
                stock: product.stock || '',
                descripcion: product.descripcion || product.description || '',
                imageUrl: product.imageUrl || '',
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Convertir tipos numéricos antes de enviar
        const productToSave = {
            ...formData,
            precio: parseFloat(formData.precio),
            stock: parseInt(formData.stock, 10)
        };
        onSave(productToSave);
    };

    return (
        <div className="card shadow mb-4">
            <div className="card-header bg-primary text-white">
                <h5 className="mb-0">{product ? 'Editar Producto' : 'Nuevo Producto'}</h5>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Nombre del Producto</label>
                            <input
                                type="text"
                                className="form-control"
                                name="nombre" 
                                value={formData.nombre}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Categoría</label>
                            <select
                                className="form-select"
                                name="categoria"
                                value={formData.categoria}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Seleccionar...</option>
                                {categories.map((cat, index) => (
                                    <option key={index} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <label className="form-label">Precio</label>
                            <div className="input-group">
                                <span className="input-group-text">$</span>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="precio"
                                    value={formData.precio}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                />
                            </div>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label">Stock</label>
                            <input
                                type="number"
                                className="form-control"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                required
                                min="0"
                            />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">URL de Imagen</label>
                        <input
                            type="text"
                            className="form-control"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            placeholder="https://ejemplo.com/imagen.jpg"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Descripción</label>
                        <textarea
                            className="form-control"
                            name="descripcion"
                            rows="3"
                            value={formData.descripcion}
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    <div className="d-flex justify-content-end gap-2">
                        <button type="button" className="btn btn-secondary" onClick={onCancel}>
                            Cancelar
                        </button>
                        <button type="submit" className="btn btn-success">
                            <i className="fas fa-save me-2"></i>
                            {product ? 'Actualizar' : 'Guardar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminProductForm;