// Pruebas unitarias para el componente PrivateRoute
// Usamos MemoryRouter para simular la navegación en React Router
// Probamos los tres casos principales: sin rol, rol no permitido y rol permitido

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PrivateRoute from '../routes/PrivateRoute';

// Nota: el componente PrivateRoute actual obtiene el rol decodificando un
// token JWT guardado en localStorage bajo la clave token. En la iteración
// anterior los tests usaban una clave distinta; aquí adaptamos los tests para
// inyectar un token simulado que contenga el rol esperado.

// Limpiamos el localStorage antes de cada prueba para evitar interferencias.
beforeEach(() => {
  localStorage.clear();
});

// Helper: construye un token JWT simulado con un payload dado.
// Para simular el token no necesitamos una
// firma válida, basta con que el payload (segunda parte) sea un JSON base64.
function makeToken(payloadObject) {
  const header = 'eyJhbGciOiJub25lIn0'; // header: {"alg":"none"}
  const payload = Buffer.from(JSON.stringify(payloadObject)).toString('base64');
  const signature = 'signature';
  return `${header}.${payload}.${signature}`;
}

// Caso 1: Si no hay token, debe redirigir al login (no mostrar contenido privado)
it('redirige a /iniciar-sesion si no hay token en localStorage', () => {
  render(
    <MemoryRouter initialEntries={['/backoffice']}>
      <PrivateRoute adminOnly={true}>
        <div>Contenido Privado</div>
      </PrivateRoute>
    </MemoryRouter>
  );
  // No debe mostrar el contenido privado porque no hay token
  expect(screen.queryByText(/contenido privado/i)).not.toBeInTheDocument();
});

// Caso 2: Si el token existe pero el rol no es administrador, debe redirigir a /
it('redirige a / si el rol no está permitido', () => {
  // Creamos un token cuyo payload tenga roles distinto de 'ROLE_ADMIN'
  const token = makeToken({ roles: 'ROLE_USER' });
  localStorage.setItem('token', token);

  render(
    <MemoryRouter initialEntries={['/backoffice']}>
      <PrivateRoute adminOnly={true}>
        <div>Contenido Privado</div>
      </PrivateRoute>
    </MemoryRouter>
  );

  // Como el rol no es ROLE_ADMIN, no debe mostrarse el contenido privado
  expect(screen.queryByText(/contenido privado/i)).not.toBeInTheDocument();
});

// Caso 3: Si el token contiene el rol ROLE_ADMIN, se debe mostrar el contenido
it('muestra el contenido si el rol está permitido', () => {
  // Creamos un token con payload.roles = 'ROLE_ADMIN'
  const token = makeToken({ roles: 'ROLE_ADMIN' });
  localStorage.setItem('token', token);

  render(
    <MemoryRouter initialEntries={['/backoffice']}>
      <PrivateRoute adminOnly={true}>
        <div>Contenido Privado</div>
      </PrivateRoute>
    </MemoryRouter>
  );

  // Debe mostrar el contenido privado porque el rol decodificado es 'ROLE_ADMIN'
  expect(screen.getByText(/contenido privado/i)).toBeInTheDocument();
});