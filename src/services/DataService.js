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
            // Guardamos sesión con estructura básica para el frontend
            const session = {
                name: backendUser.nombre,
                email: backendUser.email,
                role: backendUser.rol === 'ADMIN' ? 'admin' : 'client',
                // Campos extra para que el perfil no falle (se llenarán localmente)
                firstName: backendUser.nombre.split(' ')[0] || '',
                lastName: backendUser.nombre.split(' ')[1] || '',
                street: '',
                department: '',
                region: '',
                commune: ''
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

// --- FUNCIONES AGREGADAS PARA CORREGIR ERRORES DE PERFIL ---

export const getUserProfile = async (email) => {
    // Usamos los datos de la sesión local activa
    const storedSession = localStorage.getItem('USER_SESSION');
    if (storedSession) {
        const session = JSON.parse(storedSession);
        if (session.email === email) return session;
    }
    return null;
};

export const updateUserProfile = async (email, updatedData) => {
    // Actualizamos la sesión localmente para que el usuario vea los cambios
    const storedSession = localStorage.getItem('USER_SESSION');
    if (storedSession) {
        const session = JSON.parse(storedSession);
        // Mezclamos los datos viejos con los nuevos
        const newSession = { ...session, ...updatedData };
        localStorage.setItem('USER_SESSION', JSON.stringify(newSession));
        return true;
    }
    return false;
};

// -----------------------------------------------------------
// 2. PRODUCTOS (CRUD REAL)
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
// 3. DATOS LOCALES (CARRITO Y REGIONES)
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
    { region: "Metropolitana de Santiago", communes: ["Santiago", "Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Joaquín", "San Miguel", "San Ramón", "Vitacura", "Puente Alto", "Pirque", "San José de Maipo", "Colina", "Lampa", "Tiltil", "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla", "Alhué", "Curacaví", "María Pinto", "San Pedro", "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "Peñaflor"] },
    { region: "Libertador General Bernardo O'Higgins", communes: ["Rancagua", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "Las Cabras", "Machalí", "Malloa", "Mostazal", "Olivar", "Peumo", "Pichidegua", "Quinta de Tilcoco", "Rengo", "Requínoa", "San Vicente", "Pichilemu", "La Estrella", "Litueche", "Marchihue", "Navidad", "Paredones", "San Fernando", "Chépica", "Chimbarongo", "Lolol", "Nancagua", "Palmilla", "Peralillo", "Placilla", "Pumanque", "Santa Cruz"] },
    { region: "Maule", communes: ["Talca", "Curepto", "Constitución", "Empedrado", "Maule", "Pelarco", "Pencahue", "Río Claro", "San Clemente", "San Rafael", "Cauquenes", "Chanco", "Pelluhue", "Curicó", "Hualañé", "Licantén", "Molina", "Rauco", "Romeral", "Sagrada Familia", "Teno", "Vichuquén", "Linares", "Colbún", "Longaví", "Parral", "Retiro", "San Javier", "Villa Alegre", "Yerbas Buenas"] },
    { region: "Ñuble", communes: ["Chillán", "Bulnes", "Cabrería", "Cobquecura", "Coelemu", "Coihueco", "Chillán Viejo", "El Carmen", "Ninhue", "Ñiquén", "Pemuco", "Pinto", "Portezuelo", "Quillón", "Quirihue", "Ránquil", "San Carlos", "San Fabián", "San Ignacio", "San Nicolás", "Treguaco", "Yungay"] },
    { region: "Biobío", communes: ["Concepción", "Coronel", "Chiguayante", "Florida", "Hualqui", "Lota", "Penco", "San Pedro de la Paz", "Santa Juana", "Talcahuano", "Tomé", "Hualpén", "Lebu", "Arauco", "Cañete", "Contulmo", "Curanilahue", "Los Álamos", "Antuco", "Cabrero", "Laja", "Los Ángeles", "Mulchén", "Nacimiento", "Negrete", "Quilaco", "Quilleco", "San Rosendo", "Santa Bárbara", "Tucapel", "Yumbel", "Alto Bío Bío"] },
    { region: "La Araucanía", communes: ["Temuco", "Carahue", "Cholchol", "Cunco", "Curarrehue", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Melipeuco", "Nueva Imperial", "Padre Las Casas", "Perquenco", "Pitrufquén", "Pucón", "Saavedra", "Teodoro Schmidt", "Toltén", "Vilcún", "Villarrica", "Angol", "Collipulli", "Curacautín", "Ercilla", "Lonquimay", "Los Sauces", "Lumaco", "Purén", "Renaico", "Traiguén", "Victoria"] },
    { region: "Los Ríos", communes: ["Valdivia", "Corral", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", "Panguipulli", "La Unión", "Futrono", "Lago Ranco", "Río Bueno"] },
    { region: "Los Lagos", communes: ["Puerto Montt", "Calbuco", "Cochamó", "Fresia", "Frutillar", "Los Muermos", "Llanquihue", "Maullín", "Puerto Varas", "Castro", "Ancud", "Chonchi", "Curaco de Vélez", "Dalcahue", "Quellón", "Queilén", "Quinchao", "Puqueldón", "Osorno", "Purranque", "Puyehue", "Río Negro", "San Juan de la Costa", "San Pablo", "Chaitén", "Futaleufú", "Hualaihué", "Palena"] },
    { region: "Aysén del General Carlos Ibáñez del Campo", communes: ["Coyhaique", "Lago Verde", "Aysén", "Cisnes", "Guaitecas", "Chile Chico", "Río Ibáñez", "Cochrane", "O'Higgins", "Tortel"] },
    { region: "Magallanes y la Antártica Chilena", communes: ["Punta Arenas", "Laguna Blanca", "Río Verde", "San Gregorio", "Cabo de Hornos", "Antártica", "Porvenir", "Primavera", "Tierra del Fuego", "Natales", "Torres del Paine"] },
];

export const loadCartFromStorage = () => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEYS.CART);
    return stored ? JSON.parse(stored) : [];
};

export const saveCartToStorage = (cart) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.CART, JSON.stringify(cart));
};