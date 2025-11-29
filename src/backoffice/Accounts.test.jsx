// Tests para Accounts.jsx (Backoffice)
// - Mockeamos getUsers para simular distintos códigos HTTP: 200 (OK) y 403 (Forbidden).

import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

// Mock de las funciones del servicio API usadas por Accounts
vi.mock('../services/api', () => ({
  getUsers: vi.fn(),
}));
import { getUsers } from '../services/api';
import Accounts from './Accounts';

// Helper para construir un token JWT falso (payload base64)
function makeToken(payloadObject) {
  const header = 'eyJhbGciOiJub25lIn0';
  const payload = Buffer.from(JSON.stringify(payloadObject)).toString('base64');
  return `${header}.${payload}.sig`;
}

afterEach(() => {
  vi.resetAllMocks();
  localStorage.clear();
});

it('muestra la lista de usuarios cuando la API responde 200 y carga datos', async () => {
  // Aquí simulamos que la API responde con éxito
  // y devuelve una lista con un usuario. Accounts llama a getUsers() en useEffect
  // y luego renderiza la tabla con los usuarios.

  // 1) Preparación: mockear getUsers para que devuelva una lista con un usuario
  getUsers.mockResolvedValue([{ id: 1, name: 'Ana', email: 'ana@ejemplo.com', role: 'ADMIN' }]);

  // 2) Simulamos token admin (aunque Accounts fuerza isAdmin=true para pruebas,
  // es una buena práctica mostrar cómo se haría en producción)
  localStorage.setItem('token', makeToken({ roles: 'ROLE_ADMIN' }));

  // 3) Renderizamos el componente dentro de MemoryRouter (Accounts no necesita ruta
  // en sí, pero usamos MemoryRouter para consistencia con otros tests)
  render(
    <MemoryRouter>
      <Accounts />
    </MemoryRouter>
  );

  // 4) Aserción: esperamos que la tabla haya cargado y que exista una celda
  // cuyo texto sea exactamente "Ana" (coincidencia exacta). Usamos
  // findAllByText con exact: true para evitar capturar el email.
  expect(await screen.findByText(/ana@ejemplo.com/i)).toBeInTheDocument();
  const nameCells = await screen.findAllByText('Ana', { exact: true });
  expect(nameCells.length).toBeGreaterThan(0);
});

it('muestra mensaje de error cuando la API devuelve 403', async () => {
  // Explicación: cuando la API responde con 403 (forbidden), Accounts captura
  // el error y llama a showAlertMessage. Aquí forzamos un rechazo que simula
  // un error axios con response.status = 403.

  // Mock que simula un error de axios con response.status = 403
  getUsers.mockRejectedValue({ response: { status: 403, data: { error: 'Forbidden' } } });

  // Simulamos un token no-admin (opcional)
  localStorage.setItem('token', makeToken({ roles: 'ROLE_USER' }));

  render(
    <MemoryRouter>
      <Accounts />
    </MemoryRouter>
  );

  // Aserción: esperamos que aparezca el texto de alerta "Error al cargar usuarios"
  expect(await screen.findByText(/error al cargar usuarios/i)).toBeInTheDocument();
});