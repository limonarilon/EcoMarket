// Tests unitarios para `getProducts` que verifican cómo se comporta la
// función ante distintas respuestas de la capa HTTP (códigos 200, 400, 403, 500).


import { vi, expect } from 'vitest';
import { getProducts } from './api';
import api from './api';

// Reemplazamos el método  get del cliente axios (api) por un mock
// para controlar exactamente la respuesta de red.

afterEach(() => {
  vi.resetAllMocks();
});

it('devuelve una lista mapeada cuando la respuesta es 200', async () => {
  // Explicación: simulamos un body HAL típico con _embedded.productoModelList
  const apiResp = {
    data: {
      _embedded: {
        productoModelList: [
          { id: 1, nombre: 'Prod A', precio: 1000, imagen: 'img-a' }
        ]
      }
    }
  };

  // Mockear api.get para que resuelva con apiResp
  api.get = vi.fn().mockResolvedValue(apiResp);

  const products = await getProducts();

  // La función debe mapear los campos y devolver un arreglo con objetos
  expect(products).toHaveLength(1);
  expect(products[0].name).toBe('Prod A');
  expect(products[0].price).toBe(1000);
});

it('lanza un error cuando la llamada retorna 500 (error interno de servidor)', async () => {
  // Explicación: si la llamada falla con un error de servidor, la promesa
  // de getProducts debe rechazar para que el componente lo maneje.
  const error = new Error('Internal Server Error');
  // Simular un error axios con response.status = 500
  error.response = { status: 500, data: { error: 'Internal Server Error' } };
  api.get = vi.fn().mockRejectedValue(error);

  await expect(getProducts()).rejects.toThrow();
});

it('lanza un error cuando la llamada retorna 403 (forbidden)', async () => {
  // Explicación: casos de 403 se representan como rechazos con response.status
  const error = new Error('Forbidden');
  error.response = { status: 403, data: { error: 'Forbidden' } };
  api.get = vi.fn().mockRejectedValue(error);

  await expect(getProducts()).rejects.toThrow();
});

it('lanza un error cuando la llamada retorna 400 (bad request)', async () => {
  const error = new Error('Bad Request');
  error.response = { status: 400, data: { error: 'Bad Request' } };
  api.get = vi.fn().mockRejectedValue(error);

  await expect(getProducts()).rejects.toThrow();
});
