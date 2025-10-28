<<<<<<< HEAD
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
=======
// --- START OF FILE src/App.test.js (CORREGIDO FINAL CON ACT) ---
import React from 'react';
import { createRoot } from 'react-dom/client';
// ¡CAMBIO CLAVE! Importamos la utilidad 'act' para sincronizar las pruebas.
import { act } from 'react';
import App from './App';

describe('Componente Principal App', () => {
  let container;
  let root;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    // La limpieza debe estar también dentro de 'act' para un desmontaje correcto.
    act(() => {
      if (root) {
        root.unmount();
      }
    });
    if (container) {
      container.remove();
      container = null;
    }
  });

  it('debería renderizarse en el DOM sin crashear', () => {
    // ¡CAMBIO CLAVE! Envolvemos el renderizado en 'act'.
    // 'act' se asegurará de que el renderizado se complete antes de continuar.
    act(() => {
      root = createRoot(container);
      root.render(<App />);
    });

    // Ahora, cuando se ejecute esta línea, el HTML del componente App ya estará en el DOM.
    expect(container.innerHTML).not.toBe('');
  });
});
// --- END OF FILE src/App.test.js ---
>>>>>>> 713c4e4 (Termino del proyecto)
