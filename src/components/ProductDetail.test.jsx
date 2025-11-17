//Pruebas para el componente ProductDetail
import { render, screen } from '@testing-library/react';
import ProductDetail from './ProductDetail';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

//renderizado
//tanto en este test como en los siguientes fue necesario envolver el componente en MemoryRouter y Routes
//para simular la ruta con el parámetro id que ProductDetail usa para cargar el producto correcto.
it('muestra el nombre y precio del producto', () => {
  const product = { id: 1, nombre: 'Producto Test', precio: 1234, img: 'fruta-congelada' };
  render(
    <MemoryRouter initialEntries={["/producto/1"]}>
      <Routes>
        <Route path="/producto/:id" element={<ProductDetail products={[product]} />} />
      </Routes>
    </MemoryRouter>
  );
  expect(screen.getByText(/producto test/i)).toBeInTheDocument();
  expect(screen.getByText(/\$1.234/)).toBeInTheDocument();
});
//producto no encontrado
it('muestra mensaje si el producto no existe', () => {
  render(<ProductDetail products={[]} />);
  expect(screen.getByText(/producto no encontrado/i)).toBeInTheDocument();
});
//renderiza imagen del producto
it('muestra la imagen del producto', () => {
  const product = { id: 1, nombre: 'Producto Test', precio: 1234, img: 'fruta-congelada' };
  render(
    <MemoryRouter initialEntries={["/producto/1"]}>
      <Routes>
        <Route path="/producto/:id" element={<ProductDetail products={[product]} />} />
      </Routes>
    </MemoryRouter>
  );
  expect(screen.getByAltText(/producto test/i)).toBeInTheDocument();
});
//renderizado de opiniones 
it('muestra opiniones de ejemplo', () => {
  const product = { id: 1, nombre: 'Producto Test', precio: 1234, img: 'fruta-congelada' };
  render(
    <MemoryRouter initialEntries={["/producto/1"]}>
      <Routes>
        <Route path="/producto/:id" element={<ProductDetail products={[product]} />} />
      </Routes>
    </MemoryRouter>
  );
  expect(screen.getByText(/juan pérez/i)).toBeInTheDocument();
  expect(screen.getByText(/maría lópez/i)).toBeInTheDocument();
});