import React, { useState } from "react";
import { Table, Button, Badge } from "react-bootstrap";

const Accounts = () => {
  const [accounts] = useState([
    { id: 1, name: "Admin", email: "admin@ecomarket.cl", role: "Administrador" },
    { id: 2, name: "Juan Pérez", email: "juanp@example.com", role: "Cliente" },
    { id: 3, name: "María Soto", email: "marias@example.com", role: "Cliente" },
  ]);

  return (
    <div>
      <h2 className="mb-4">Gestión de Cuentas</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((acc) => (
            <tr key={acc.id}>
              <td>{acc.id}</td>
              <td>{acc.name}</td>
              <td>{acc.email}</td>
              <td>
                <Badge
                  bg={acc.role === "Administrador" ? "primary" : "secondary"}
                >
                  {acc.role}
                </Badge>
              </td>
              <td>
                <Button size="sm" variant="outline-primary" className="me-2">
                  Editar
                </Button>
                <Button size="sm" variant="outline-danger">
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

export default Accounts;
