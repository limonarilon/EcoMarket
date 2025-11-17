
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import formattedImages from "../assets/images/index";

const Pago = () => {
  const location = useLocation();
  const cart = location.state?.cart || [];
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(true);
  const [metodoPago, setMetodoPago] = useState("transbank");
  const [orderNumber] = useState(() => Math.floor(Math.random() * 100000));

  // Calcular total
  const calculateTotal = () => {
    return cart
      .reduce((sum, item) => {
        const price = parseInt(item.price.replace(/[$.]/g, ""));
        return sum + price * item.quantity;
      }, 0)
      .toLocaleString("es-CL", { style: "currency", currency: "CLP" });
  };

  // Abrir modal según resultado
  const handlePayment = (success) => {
    setModalSuccess(success);
    setModalOpen(true);
  };

  // Texto legible para método de pago
  const metodoPagoTexto = {
    transbank: "Transbank",
    efectivo: "Efectivo (pago al recibir)",
    transferencia: "Transferencia"
  };

  return (
    <section
      className="container my-5 position-relative"
      style={{
        backgroundImage: `url(${formattedImages["banner-pago"]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: "16px",
        boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
        overflow: "hidden",
      }}
    >
      <h3 className="section-title-llamativo">Simulación de Pago</h3>
  <h3>N° de orden {orderNumber}</h3>
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
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => {
                const price = parseInt(item.price.replace(/[$.]/g, ""));
                const subtotal = price * item.quantity;
                return (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>
                      {subtotal.toLocaleString("es-CL", {
                        style: "currency",
                        currency: "CLP",
                      })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* Selector de método de pago */}
          <div className="my-4 d-flex align-items-center">
            <label htmlFor="metodoPago" className="form-label fw-bold me-2 mb-0">Selecciona método de pago:</label>
            <select
              id="metodoPago"
              className="form-select"
              style={{ width: "auto", minWidth: "220px", display: "inline-block" }}
              value={metodoPago}
              onChange={e => setMetodoPago(e.target.value)}
            >
              <option value="transbank">Transbank</option>
              <option value="efectivo">Efectivo (pago al recibir)</option>
              <option value="transferencia">Transferencia</option>
            </select>
          </div>
          <div className="text-end mt-3">
            <div
              style={{
                background: "rgba(255,255,255,0.95)",
                borderRadius: "12px",
                display: "inline-block",
                padding: "0.75rem 1.5rem",
                marginBottom: "1rem",
                boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
              }}
            >
              <h5 className="mb-0">Total: {calculateTotal()}</h5>
            </div>
            <div>
              <button
                className="btn btn-success me-2"
                onClick={() => handlePayment(true)}
              >
                Simular Pago Exitoso
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handlePayment(false)}
              >
                Simular Pago Fallido
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "2rem",
              borderRadius: "8px",
              textAlign: "center",
              minWidth: "300px",
            }}
          >
            <h4>
              {modalSuccess
                ? "¡Pago realizado con éxito!"
                : "El pago ha fallado. Intenta nuevamente."}
            </h4>
            <p className="mt-2">Método de pago: <strong>{metodoPagoTexto[metodoPago]}</strong></p>
            <button
              className="btn btn-primary mt-3"
              onClick={() => setModalOpen(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Pago;