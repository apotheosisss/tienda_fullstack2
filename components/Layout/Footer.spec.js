// --- START OF FILE src/components/Layout/Footer.spec.js ---
import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react';
import Footer from './Footer';

describe('Componente Footer', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    // Limpieza
    if (container) {
      const root = createRoot(container);
      act(() => {
        root.unmount();
      });
      container.remove();
      container = null;
    }
  });

  it('debería renderizarse y mostrar el año actual', () => {
    const currentYear = new Date().getFullYear();
    
    act(() => {
      const root = createRoot(container);
      root.render(<Footer />);
    });

    // Verificamos que el texto renderizado contenga el año actual como string.
    expect(container.textContent).toContain(currentYear.toString());
  });
});
// --- END OF FILE src/components/Layout/Footer.spec.js ---