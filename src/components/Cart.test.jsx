//Test para el componente de carrito de compras
//Renderizado básico, renderizado de productos, lógica del total, interacción: elimninar producto, actualizar cantidad
import { render, screen } from '@testing-library/react';
import Cart from './Cart';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent } from '@testing-library/react';

it('muestra mensaje si el carrito está vacío',()=>{
    render(
      <MemoryRouter>
        <Cart cart={[]} onRemove={()=>{}} onUpdateQuantity={()=>{}}/>
      </MemoryRouter>
    );
    expect(screen.getByText(/no hay productos en el carrito/i)).toBeInTheDocument();
});
//esta prueba usa productos mock de ejemplo para asegurarse que se renderizan correctamente en el carrito
it('muestra los productos en el carrito', () => {
  const cart = [
    { id: 1, title: 'Producto 1', price: '$1.000', quantity: 2, img: 'fruta-congelada' },
    { id: 2, title: 'Producto 2', price: '$2.000', quantity: 1, img: 'kombucha' }
  ];
  render(
    <MemoryRouter>
      <Cart cart={cart} onRemove={() => {}} onUpdateQuantity={() => {}} />
    </MemoryRouter>
  );
  // Verificamos que los nombres de los productos estén en el documento
  expect(screen.getByText('Producto 1')).toBeInTheDocument();
  expect(screen.getByText('Producto 2')).toBeInTheDocument();
  // Verificamos que el precio único esté presente
  expect(screen.getByText('$1.000')).toBeInTheDocument();
  // getAllByText retorna un array, así que verificamos la cantidad y que cada elemento esté en el documento
  const precios = screen.getAllByText('$2.000');
  // Esperamos que haya al menos un elemento con ese precio, se puede ajustar el número si se desea
  expect(precios.length).toBeGreaterThan(0); // Explicación: Comprobamos que se encontraron elementos con ese texto
  precios.forEach(el => expect(el).toBeInTheDocument()); // Explicación: Cada elemento debe estar en el documento
});
//Queremos asegurarnos de que el total mostrado corresponde a la suma de los subtotales de los productos.
it('calcula correctamente el total del carrito', () => {
  const cart = [
    { id: 1, title: 'Producto 1', price: '$1.000', quantity: 2, img: 'fruta-congelada' },
    { id: 2, title: 'Producto 2', price: '$2.000', quantity: 1, img: 'kombucha' }
  ];
  render(
    <MemoryRouter>
      <Cart cart={cart} onRemove={() => {}} onUpdateQuantity={() => {}} />
    </MemoryRouter>
  );
  expect(screen.getByText(/Total: \$4\.000/)).toBeInTheDocument();
});
//Queremos asegurarnos de que al hacer clic en el botón de eliminar, se llama a la función onRemove con el id correcto.
it('llama a onRemove con el id correcto al eliminar un producto', async () => {
  const cart = [
    { id: 1, title: 'Producto 1', price: '$1.000', quantity: 2, img: 'fruta-congelada' }
  ];
  // Simulamos la función onRemove para verificar que se llama correctamente
  const onRemove = vi.fn();
  render(
    <MemoryRouter>
      <Cart cart={cart} onRemove={onRemove} onUpdateQuantity={() => {}} />
    </MemoryRouter>
  );
  // Buscamos el botón de eliminar por su texto
  const removeButton = screen.getByRole('button', { name: /eliminar/i });
  // Usamos await para asegurar que el evento se procesa correctamente
  await userEvent.click(removeButton);
  // Verificamos que la función simulada se haya llamado con el id correcto
  expect(onRemove).toHaveBeenCalledWith(1); // Explicación: Debe llamarse con el id del producto eliminado
});
//asegurarnos de que, al cambiar el valor del input de cantidad, 
// se llama a la función onUpdateQuantity con el id y la nueva cantidad.
it('llama a onUpdateQuantity con el id y cantidad correctos al cambiar la cantidad', async () => {
  const cart = [
    { id: 1, title: 'Producto 1', price: '$1.000', quantity: 2, img: 'fruta-congelada' }
  ];
  const onUpdateQuantity = vi.fn();//simular la función onUpdateQuantity
  render(
    <MemoryRouter>
      <Cart cart={cart} onRemove={() => {}} onUpdateQuantity={onUpdateQuantity} />
    </MemoryRouter>
  );
  const quantityInput = screen.getByDisplayValue('2');
  // Usamos fireEvent.change para simular el cambio directo de valor
  fireEvent.change(quantityInput, { target: { value: 5 } });
  // Verificamos que la función se llamó con el id y cantidad correctos
  expect(onUpdateQuantity).toHaveBeenCalledWith(1, 5); // Explicación: Simulamos el cambio y verificamos los argumentos
});