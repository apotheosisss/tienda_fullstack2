import React, { useState } from 'react';
import { addProduct, updateProduct, deleteProduct } from '../../../services/DataService.js';
import formatPrice from '../../../utils/formatPrice.js';
import AdminProductForm from './AdminProductForm.js';

const AdminProducts = ({ products, setProducts }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [notification, setNotification] = useState({ message: '', type: '' });
    
    const categories = ['Laptops', 'TVs', 'Audio', 'Monitores', 'Accesorios'];

    // Manejadores CRUD (sin cambios)
    const handleSave = (productData) => {
        let updatedProducts;
        if (productData.id) {
            updatedProducts = updateProduct(productData);
            setNotification({ message: `Producto '${productData.name}' actualizado.`, type: 'success' });
        } else {
            updatedProducts = addProduct(productData);
            setNotification({ message: `Producto '${productData.name}' agregado.`, type: 'success' });
        }
        setProducts(updatedProducts);
        setIsAdding(false);
        setEditingProduct(null);
        setTimeout(() => setNotification({ message: '', type: '' }), 3000);
    };

    const handleDelete = (id, name) => {
        if (window.confirm(`¿Estás seguro de eliminar el producto: ${name}?`)) {
            const updatedProducts = deleteProduct(id);
            setProducts(updatedProducts);
            setNotification({ message: `Producto '${name}' eliminado.`, type: 'danger' });
            setTimeout(() => setNotification({ message: '', type: '' }), 3000);
        }
    };

    return (
        <div className="container-fluid p-0">
            {/* ... (código del formulario sin cambios) ... */}
            <h1 className="h2 mb-4"><i className="fas fa-box me-2"></i> Gestión de Productos</h1>

            {notification.message && (
                <div className={`alert alert-${notification.type} text-center`}>
                    {notification.message}
                </div>
            )}
            
            {(isAdding || editingProduct) ? (
                <AdminProductForm 
                    product={editingProduct} 
                    categories={categories}
                    onSave={handleSave}
                    onCancel={() => { setIsAdding(false); setEditingProduct(null); }}
                />
            ) : (
                <div className="text-end mb-4">
                    <button className="btn btn-success btn-lg shadow" onClick={() => setIsAdding(true)}>
                        <i className="fas fa-plus-circle me-2"></i> Añadir Nuevo Producto
                    </button>
                </div>
            )}

            <div className="card shadow-lg">
                <div className="card-header bg-dark text-white">
                    <h5 className="mb-0">Inventario ({products.length} productos)</h5>
                </div>
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-striped table-hover mb-0">
                            <thead className="table-primary">
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Categoría</th>
                                    <th>Precio</th>
                                    <th>Stock</th>
                                    <th>En Oferta</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(p => (
                                    <tr key={p.id}>
                                        <td>{p.id}</td>
                                        <td className="fw-bold">{p.name}</td>
                                        <td>{p.category}</td>
                                        <td>{formatPrice(p.price)}</td>
                                        <td className={p.stock <= 5 ? 'text-danger fw-bold' : 'text-success'}>
                                            {p.stock}
                                        </td>
                                        <td className="text-center">
                                            {/* --- ¡CORRECCIÓN CLAVE AQUÍ! --- */}
                                            {p.discountPercentage > 0 && (
                                                <i className="fas fa-star text-warning" title={`Descuento: ${p.discountPercentage}%`}></i>
                                            )}
                                        </td>
                                        <td>
                                            <button 
                                                className="btn btn-sm btn-warning me-2" 
                                                onClick={() => setEditingProduct(p)}
                                                aria-label={`Editar ${p.name}`}
                                            >
                                                <i className="fas fa-edit"></i>
                                            </button>
                                            <button 
                                                className="btn btn-sm btn-danger" 
                                                onClick={() => handleDelete(p.id, p.name)}
                                                aria-label={`Eliminar ${p.name}`}
                                            >
                                                <i className="fas fa-trash-alt"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProducts;