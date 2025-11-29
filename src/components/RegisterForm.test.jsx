
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

// Mock del módulo de API para controlar createUser en los tests.
vi.mock('../services/api', () => ({
  createUser: vi.fn()
}));

import RegisterForm from './RegisterForm';
import { createUser } from '../services/api';

// Limpiamos el DOM y los mocks entre pruebas para evitar efectos colaterales.
afterEach(() => {
  cleanup();
  vi.resetAllMocks();
});

// Caso base: enviar el formulario vacío debe disparar todos los mensajes obligatorios.
it('muestra errores si se envía el formulario vacío', async () => {
  // renderizo el formulario y simulo el click en "Registrarse" sin completar campos. Espero que
  // aparezcan los mensajes obligatorios visibles en el DOM.
  render(<RegisterForm />);
  const submitButton = screen.getByRole('button', { name: /registrarse/i });
  await userEvent.click(submitButton);

  // Buscamos los textos exactos que el usuario vería en la interfaz.
  expect(await screen.findByText(/el nombre es obligatorio/i)).toBeInTheDocument();
  expect(await screen.findByText(/el rut es obligatorio/i)).toBeInTheDocument();
  expect(await screen.findByText(/el correo es obligatorio/i)).toBeInTheDocument();
  expect(await screen.findByText(/la contraseña es obligatoria/i)).toBeInTheDocument();
});

// Verificamos que todos los campos principales estén presentes en pantalla.
it('renderiza los campos principales del formulario', () => {
  // Explicación: comprobamos accesibilidad básica usando labels para asegurarnos
  // de que los inputs están correctamente vinculados y visibles.
  render(<RegisterForm />);
  expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/rut/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/correo/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/^contraseña$/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/confirmar contraseña/i)).toBeInTheDocument();
});

// Si el nombre incluye números, debemos mostrar el mensaje de formato inválido.
it('muestra error si el nombre tiene caracteres inválidos', async () => {
  // Explicación: escribimos un nombre con números y enviamos, luego comprobamos
  // que el mensaje de validación correspondiente aparece en pantalla.
  render(<RegisterForm />);
  const nameInput = screen.getByLabelText(/nombre/i);
  await userEvent.type(nameInput, 'Juan123');
  const submitButton = screen.getByRole('button', { name: /registrarse/i });
  await userEvent.click(submitButton);

  expect(await screen.findByText(/por favor ingresar un nombre válido/i)).toBeInTheDocument();
});

// El RUT debe respetar el patrón XX.XXX.XXX-X; aquí omitimos un punto a propósito.
it('muestra error si el RUT tiene formato incorrecto', async () => {
  // Explicación: ingresamos RUT sin puntos y esperamos el mensaje de formato.
  render(<RegisterForm />);
  const rutInput = screen.getByLabelText(/rut/i);
  await userEvent.type(rutInput, '12345678-5'); // Falta el punto en el formato
  const submitButton = screen.getByRole('button', { name: /registrarse/i });
  await userEvent.click(submitButton);

  expect(await screen.findByText(/el formato debe ser xx\.xxx\.xxx-x/i)).toBeInTheDocument();
});

// Correos sin @ y dominio deben rechazarse.
it('muestra error si el correo es inválido', async () => {
  // Explicación: escribimos un correo mal formado y comprobamos el mensaje.
  render(<RegisterForm />);
  const emailInput = screen.getByLabelText(/correo/i);
  await userEvent.type(emailInput, 'correo-invalido');
  const submitButton = screen.getByRole('button', { name: /registrarse/i });
  await userEvent.click(submitButton);

  expect(await screen.findByText(/el correo no es válido/i)).toBeInTheDocument();
});

// Repetimos la validación de contraseña para cubrir ausencia y longitud mínima.
it('muestra error si la contraseña está vacía', async () => {
  // Explicación: sin escribir contraseña, al enviar debe mostrarse el mensaje.
  render(<RegisterForm />);
  const submitButton = screen.getByRole('button', { name: /registrarse/i });
  await userEvent.click(submitButton);

  expect(await screen.findByText(/la contraseña es obligatoria/i)).toBeInTheDocument();
});

it('muestra error si la contraseña es muy corta', async () => {
  // Explicación: escribimos una contraseña muy corta y esperamos la validación de longitud.
  render(<RegisterForm />);
  const passwordInput = screen.getByLabelText(/^contraseña$/i);
  await userEvent.type(passwordInput, 'abc');
  const submitButton = screen.getByRole('button', { name: /registrarse/i });
  await userEvent.click(submitButton);

  expect(await screen.findByText(/la contraseña debe tener al menos 8 caracteres/i)).toBeInTheDocument();
});

// Confirmación de contraseña debe igualar la original.
it('muestra error si las contraseñas no coinciden', async () => {
  // Explicación: completamos contraseñas distintas y comprobamos el mensaje de mismatch.
  render(<RegisterForm />);
  const passwordInput = screen.getByLabelText(/^contraseña$/i);
  const confirmPasswordInput = screen.getByLabelText(/confirmar contraseña/i);
  await userEvent.type(passwordInput, 'Password123');
  await userEvent.type(confirmPasswordInput, 'Password321');
  const submitButton = screen.getByRole('button', { name: /registrarse/i });
  await userEvent.click(submitButton);

  expect(await screen.findByText(/las contraseñas no coinciden/i)).toBeInTheDocument();
});

// Flujo feliz: cargamos datos válidos y esperamos que se abra el modal de éxito.
it('muestra el modal de éxito al registrar correctamente', async () => {
  // Explicación: mockeamos createUser para que resuelva correctamente, luego
  // completamos el formulario con datos válidos y enviamos. Esperamos el
  // título del modal de éxito en el DOM.
  createUser.mockResolvedValue({ data: { success: true } });

  render(<RegisterForm />);
  await userEvent.type(screen.getByLabelText(/nombre/i), 'Juan Pérez');
  await userEvent.type(screen.getByLabelText(/rut/i), '12.345.678-5');
  await userEvent.type(screen.getByLabelText(/correo/i), 'juan@correo.com');
  await userEvent.type(screen.getByLabelText(/^contraseña$/i), 'Password123');
  await userEvent.type(screen.getByLabelText(/confirmar contraseña/i), 'Password123');
  const submitButton = screen.getByRole('button', { name: /registrarse/i });
  await userEvent.click(submitButton);

  // Esperamos el título del modal; usamos findByText para esperar el cambio asíncrono.
  expect(await screen.findByText(/registro exitoso/i)).toBeInTheDocument();
});
