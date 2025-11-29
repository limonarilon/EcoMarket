// Pruebas para el componente ProductDetail
// - En la versión actual el componente usa getProduct(id) para cargar datos
//   desde src/services/api. En lugar de depender de la red, mockeamos la
//   función getProduct y comprobamos el DOM resultante de forma simple.
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import ProductDetail from './ProductDetail';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

// Mock del módulo de API (sólo la función getProduct que usa este componente)
vi.mock('../services/api', () => ({
  getProduct: vi.fn()
}));
import { getProduct } from '../services/api';

// Nota: cada test está comentado explicando qué se valida y por qué

it('muestra el nombre y precio del producto', async () => {
  // Explicación: mockeamos getProduct para que devuelva el producto esperado.
  const product = { id: 1, nombre: 'Producto Test', precio: 1234, img: 'fruta-congelada' };
  getProduct.mockResolvedValue(product);

  render(
    <MemoryRouter initialEntries={["/producto/1"]}>
      <Routes>
        <Route path="/producto/:id" element={<ProductDetail />} />
      </Routes>
    </MemoryRouter>
  );

  // Esperamos los elementos que se renderizan después de la carga asíncrona
  expect(await screen.findByText(/producto test/i)).toBeInTheDocument();
  expect(await screen.findByText(/\$1.234/)).toBeInTheDocument();
});

it('muestra mensaje si el producto no existe', async () => {
  // Explicación: forzamos que la llamada a la API falle y verificamos el mensaje.
  getProduct.mockRejectedValue(new Error('not found'));

  render(
    <MemoryRouter initialEntries={["/producto/999"]}>
      <Routes>
        <Route path="/producto/:id" element={<ProductDetail />} />
      </Routes>
    </MemoryRouter>
  );

  expect(await screen.findByText(/producto no encontrado/i)).toBeInTheDocument();
});

it('muestra la imagen del producto', async () => {
  // Explicación: comprobamos que la etiqueta <img> se renderiza con el alt correcto.
  const product = { id: 1, nombre: 'Producto Test', precio: 1234, img: 'fruta-congelada' };
  getProduct.mockResolvedValue(product);

  render(
    <MemoryRouter initialEntries={["/producto/1"]}>
      <Routes>
        <Route path="/producto/:id" element={<ProductDetail />} />
      </Routes>
    </MemoryRouter>
  );

  expect(await screen.findByAltText(/producto test/i)).toBeInTheDocument();
});

it('muestra opiniones de ejemplo', async () => {
  // Explicación: las opiniones están hardcodeadas en el componente; tras cargar
  // el producto, deben aparecer los nombres mostrados.
  const product = { id: 1, nombre: 'Producto Test', precio: 1234, img: 'fruta-congelada' };
  getProduct.mockResolvedValue(product);

  render(
    <MemoryRouter initialEntries={["/producto/1"]}>
      <Routes>
        <Route path="/producto/:id" element={<ProductDetail />} />
      </Routes>
    </MemoryRouter>
  );

  expect(await screen.findByText(/juan pérez/i)).toBeInTheDocument();
  expect(await screen.findByText(/maría lópez/i)).toBeInTheDocument();
});