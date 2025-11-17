import React, { useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";

const Boletas = () => {
  // Datos de ejemplo de boletas
  const [boletas] = useState([
    { numero: "1001", cliente: "Juan Pérez", monto: 25000, fecha: "2025-10-10" },
    { numero: "1002", cliente: "María Soto", monto: 18000, fecha: "2025-10-11" },
    { numero: "1003", cliente: "Carlos Ruiz", monto: 32000, fecha: "2025-10-12" },
    { numero: "1004", cliente: "Ana Gómez", monto: 15000, fecha: "2025-10-13" },
    { numero: "1005", cliente: "Luis Fernández", monto: 22000, fecha: "2025-10-14" },
    { numero: "1006", cliente: "Sofía Martínez", monto: 27500, fecha: "2025-10-15" },
    { numero: "1007", cliente: "Diego López", monto: 30000, fecha: "2025-10-16" },
    { numero: "1008", cliente: "Valentina Rojas", monto: 19500, fecha: "2025-10-17" },
  ]);
  const [search, setSearch] = useState("");
  const filteredBoletas = search
    ? boletas.filter(b => b.numero.includes(search))
    : boletas;
  const [showModal, setShowModal] = useState(false);
  const [selectedBoleta, setSelectedBoleta] = useState(null);

  const handleViewBoleta = (numero) => {
    const boleta = boletas.find(b => b.numero === numero);
    setSelectedBoleta(boleta);
    setShowModal(true);
  };
  return (
    <div>
      <h2 className="mb-4">Boletas / Órdenes</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control w-auto d-inline-block"
          placeholder="Buscar por N° de orden"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>N° Orden</th>
            <th>Cliente</th>
            <th>Monto</th>
            <th>Fecha</th>
            <th>Ver Boleta</th>
          </tr>
        </thead>
        <tbody>
          {filteredBoletas.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-4">No hay boletas registradas.</td>
            </tr>
          ) : (
            filteredBoletas.map((boleta, idx) => (
              <tr key={idx}>
                <td>{boleta.numero}</td>
                <td>{boleta.cliente}</td>
                <td>${boleta.monto.toLocaleString('es-CL')}</td>
                <td>{boleta.fecha}</td>
                <td>
                  <Button size="sm" variant="info" onClick={() => handleViewBoleta(boleta.numero)}>
                    Ver boleta
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      {/* Modal para mostrar detalle de boleta */}
      {selectedBoleta && (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Detalle de Boleta</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>N° Orden:</strong> {selectedBoleta.numero}</p>
            <p><strong>Cliente:</strong> {selectedBoleta.cliente}</p>
            <p><strong>Monto:</strong> ${selectedBoleta.monto.toLocaleString('es-CL')}</p>
            <p><strong>Fecha:</strong> {selectedBoleta.fecha}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Boletas;
