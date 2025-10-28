// -----------------------------------------------------------
// 2. UTILIDADES Y FORMATO
// -----------------------------------------------------------

const formatPrice = (price) => new Intl.NumberFormat('es-CL', { 
    style: 'currency', 
    currency: 'CLP', 
    minimumFractionDigits: 0 
}).format(price);

export default formatPrice;
