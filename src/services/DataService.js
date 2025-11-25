import axios from 'axios';

// URL DE TU BACKEND EN RENDER
const API_URL = "https://tienda-fullstack-backend.onrender.com/api"; 

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Interceptor: Agrega el Token JWT a cada petición
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// -----------------------------------------------------------
// 1. AUTENTICACIÓN Y USUARIOS
// -----------------------------------------------------------

export const loginUser = async (email, password) => {
    try {
        const response = await api.post('/auth/login', { email, password });
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            const backendUser = response.data.usuario;
            const session = {
                name: backendUser.nombre,
                email: backendUser.email,
                role: backendUser.rol === 'ADMIN' ? 'admin' : 'client',
                // Datos extra para perfil
                id: backendUser.id
            };
            return session;
        }
    } catch (error) {
        console.error("Error en Login:", error);
    }
    return null;
};

export const registerUser = async (name, email, password) => {
    try {
        await api.post('/auth/register', { 
            nombre: name, 
            email, 
            password, 
            rol: 'CLIENTE' 
        });
        return true;
    } catch (error) {
        console.error("Error en Registro:", error);
        return false;
    }
};

// --- GESTIÓN DE USUARIOS (ADMIN) ---
export const getUsers = async () => {
    try {
        const response = await api.get('/admin/usuarios');
        return response.data;
    } catch (error) {
        console.error("Error obteniendo usuarios", error);
        return [];
    }
};

export const createUser = async (userData) => {
    try {
        // Reutilizamos el endpoint de registro o uno específico de admin si existiera
        await api.post('/auth/register', userData); 
        return true;
    } catch (error) {
        return false;
    }
};

// -----------------------------------------------------------
// 2. PRODUCTOS (CRUD)
// -----------------------------------------------------------

export const getProductsData = async () => {
    try {
        const response = await api.get('/productos');
        return response.data;
    } catch (error) {
        console.error("Error cargando productos:", error);
        return [];
    }
};

export const addProduct = async (product) => {
    try {
        const response = await api.post('/productos', product);
        return response.data;
    } catch (error) {
        console.error("Error creando producto:", error);
        throw error;
    }
};

export const updateProduct = async (product) => {
    try {
        const response = await api.put(`/productos/${product.id}`, product);
        return response.data;
    } catch (error) {
        console.error("Error actualizando producto:", error);
        throw error;
    }
};

export const deleteProduct = async (id) => {
    try {
        await api.delete(`/productos/${id}`);
        return true;
    } catch (error) {
        console.error("Error eliminando producto:", error);
        return false;
    }
};

// -----------------------------------------------------------
// 3. ÓRDENES, DASHBOARD Y PERFIL
// -----------------------------------------------------------

export const getOrders = async () => {
    try {
        const response = await api.get('/admin/ordenes');
        return response.data;
    } catch (error) {
        console.error("Error obteniendo órdenes:", error);
        return [];
    }
};

export const updateOrderStatus = async (id, status) => {
    try {
        const response = await api.put(`/admin/ordenes/${id}/estado`, status, {
            headers: { 'Content-Type': 'text/plain' } // Enviamos string plano
        });
        return response.data;
    } catch (error) {
        return null;
    }
};

export const getDashboardStats = async () => {
    try {
        const response = await api.get('/admin/dashboard/stats');
        return response.data;
    } catch (error) {
        // Si falla (ej: backend no actualizado), devolvemos ceros para no romper la UI
        return { usuarios: 0, productos: 0, ordenes: 0, ventas: 0 };
    }
};

// Perfil de Usuario (Simulado localmente para visualización rápida, 
// idealmente debería haber un endpoint /api/users/me)
export const getUserProfile = async (email) => {
    const storedSession = localStorage.getItem('USER_SESSION');
    if (storedSession) {
        const session = JSON.parse(storedSession);
        if (session.email === email) return session;
    }
    return null;
};

export const updateUserProfile = async (email, updatedData) => {
    // En un entorno real llamaríamos a api.put('/usuarios/me', updatedData)
    // Aquí actualizamos la sesión local
    const storedSession = localStorage.getItem('USER_SESSION');
    if (storedSession) {
        const session = JSON.parse(storedSession);
        const newSession = { ...session, ...updatedData };
        localStorage.setItem('USER_SESSION', JSON.stringify(newSession));
        return true;
    }
    return false;
};

// -----------------------------------------------------------
// 4. DATOS LOCALES (CARRITO Y REGIONES)
// -----------------------------------------------------------

export const LOCAL_STORAGE_KEYS = {
    CART: 'CART_DATA',
    SESSION: 'USER_SESSION', 
};

export const REGIONES_COMUNAS_CHILE = [
    { region: "Metropolitana", communes: ["Santiago", "Providencia", "Las Condes", "Maipú"] },
    { region: "Valparaíso", communes: ["Valparaíso", "Viña del Mar", "Concón"] },
    { region: "Biobío", communes: ["Concepción", "Talcahuano"] },
    // ... Puedes agregar más si es necesario
];

export const loadCartFromStorage = () => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEYS.CART);
    return stored ? JSON.parse(stored) : [];
};

export const saveCartToStorage = (cart) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.CART, JSON.stringify(cart));
};