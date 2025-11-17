// Suite de pruebas del formulario de registro: validamos que cada regla de negocio
// muestre su mensaje y que el flujo exitoso abra el modal final.
import { render, screen, waitFor, cleanup } from '@testing-library/react';

// Limpiamos el DOM de Testing Library tras cada prueba para empezar desde cero.
afterEach(() => {
  cleanup();
});
import RegisterForm from './RegisterForm';
import userEvent from '@testing-library/user-event';

// Caso base: enviar el formulario vacío debe disparar todos los mensajes obligatorios.
it('muestra errores si se envía el formulario vacío', async () => {
  render(<RegisterForm />);
  const submitButton = screen.getByRole('button', { name: /registrarse/i });
  await userEvent.click(submitButton);
  expect(await screen.findByTestId('error-nombre')).toHaveTextContent(/el nombre es obligatorio/i);
  expect(await screen.findByTestId('error-rut')).toHaveTextContent(/el rut es obligatorio/i);
  expect(await screen.findByTestId('error-email')).toHaveTextContent(/el correo es obligatorio/i);
  expect(await screen.findByTestId('error-password')).toHaveTextContent(/la contraseña es obligatoria/i);
});
// Verificamos que todos los campos principales estén presentes en pantalla.
it('renderiza los campos principales del formulario', () => {
  render(<RegisterForm />);
  expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/rut/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/correo/i)).toBeInTheDocument();
  // Usamos un matcher exacto para 'Contraseña' para evitar conflicto con 'Confirmar contraseña'
  expect(screen.getByLabelText(/^contraseña$/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/confirmar contraseña/i)).toBeInTheDocument();
});
// Si el nombre incluye números, debemos mostrar el mensaje de formato inválido.
it('muestra error si el nombre tiene caracteres inválidos', async () => {
  render(<RegisterForm />);
  const nameInput = screen.getByLabelText(/nombre/i);
  await userEvent.type(nameInput, 'Juan123');
  const submitButton = screen.getByRole('button', { name: /registrarse/i });
  await userEvent.click(submitButton);
  await waitFor(() => {
    expect(screen.getByTestId('error-nombre')).toHaveTextContent(/por favor ingresar un nombre válido/i);
  });
});
// El RUT debe respetar el patrón XX.XXX.XXX-X; aquí omitimos un punto a propósito.
it('muestra error si el RUT tiene formato incorrecto', async () => {
  render(<RegisterForm />);
  const rutInput = screen.getByLabelText(/rut/i);
  await userEvent.type(rutInput, '12345678-5'); // Falta el punto en el formato
  const submitButton = screen.getByRole('button', { name: /registrarse/i });
  await userEvent.click(submitButton);
  await waitFor(() => {
    expect(screen.getByTestId('error-rut')).toHaveTextContent(/el formato debe ser xx\.xxx\.xxx-x/i);
  });
});
// Correos sin @ y dominio deben rechazarse.
it('muestra error si el correo es inválido', async () => {
  render(<RegisterForm />);
  const emailInput = screen.getByLabelText(/correo/i);
  await userEvent.type(emailInput, 'correo-invalido');
  const submitButton = screen.getByRole('button', { name: /registrarse/i });
  await userEvent.click(submitButton);
  await waitFor(() => {
    expect(screen.getByTestId('error-email')).toHaveTextContent(/el correo no es válido/i);
  });
});
// Repetimos la validación de contraseña para cubrir ausencia y longitud mínima.
it('muestra error si la contraseña está vacía', async () => {
  render(<RegisterForm />);
  const submitButton = screen.getByRole('button', { name: /registrarse/i });
  await userEvent.click(submitButton);
  await waitFor(() => {
    expect(screen.getByTestId('error-password')).toHaveTextContent(/la contraseña es obligatoria/i);
  });
});

it('muestra error si la contraseña es muy corta', async () => {
  render(<RegisterForm />);
  const passwordInput = screen.getByLabelText(/^contraseña$/i);
  await userEvent.type(passwordInput, 'abc');
  const submitButton = screen.getByRole('button', { name: /registrarse/i });
  await userEvent.click(submitButton);
  await waitFor(() => {
    expect(screen.getByTestId('error-password')).toHaveTextContent(/la contraseña debe tener al menos 8 caracteres/i);
  });
});
// Confirmación de contraseña debe igualar la original.
it('muestra error si las contraseñas no coinciden', async () => {
  render(<RegisterForm />);
  const passwordInput = screen.getByLabelText(/^contraseña$/i);
  const confirmPasswordInput = screen.getByLabelText(/confirmar contraseña/i);
  await userEvent.type(passwordInput, 'Password123');
  await userEvent.type(confirmPasswordInput, 'Password321');
  const submitButton = screen.getByRole('button', { name: /registrarse/i });
  await userEvent.click(submitButton);
  await waitFor(() => {
    expect(screen.getByTestId('error-confirmPassword')).toHaveTextContent(/las contraseñas no coinciden/i);
  });
});
// Flujo feliz: cargamos datos válidos y esperamos que se abra el modal de éxito.
it('muestra el modal de éxito al registrar correctamente', async () => {
  render(<RegisterForm />);
  await userEvent.type(screen.getByLabelText(/nombre/i), 'Juan Pérez');
  await userEvent.type(screen.getByLabelText(/rut/i), '12.345.678-5');
  await userEvent.type(screen.getByLabelText(/correo/i), 'juan@correo.com');
  await userEvent.type(screen.getByLabelText(/^contraseña$/i), 'Password123');//busca exactamente el texto "contraseña" (sin nada antes ni después), ignorando si está en mayúsculas o minúsculas.
  await userEvent.type(screen.getByLabelText(/confirmar contraseña/i), 'Password123');
  const submitButton = screen.getByRole('button', { name: /registrarse/i });
  await userEvent.click(submitButton);
  expect(screen.getByText(/registro exitoso/i)).toBeInTheDocument();
});
