import React, { useState } from 'react';
import { addProduct, updateProduct, deleteProduct, getProductsData } from '../../../services/DataService.js';
import formatPrice from '../../../utils/formatPrice.js';
import AdminProductForm from './AdminProductForm.js';

const AdminProducts = ({ products, setProducts }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [notification, setNotification] = useState({ message: '', type: '' });
    const categories = ['Laptops', 'TVs', 'Audio', 'Monitores', 'Accesorios', 'Tablets'];

    const refreshProducts = async () => {
        const updatedList = await getProductsData();
        setProducts(updatedList);
    };

    const handleSave = async (productData) => {
        try {
            if (productData.id) {
                await updateProduct(productData);
                setNotification({ message: 'Producto actualizado.', type: 'success' });
            } else {
                await addProduct(productData);
                setNotification({ message: 'Producto creado.', type: 'success' });
            }
            await refreshProducts();
            setIsAdding(false);
            setEditingProduct(null);
        } catch (error) {
            setNotification({ message: 'Error al guardar.', type: 'danger' });
        }
        setTimeout(() => setNotification({ message: '', type: '' }), 3000);
    };

    const handleDelete = async (id, nombre) => {
        if (window.confirm(`¿Eliminar ${nombre}?`)) {
            try {
                await deleteProduct(id);
                setNotification({ message: 'Eliminado.', type: 'warning' });
                await refreshProducts();
            } catch (error) {
                setNotification({ message: 'Error.', type: 'danger' });
            }
            setTimeout(() => setNotification({ message: '', type: '' }), 3000);
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="cyber-font text-white">Inventario</h2>
                {!isAdding && !editingProduct && (
                    <button className="btn btn-outline-info" onClick={() => setIsAdding(true)}>
                        <i className="fas fa-plus me-2"></i> Nuevo Producto
                    </button>
                )}
            </div>

            {notification.message && (
                <div className={`alert alert-${notification.type} mb-4 bg-dark border-${notification.type} text-white`}>
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
                <div className="card border-0 shadow">
                    <div className="table-responsive">
                        {/* AGREGADO: table-dark para forzar el estilo oscuro de Bootstrap */}
                        <table className="table table-dark table-hover mb-0 align-middle text-white">
                            <thead>
                                <tr className="text-info" style={{ borderBottom: '1px solid #00f3ff' }}>
                                    <th>ID</th>
                                    <th>Imagen</th>
                                    <th>Nombre</th>
                                    <th>Categoría</th>
                                    <th>Precio</th>
                                    <th>Stock</th>
                                    <th className="text-end">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(p => (
                                    <tr key={p.id} style={{ borderBottom: '1px solid #334155' }}>
                                        <td className="text-secondary">#{p.id}</td>
                                        <td>
                                            <img src={p.imageUrl || 'https://via.placeholder.com/40'} alt="prod" style={{width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px'}} />
                                        </td>
                                        <td className="fw-bold text-white">{p.nombre || p.name}</td>
                                        <td><span className="badge bg-dark border border-info text-info">{p.categoria || p.category}</span></td>
                                        <td className="text-success">{formatPrice(p.precio || p.price)}</td>
                                        <td><span className={`badge ${p.stock < 5 ? 'bg-danger' : 'bg-success'}`}>{p.stock}</span></td>
                                        <td className="text-end">
                                            <button className="btn btn-sm btn-outline-warning me-2" onClick={() => setEditingProduct(p)}><i className="fas fa-edit"></i></button>
                                            <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(p.id, p.nombre)}><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProducts;