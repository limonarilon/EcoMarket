import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";

const Products = () => {
  const [products] = useState([
    { id: 1, name: "Aceite de Coco", price: "$8.500", stock: 25 },
    { id: 2, name: "Quinoa Premium", price: "$6.000", stock: 42 },
    { id: 3, name: "Pasta Integral", price: "$3.200", stock: 60 },
  ]);

  return (
    <div>
      <h2 className="mb-4">Gestión de Productos</h2>
      <div className="d-flex justify-content-end mb-3">
        <Button variant="success">+ Nuevo Producto</Button>
      </div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod.id}>
              <td>{prod.id}</td>
              <td>{prod.name}</td>
              <td>{prod.price}</td>
              <td>{prod.stock}</td>
              <td>
                <Button size="sm" variant="primary" className="me-2">
                  Editar
                </Button>
                <Button size="sm" variant="danger">
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Products;
