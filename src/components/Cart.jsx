import React from "react";
import images from "../assets/images";
import { Link, useNavigate } from "react-router-dom";

const Cart = ({ cart, onRemove, onUpdateQuantity }) => {
  const navigate = useNavigate();

  // Calcular total
  const calculateTotal = () => {
    return cart
      .reduce((sum, item) => {
        // quitamos los puntos y el $ para parsear el precio
        const price = parseInt(item.price.replace(/[$.]/g, ""));
        return sum + price * item.quantity;
      }, 0)
      .toLocaleString("es-CL", { style: "currency", currency: "CLP" });
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
                const price = parseInt(item.price.replace(/[$.]/g, ""));
                const subtotal = price * item.quantity;

                return (
                  <tr key={item.id}>
                    <td className="d-flex align-items-center">
                      <img
                        src={images[item.img]}
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
                    <td>{item.price}</td>
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
