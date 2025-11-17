// Pruebas para la lógica de la categoría
//utilizando la función de filtrado de productos
/*
const filtrarProductos = (productos, filtro) =>
  filtro
    ? productos.filter(p => p.nombre.toLowerCase().includes(filtro.toLowerCase()))
    : productos;
*/
import { describe, it, expect } from 'vitest';

// Lógica de filtrado extraída
const filtrarProductos = (productos, filtro) =>
  filtro
    ? productos.filter(p => p.nombre.toLowerCase().includes(filtro.toLowerCase()))
    : productos;

describe('filtrarProductos', () => {
  const productos = [
    { nombre: 'Chocolate Orgánico' },
    { nombre: 'Mix Frutos Secos' },
    { nombre: 'Mermelada Frutal' }
  ];

  it('devuelve todos los productos si el filtro está vacío', () => {
    expect(filtrarProductos(productos, '')).toHaveLength(3);
  });

  it('filtra productos por nombre', () => {
    expect(filtrarProductos(productos, 'chocolate')).toEqual([{ nombre: 'Chocolate Orgánico' }]);
    expect(filtrarProductos(productos, 'mix')).toEqual([{ nombre: 'Mix Frutos Secos' }]);
  });

  it('no distingue mayúsculas/minúsculas', () => {
    expect(filtrarProductos(productos, 'frutal')).toEqual([{ nombre: 'Mermelada Frutal' }]);
    expect(filtrarProductos(productos, 'FRUTAL')).toEqual([{ nombre: 'Mermelada Frutal' }]);
  });
});