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

export const createOrder = async (orderData) => {
    try {
        const response = await api.post('/ordenes', orderData);
        return response.data;
    } catch (error) {
        return null;
    }
};

export const getOrders = async () => {
    try {
        const response = await api.get('/admin/ordenes');
        return response.data;
    } catch (error) {
        console.error("Error obteniendo órdenes:", error);
        return [];
    }
};

// --- ¡AQUÍ ESTABA EL ERROR! FALTABA ESTA FUNCIÓN ---
export const updateOrderStatus = async (id, status) => {
    try {
        const response = await api.put(`/admin/ordenes/${id}/estado`, status, {
            headers: { 'Content-Type': 'text/plain' }
        });
        return response.data;
    } catch (error) {
        console.error("Error actualizando estado:", error);
        return null;
    }
};

export const getDashboardStats = async () => {
    try {
        const response = await api.get('/admin/dashboard/stats');
        return response.data;
    } catch (error) {
        return { usuarios: 0, productos: 0, ordenes: 0, ventas: 0 };
    }
};

export const getUserProfile = async (email) => {
    const storedSession = localStorage.getItem('USER_SESSION');
    if (storedSession) {
        const session = JSON.parse(storedSession);
        if (session.email === email) return session;
    }
    return null;
};

export const updateUserProfile = async (email, updatedData) => {
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
    { region: "Arica y Parinacota", communes: ["Arica", "Camarones", "Putre", "General Lagos"] },
    { region: "Tarapacá", communes: ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"] },
    { region: "Antofagasta", communes: ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollagüe", "San Pedro de Atacama", "Tocopilla", "María Elena"] },
    { region: "Atacama", communes: ["Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro", "Vallenar", "Alto del Carmen", "Freirina", "Huasco"] },
    { region: "Coquimbo", communes: ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paiguano", "Vicuña", "Illapel", "Canela", "Los Vilos", "Salamanca", "Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado"] },
    { region: "Valparaíso", communes: ["Valparaíso", "Casablanca", "Concón", "Juan Fernández", "Puchuncaví", "Quintero", "Viña del Mar", "Isla de Pascua", "Los Andes", "Calle Larga", "Rinconada", "San Esteban", "La Ligua", "Cabildo", "Papudo", "Petorca", "Zapallar", "Quillota", "Calera", "Hijuelas", "La Cruz", "Nogales", "San Antonio", "Algarrobo", "Cartagena", "El Quisco", "El Tabo", "Santo Domingo", "San Felipe", "Catemu", "Llay-Llay", "Panquehue", "Putaendo", "Santa María", "Limache", "Olmué", "Quilpué", "Villa Alemana"] },
    { region: "Metropolitana", communes: ["Santiago", "Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Joaquín", "San Miguel", "San Ramón", "Vitacura", "Puente Alto", "Pirque", "San José de Maipo", "Colina", "Lampa", "Tiltil", "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla", "Alhué", "Curacaví", "María Pinto", "San Pedro", "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "Peñaflor"] },
    { region: "O'Higgins", communes: ["Rancagua", "Machalí", "Rengo", "San Fernando", "Santa Cruz", "Pichilemu", "San Vicente", "Requínoa"] },
    { region: "Maule", communes: ["Talca", "Curicó", "Linares", "Cauquenes", "Constitución", "Parral", "San Javier"] },
    { region: "Ñuble", communes: ["Chillán", "San Carlos", "Bulnes", "Yungay", "Quillón"] },
    { region: "Biobío", communes: ["Concepción", "Talcahuano", "Los Ángeles", "Coronel", "Hualpén", "Chiguayante", "San Pedro de la Paz", "Lota", "Penco", "Tomé", "Arauco", "Lebu", "Cañete", "Contulmo", "Curanilahue", "Tirúa", "Nacimiento", "Negrete", "Mulchén", "Santa Bárbara", "Antuco", "Laja", "Yumbel", "Cabrero", "San Rosendo", "Tucapel", "Alto Biobío"] },
    { region: "Araucanía", communes: ["Temuco", "Padre Las Casas", "Villarrica", "Pucón", "Angol", "Victoria", "Lautaro"] },
    { region: "Los Ríos", communes: ["Valdivia", "La Unión", "Río Bueno", "Panguipulli", "Futrono"] },
    { region: "Los Lagos", communes: ["Puerto Montt", "Osorno", "Castro", "Ancud", "Puerto Varas", "Frutillar", "Llanquihue"] },
    { region: "Aysén", communes: ["Coyhaique", "Aysén", "Chile Chico", "Cochrane"] },
    { region: "Magallanes", communes: ["Punta Arenas", "Puerto Natales", "Porvenir", "Cabo de Hornos"] }
];

export const loadCartFromStorage = () => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEYS.CART);
    return stored ? JSON.parse(stored) : [];
};

export const saveCartToStorage = (cart) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.CART, JSON.stringify(cart));
};