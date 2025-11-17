// Pruebas unitarias para el componente PrivateRoute
// Usamos MemoryRouter para simular la navegación en React Router
// Probamos los tres casos principales: sin rol, rol no permitido y rol permitido

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PrivateRoute from '../routes/PrivateRoute';
// Antes de cada prueba, limpiamos el localStorage para evitar interferencias
beforeEach(() => {
  localStorage.clear();
});

// Caso 1: Si el usuario no tiene rol guardado, debe redirigir al login
it('redirige a /iniciar-sesion si no hay rol en localStorage', () => {
  render(
    <MemoryRouter initialEntries={['/backoffice']}>
      {/* PrivateRoute recibe el rol permitido 'admin' */}
      <PrivateRoute allowedRoles={['admin']}>
        <div>Contenido Privado</div>
      </PrivateRoute>
    </MemoryRouter>
  );
  // No debe mostrar el contenido privado porque no hay rol
  expect(screen.queryByText(/contenido privado/i)).not.toBeInTheDocument();
});

// Caso 2: Si el usuario tiene un rol no permitido, debe redirigir a la página principal
it('redirige a / si el rol no está permitido', () => {
  localStorage.setItem('userRole', 'user'); // Guardamos un rol no permitido
  render(
    <MemoryRouter initialEntries={['/backoffice']}>
      <PrivateRoute allowedRoles={['admin']}>
        <div>Contenido Privado</div>
      </PrivateRoute>
    </MemoryRouter>
  );
  // No debe mostrar el contenido privado porque el rol no es 'admin'
  expect(screen.queryByText(/contenido privado/i)).not.toBeInTheDocument();
});

// Caso 3: Si el usuario tiene el rol permitido, debe mostrar el contenido privado
it('muestra el contenido si el rol está permitido', () => {
  localStorage.setItem('userRole', 'admin'); // Guardamos el rol permitido
  render(
    <MemoryRouter initialEntries={['/backoffice']}>
      <PrivateRoute allowedRoles={['admin']}>
        <div>Contenido Privado</div>
      </PrivateRoute>
    </MemoryRouter>
  );
  // Debe mostrar el contenido privado porque el rol es 'admin'
  expect(screen.getByText(/contenido privado/i)).toBeInTheDocument();
});