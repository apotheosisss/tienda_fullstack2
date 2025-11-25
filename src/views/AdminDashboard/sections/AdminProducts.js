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
                setNotification({ message: `Producto actualizado.`, type: 'success' });
            } else {
                await addProduct(productData);
                setNotification({ message: `Producto creado.`, type: 'success' });
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
                setNotification({ message: 'Producto eliminado.', type: 'warning' });
                await refreshProducts();
            } catch (error) {
                setNotification({ message: 'Error al eliminar.', type: 'danger' });
            }
            setTimeout(() => setNotification({ message: '', type: '' }), 3000);
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>Inventario</h2>
                {!isAdding && !editingProduct && (
                    <button className="btn btn-primary" onClick={() => setIsAdding(true)}>
                        <i className="fas fa-plus me-2"></i> Nuevo Producto
                    </button>
                )}
            </div>

            {notification.message && (
                <div className={`alert alert-${notification.type} mb-4 border-${notification.type} bg-dark text-white`}>
                    <i className="fas fa-info-circle me-2"></i>{notification.message}
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
                <div className="card bg-dark border-0 shadow">
                    <div className="card-body p-0">
                        <div className="table-responsive">
                            {/* TABLA OSCURA */}
                            <table className="table table-dark table-hover mb-0 align-middle" style={{ borderColor: '#334155' }}>
                                <thead>
                                    <tr className="text-info">
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
                                        <tr key={p.id}>
                                            <td className="text-muted">#{p.id}</td>
                                            <td>
                                                <img 
                                                    src={p.imageUrl || 'https://via.placeholder.com/40'} 
                                                    alt="prod" 
                                                    className="rounded border border-secondary"
                                                    style={{width: '40px', height: '40px', objectFit: 'cover'}} 
                                                />
                                            </td>
                                            <td className="fw-bold text-white">{p.nombre || p.name}</td>
                                            <td><span className="badge bg-dark border border-secondary text-light">{p.categoria || p.category}</span></td>
                                            <td className="text-success" style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '1.1em' }}>{formatPrice(p.precio || p.price)}</td>
                                            <td>
                                                <span className={`badge ${p.stock < 5 ? 'bg-danger text-dark' : 'bg-success text-dark'}`}>
                                                    {p.stock}
                                                </span>
                                            </td>
                                            <td className="text-end">
                                                <button className="btn btn-sm btn-outline-warning me-2" onClick={() => setEditingProduct(p)}>
                                                    <i className="fas fa-edit"></i>
                                                </button>
                                                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(p.id, p.nombre)}>
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProducts;