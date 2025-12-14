
import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { getOrders, updateOrder, deleteOrder, addProductToOrder, removeProductFromOrder, getProducts } from "../services/api";

// Función para extraer roles desde el token JWT
function getUserRolesFromToken() {
  const token = localStorage.getItem('token');
  if (!token) return [];
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.roles) {
      return payload.roles.split(',');
    }
    return [];
  } catch (error) {
    return [];
  }
}

const Boletas = () => {
  // Helpers de roles
  const roles = getUserRolesFromToken();
  const isAdmin = roles.includes("ADMIN");
  const isGerente = roles.includes("GERENTE");
  const isLogistica = roles.includes("LOGISTICA");
  const puedeGestionar = isAdmin || isGerente || isLogistica;
  const puedeEditarEliminar = isAdmin || isGerente;
  const puedeEliminarProducto = isAdmin || isGerente;
  const [boletas, setBoletas] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedBoleta, setSelectedBoleta] = useState(null);
  const [editingBoleta, setEditingBoleta] = useState(null);

  // Productos para dropdown
  const [productosDisponibles, setProductosDisponibles] = useState([]);
  const [productoAAgregar, setProductoAAgregar] = useState("");

  // Cargar productos disponibles una vez
  useEffect(() => {
    async function cargarProductos() {
      try {
        const productos = await getProducts();
        setProductosDisponibles(productos);
      } catch (e) {
        setProductosDisponibles([]);
      }
    }
    cargarProductos();
  }, []);

  // Cargar boletas desde el backend
  useEffect(() => {
    async function cargar() {
      try {
        const data = await getOrders();
        setBoletas(
          data.map(o => ({
            numero: o.id,
            cliente: "Cliente N/A",
            monto: o.total ?? 0,
            fecha: o.fecha?.substring(0, 10) ?? "Sin fecha",
            productos: o.productos ?? [],
            estado: o.estado || "PENDIENTE"
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
        estado: editingBoleta.estado
      });
      setBoletas(prev => prev.map(b => (b.numero === updatedBoleta.id ? {
        ...b,
        monto: updatedBoleta.total,
        fecha: updatedBoleta.fecha,
        estado: updatedBoleta.estado
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

  // Si el usuario no tiene permisos, mostrar modal de acceso denegado
  if (!puedeGestionar) {
    return (
      <Modal show={true} backdrop="static" keyboard={false} centered>
        <Modal.Header>
          <Modal.Title>Acceso denegado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          No tienes permisos para ver esta sección.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => window.location.href = '/'}>
            Ir al inicio
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

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
            <th>Estado</th>
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
                <td>{boleta.estado}</td>
                <td>
                  <Button size="sm" variant="info" onClick={() => handleViewBoleta(boleta.numero)}>
                    Ver
                  </Button>{' '}
                  {puedeEditarEliminar && (
                    <>
                      <Button size="sm" variant="warning" onClick={() => handleEditBoleta(boleta.numero)}>
                        Editar
                      </Button>{' '}
                      <Button size="sm" variant="danger" onClick={() => handleDeleteBoleta(boleta.numero)}>
                        Eliminar
                      </Button>
                    </>
                  )}
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
              <Form.Group>
                <Form.Label>Estado</Form.Label>
                <Form.Select
                  value={editingBoleta.estado}
                  onChange={e => setEditingBoleta({ ...editingBoleta, estado: e.target.value })}
                  disabled={!puedeEditarEliminar}
                >
                  <option value="PENDIENTE">PENDIENTE</option>
                  <option value="ENVIADO">ENVIADO</option>
                  <option value="ENTREGADO">ENTREGADO</option>
                </Form.Select>
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
                  {puedeEliminarProducto && (
                    <Button size="sm" variant="danger" onClick={() => handleRemoveProduct(selectedBoleta.numero, p.id)}>
                      Eliminar
                    </Button>
                  )}
                </p>
              ))
            )}

            {/* Dropdown para agregar producto */}
            {puedeEditarEliminar && (
              <Form className="mt-3">
                <Form.Group controlId="agregarProducto">
                  <Form.Label>Agregar producto a la orden</Form.Label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Form.Select
                      value={productoAAgregar}
                      onChange={e => setProductoAAgregar(e.target.value)}
                    >
                      <option value="">Selecciona un producto</option>
                      {productosDisponibles.map(prod => (
                        <option key={prod.id} value={prod.id}>
                          {prod.name} (${prod.price?.toLocaleString("es-CL")})
                        </option>
                      ))}
                    </Form.Select>
                    <Button
                      variant="success"
                      size="sm"
                      disabled={!productoAAgregar}
                      onClick={async () => {
                        await handleAddProduct(selectedBoleta.numero, productoAAgregar);
                        setProductoAAgregar("");
                        // Refrescar productos en el modal
                        const actualizada = boletas.find(b => b.numero === selectedBoleta.numero);
                        setSelectedBoleta(actualizada);
                      }}
                    >
                      Agregar
                    </Button>
                  </div>
                </Form.Group>
              </Form>
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
