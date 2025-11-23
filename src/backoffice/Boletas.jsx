import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { getOrders, updateOrder, deleteOrder, addProductToOrder, removeProductFromOrder } from "../services/api";

const Boletas = () => {
  const [boletas, setBoletas] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedBoleta, setSelectedBoleta] = useState(null);
  const [editingBoleta, setEditingBoleta] = useState(null);

  // Cargar boletas desde el backend
  useEffect(() => {
    async function cargar() {
      try {
        const data = await getOrders();
        setBoletas(
          data.map(o => ({
            numero: o.id,
            cliente: "Cliente N/A", // ← si después le agregas cliente al backend, lo mapeamos
            monto: o.total ?? 0,
            fecha: o.fecha?.substring(0, 10) ?? "Sin fecha",
            productos: o.productos ?? []
          }))
        );
      } catch (e) {
        console.error("Error cargando pedidos", e);
      }
    }
    cargar();
  }, []);

  const filteredBoletas = search
    ? boletas.filter(b => String(b.numero).includes(search))
    : boletas;

  const handleViewBoleta = (numero) => {
    const boleta = boletas.find(b => String(b.numero) === String(numero));
    setSelectedBoleta(boleta);
    setShowModal(true);
  };

  const handleEditBoleta = (numero) => {
    const boleta = boletas.find(b => String(b.numero) === String(numero));
    setEditingBoleta(boleta);
  };

  const handleSaveEdit = async () => {
    if (editingBoleta) {
      try {
        const updatedBoleta = await updateOrder(editingBoleta.numero, {
          total: editingBoleta.monto,
          fecha: editingBoleta.fecha,
        });
        setBoletas(prev => prev.map(b => (b.numero === updatedBoleta.id ? {
          ...b,
          monto: updatedBoleta.total,
          fecha: updatedBoleta.fecha,
        } : b)));
        setEditingBoleta(null);
      } catch (e) {
        console.error("Error actualizando boleta", e);
      }
    }
  };

  const handleDeleteBoleta = async (numero) => {
    try {
      await deleteOrder(numero);
      setBoletas(prev => prev.filter(b => b.numero !== numero));
    } catch (e) {
      console.error("Error eliminando boleta", e);
    }
  };

  const handleAddProduct = async (idPedido, idProducto) => {
    try {
      const updatedBoleta = await addProductToOrder(idPedido, idProducto);
      setBoletas(prev => prev.map(b => (b.numero === updatedBoleta.id ? {
        ...b,
        productos: updatedBoleta.productos,
      } : b)));
    } catch (e) {
      console.error("Error añadiendo producto a la boleta", e);
    }
  };

  const handleRemoveProduct = async (idPedido, idProducto) => {
    try {
      const updatedBoleta = await removeProductFromOrder(idPedido, idProducto);
      setBoletas(prev => prev.map(b => (b.numero === updatedBoleta.id ? {
        ...b,
        productos: updatedBoleta.productos,
      } : b)));
    } catch (e) {
      console.error("Error eliminando producto de la boleta", e);
    }
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
            <th>Monto</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredBoletas.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-4">No hay boletas registradas.</td>
            </tr>
          ) : (
            filteredBoletas.map((boleta, idx) => (
              <tr key={idx}>
                <td>{boleta.numero}</td>
                <td>${boleta.monto?.toLocaleString("es-CL")}</td>
                <td>{boleta.fecha}</td>
                <td>
                  <Button size="sm" variant="info" onClick={() => handleViewBoleta(boleta.numero)}>
                    Ver
                  </Button>{' '}
                  <Button size="sm" variant="warning" onClick={() => handleEditBoleta(boleta.numero)}>
                    Editar
                  </Button>{' '}
                  <Button size="sm" variant="danger" onClick={() => handleDeleteBoleta(boleta.numero)}>
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {editingBoleta && (
        <Modal show={true} onHide={() => setEditingBoleta(null)}>
          <Modal.Header closeButton>
            <Modal.Title>Editar Boleta</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Monto</Form.Label>
                <Form.Control
                  type="number"
                  value={editingBoleta.monto}
                  onChange={(e) => setEditingBoleta({ ...editingBoleta, monto: e.target.value })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Fecha</Form.Label>
                <Form.Control
                  type="date"
                  value={editingBoleta.fecha}
                  onChange={(e) => setEditingBoleta({ ...editingBoleta, fecha: e.target.value })}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setEditingBoleta(null)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleSaveEdit}>
              Guardar Cambios
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {selectedBoleta && (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Detalle de Boleta</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>N° Orden:</strong> {selectedBoleta.numero}</p>
            <p><strong>Monto:</strong> ${selectedBoleta.monto.toLocaleString("es-CL")}</p>
            <p><strong>Fecha:</strong> {selectedBoleta.fecha}</p>

            <hr />
            <h5>Productos</h5>
            {selectedBoleta.productos.length === 0 ? (
              <p>Sin productos</p>
            ) : (
              selectedBoleta.productos.map((p, idx) => (
                <p key={idx}>
                  - {p.name} (${p.price?.toLocaleString("es-CL")})
                  <Button size="sm" variant="danger" onClick={() => handleRemoveProduct(selectedBoleta.numero, p.id)}>
                    Eliminar
                  </Button>
                </p>
              ))
            )}
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
