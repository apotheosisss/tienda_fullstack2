// -----------------------------------------------------------
// 1. LÓGICA DE DATOS Y PERSISTENCIA
// (Extraído de App.js)
// -----------------------------------------------------------

// Claves de localStorage para persistencia, según ERS (Requisito 3.3.5)
export const LOCAL_STORAGE_KEYS = {
    PRODUCTS: 'PRODUCTS_DATA',
    USERS: 'USERS_DATA',
    CART: 'CART_DATA',
    // ERS 3.3.5 sugiere USER_PROFILE, lo usaremos para el estado de sesión
    SESSION: 'USER_SESSION', 
};

// Datos iniciales de productos (Mock Data)
const initialProducts = [
  { id: 1, name: 'Laptop Ultrabook X', price: 950000, category: 'Laptops', stock: 15, imageUrl: 'https://placehold.co/400x200/1E3A8A/FFFFFF?text=Laptop+X', description: 'Potente y ligera, ideal para profesionales.', discountPercentage: 0 },
  { id: 2, name: 'Smart TV 4K 55"', price: 420000, category: 'TVs', stock: 8, imageUrl: 'https://placehold.co/400x200/1E3A8A/FFFFFF?text=Smart+TV+4K', description: 'Disfruta de la mejor calidad de imagen.', discountPercentage: 25 },
  { id: 3, name: 'Audífonos Bluetooth Pro', price: 55000, category: 'Audio', stock: 30, imageUrl: 'https://placehold.co/400x200/1E3A8A/FFFFFF?text=Audifonos+Pro', description: 'Cancelación de ruido y sonido premium.', discountPercentage: 0 },
  { id: 4, name: 'Monitor Curvo 32"', price: 329990, category: 'Monitores', stock: 20, imageUrl: 'https://placehold.co/400x200/1E3A8A/FFFFFF?text=Monitor+32', description: 'Inmersión total para gaming y diseño.', discountPercentage: 45 },
  { id: 5, name: 'Tablet Portátil Z', price: 180000, category: 'Laptops', stock: 5, imageUrl: 'https://placehold.co/400x200/1E3A8A/FFFFFF?text=Tablet+Z', description: 'Versatilidad y rendimiento en un solo dispositivo.', discountPercentage: 10 },
  { id: 6, name: 'Parlante Inalámbrico', price: 35000, category: 'Audio', stock: 0, imageUrl: 'https://placehold.co/400x200/1E3A8A/FFFFFF?text=Parlante+BT', description: 'Sonido potente y batería de larga duración.', discountPercentage: 0 },
];

// -----------------------------------------------------------
// DATOS DE REGIONES Y COMUNAS DE CHILE
// -----------------------------------------------------------
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

// Datos iniciales de usuarios (Mock Data)
// IMPORTANTE: El usuario admin ahora tiene el rol 'admin'
const initialUsers = [
    { name: 'Admin', email: 'admin@duoc.cl', password: 'password123', role: 'admin' },
];

/**
 * Carga datos de localStorage o usa valores iniciales por defecto.
 * ERS 3.3.3: Consistencia de Datos - Devuelve estado por defecto si falla.
 */
const getInitialData = (key, initialData) => {
    try {
        const stored = localStorage.getItem(key);
        if (stored) {
            const parsedData = JSON.parse(stored);
            return parsedData;
        }
    } catch (e) {
        console.error(`Error loading ${key} from localStorage, using default data.`, e);
        localStorage.removeItem(key);
    }
    // Si falla o no existe, establece el valor inicial y lo devuelve
    localStorage.setItem(key, JSON.stringify(initialData));
    return initialData;
};

// Funciones de utilidad para datos
export const loadCartFromStorage = () => getInitialData(LOCAL_STORAGE_KEYS.CART, []);
export const saveCartToStorage = (cart) => localStorage.setItem(LOCAL_STORAGE_KEYS.CART, JSON.stringify(cart));
export const getProductsData = () => getInitialData(LOCAL_STORAGE_KEYS.PRODUCTS, initialProducts);
export const saveProductsData = (products) => localStorage.setItem(LOCAL_STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
export const getUsersData = () => getInitialData(LOCAL_STORAGE_KEYS.USERS, initialUsers);
export const saveUsersData = (users) => localStorage.setItem(LOCAL_STORAGE_KEYS.USERS, JSON.stringify(users));

/**
 * Función temporal para asegurar que el usuario admin esté presente con el rol 'admin'.
 */
export const resetUsersIfEmpty = () => {
    const usersData = getUsersData();
    const adminExists = usersData.some(u => u.email === 'admin@duoc.cl' && u.role === 'admin');

    if (usersData.length === 0 || !adminExists) {
        console.warn("User data was empty or corrupt/missing admin role. Resetting user list.");
        saveUsersData(initialUsers);
        // Si hay que resetear, también nos aseguramos de que el admin en la lista devuelta tenga el rol
        return initialUsers; 
    }
    return usersData;
};

// Aseguramos la data inicial al cargar el módulo
resetUsersIfEmpty();


/**
 * @typedef {Object} UserSession
 * @property {string} email
 * @property {string} role - 'admin' o 'client'
 */

/**
 * Inicia sesión y devuelve el objeto de sesión (email y role).
 * @param {string} email 
 * @param {string} password
 * @returns {UserSession | null}
 */
export const loginUser = (email, password) => {
    const usersData = getUsersData(); 
    const user = usersData.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Asignamos 'client' por defecto si el rol no está definido (para usuarios nuevos que se hayan registrado)
        const role = user.role || 'client'; 
        return { email: user.email, role: role };
    }
    return null;
};

// Registro
export const registerUser = (name, email, password) => {
    const usersData = getUsersData();
    if (usersData.some(u => u.email === email)) {
        return false; // Usuario ya existe
    }
    // Los usuarios registrados tienen rol 'client'
    const newUser = { name, email, password, role: 'client' }; 
    usersData.push(newUser);
    saveUsersData(usersData);
    return true;
};

// Funciones CRUD para productos (usadas en AdminDashboard)

/**
 * Añade un producto nuevo.
 * @param {object} product - Datos del producto (sin ID)
 */
export const addProduct = (product) => {
    const productsData = getProductsData();
    const newProduct = { 
        ...product, 
        id: Date.now(), // ID simple basado en timestamp
        stock: parseInt(product.stock, 10) || 0, 
        price: parseInt(product.price, 10) || 0
    };
    productsData.push(newProduct);
    saveProductsData(productsData);
    return productsData;
};

/**
 * Actualiza un producto existente.
 * @param {object} updatedProduct - Producto con ID y datos actualizados.
 */
export const updateProduct = (updatedProduct) => {
    const productsData = getProductsData();
    const index = productsData.findIndex(p => p.id === updatedProduct.id);
    if (index > -1) {
        productsData[index] = { 
            ...updatedProduct,
            stock: parseInt(updatedProduct.stock, 10) || 0,
            price: parseInt(updatedProduct.price, 10) || 0
        };
        saveProductsData(productsData);
    }
    return productsData;
};

/**
 * Elimina un producto por ID.
 * @param {number} productId
 */
export const deleteProduct = (productId) => {
    let productsData = getProductsData();
    productsData = productsData.filter(p => p.id !== productId);
    saveProductsData(productsData);
    return productsData;
};
