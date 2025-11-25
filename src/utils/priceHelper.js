// Calcula el precio final aplicando el descuento (si existe y es mayor a 0)
export const calculateDiscountedPrice = (price, discount) => {
    if (!discount || discount <= 0) return price;
    return price - (price * (discount / 100));
};

// Verifica si un producto tiene oferta válida
export const hasDiscount = (product) => {
    return product.descuento && product.descuento > 0;
};