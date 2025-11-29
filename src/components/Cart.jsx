import React from "react";
import { getImageSrc } from './Images';
import { Link, useNavigate } from "react-router-dom";

const Cart = ({ cart, onRemove, onUpdateQuantity }) => {
  const navigate = useNavigate();

  // Calcular total
  const calculateTotal = () => {
    // Hacemos el cálculo de forma defensiva:
    // - si el item trae `priceRaw` (número), lo usamos directamente.
    // - si trae `price` como número lo usamos.
    // - si trae `price` como string formateada ("$3.590"), la limpiamos.
    const totalNumber = cart.reduce((sum, item) => {
      const qty = item.quantity || 1;
      const priceNum = item.priceRaw ?? (
        typeof item.price === 'number'
          ? item.price
          : Number(String(item.price || '').replace(/[^0-9]/g, '')) || 0
      );
      return sum + priceNum * qty;
    }, 0);

    return totalNumber.toLocaleString("es-CL", { style: "currency", currency: "CLP" });
  };

  return (
    <section id="cart" className="cart-section container my-5">
      <h3 className="mb-4">🛒 Tu Carrito</h3>
      {cart.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => {
                // Normalizar precio de cada item de forma defensiva para los cálculos
                const qty = item.quantity || 1;
                const priceNum = item.priceRaw ?? (
                  typeof item.price === 'number'
                    ? item.price
                    : Number(String(item.price || '').replace(/[^0-9]/g, '')) || 0
                );
                const subtotal = priceNum * qty;

                // Mostrar precio: preferimos la cadena formateada `item.price` si existe,
                // sino generamos una a partir de `priceNum`.
                const displayPrice = (typeof item.price === 'string' && item.price.trim() !== '')
                  ? item.price
                  : priceNum.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });

                return (
                  <tr key={item.id}>
                    <td className="d-flex align-items-center">
                      <img
                        src={getImageSrc(item.img)}
                        alt={item.title}
                        style={{
                          width: "60px",
                          height: "60px",
                          marginRight: "10px",
                          objectFit: "cover",
                        }}
                      />
                      {item.title}
                    </td>
                    <td>{displayPrice}</td>
                    <td>
                      <input
                        type="number"
                        value={item.quantity}
                        min="1"
                        className="form-control"
                        style={{ width: "70px" }}
                        onChange={(e) =>
                          onUpdateQuantity(item.id, parseInt(e.target.value))
                        }
                      />
                    </td>
                    <td>
                      {subtotal.toLocaleString("es-CL", {
                        style: "currency",
                        currency: "CLP",
                      })}
                    </td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => onRemove(item.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="text-end mt-3">
            <h5>Total: {calculateTotal()}</h5>
            <button
              className="btn btn-success mt-2"
              onClick={() => navigate("/Pago", { state: { cart } })}
            >
              Proceder al Pago
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Cart;
