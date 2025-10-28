// --- START OF FILE src/components/ProductCard/ProductCard.spec.js ---
import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react';
import ProductCard from './ProductCard';

describe('Componente ProductCard', () => {
  let container;
  const mockProduct = { id: 1, name: 'Laptop Test', price: 500000, category: 'Laptops', stock: 10, discountPercentage: 0 };
  const mockProductOnOffer = { id: 2, name: 'TV Oferta', price: 300000, category: 'TVs', stock: 5, discountPercentage: 50 }; // 50% de descuento

  // Creamos un objeto espía (spy) para simular la función handleAddToCart
  const mockFunctions = {
    handleAddToCart: () => {}
  };

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    // Le decimos a Jasmine que "espíe" la función. Ahora podemos saber si fue llamada.
    spyOn(mockFunctions, 'handleAddToCart'); 
  });

  afterEach(() => {
    // Limpieza
    if (container) {
      const root = createRoot(container);
      act(() => { root.unmount(); });
      container.remove();
      container = null;
    }
  });

  it('debería renderizar la información del producto correctamente', () => {
    act(() => {
      const root = createRoot(container);
      root.render(<ProductCard product={mockProduct} handleAddToCart={mockFunctions.handleAddToCart} />);
    });

    expect(container.textContent).toContain('Laptop Test');
    expect(container.textContent).toContain('$500.000');
  });

  it('debería mostrar el precio con descuento si el producto está en oferta', () => {
    act(() => {
      const root = createRoot(container);
      root.render(<ProductCard product={mockProductOnOffer} handleAddToCart={mockFunctions.handleAddToCart} />);
    });
    
    expect(container.textContent).toContain('TV Oferta');
    expect(container.textContent).toContain('$150.000'); // Precio con 50% de descuento
    expect(container.textContent).toContain('$300.000'); // Precio original tachado
    expect(container.textContent).toContain('-50%');   // Badge de descuento
  });

  it('debería llamar a handleAddToCart cuando se hace clic en el botón', () => {
    act(() => {
      const root = createRoot(container);
      root.render(<ProductCard product={mockProduct} handleAddToCart={mockFunctions.handleAddToCart} />);
    });

    // Buscamos el botón dentro del componente renderizado
    const button = container.querySelector('button');
    
    // Simulamos un clic
    act(() => {
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    
    // Verificamos que nuestra función espía fue llamada. ¡Esto es usar un mock!
    expect(mockFunctions.handleAddToCart).toHaveBeenCalled();
  });
});
// --- END OF FILE src/components/ProductCard/ProductCard.spec.js ---