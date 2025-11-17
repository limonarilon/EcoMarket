import React, { useState } from "react";
import { Table, Button, Badge, Modal, Form, Alert } from "react-bootstrap";


const Accounts = () => {
  // Estado para el modal de confirmación de eliminación
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState(null);
  const [accounts, setAccounts] = useState([
    { id: 1, name: "Admin", email: "admin@ecomarket.cl", role: "Administrador" },
    { id: 2, name: "Juan Pérez", email: "juanp@example.com", role: "Cliente" },
    { id: 3, name: "María Soto", email: "marias@example.com", role: "Cliente" },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Cliente"
  });
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  function generateNewId() {
    return accounts.length > 0 ? Math.max(...accounts.map(a => a.id)) + 1 : 1;
  }

  function showAlertMessage(message, type = "success") {
    setAlertMessage(message);
    setAlertType(type);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  }

  function validateForm() {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido";
    }
    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El email no es válido";
    }
    if (!formData.role) {
      newErrors.role = "El rol es requerido";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleNewAccount() {
    setEditingAccount(null);
    setFormData({ name: "", email: "", role: "Cliente" });
    setErrors({});
    setShowModal(true);
  }

  function handleEditAccount(account) {
    setEditingAccount(account);
    setFormData({ name: account.name, email: account.email, role: account.role });
    setErrors({});
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
    setEditingAccount(null);
    setFormData({ name: "", email: "", role: "Cliente" });
    setErrors({});
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: null }));
  }

  function handleSaveAccount() {
    if (!validateForm()) return;
    
    const accountData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      role: formData.role
    };

    if (editingAccount) {
      // Editar cuenta existente
      setAccounts(prev => prev.map(acc =>
        acc.id === editingAccount.id
          ? { ...acc, ...accountData }
          : acc
      ));
      showAlertMessage("Cuenta actualizada exitosamente", "success");
    } else {
      // Crear nueva cuenta
      const newAccount = {
        id: generateNewId(),
        ...accountData
      };
      setAccounts(prev => [...prev, newAccount]);
      showAlertMessage("Cuenta creada exitosamente", "success");
    }

    handleCloseModal();
  }

  function handleDeleteAccount(accountId) {
    setAccountToDelete(accountId);
    setShowDeleteModal(true);
  }

  return (
    <div>
      <h2 className="mb-4">Gestión de Cuentas</h2>
      {showAlert && (
        <Alert variant={alertType} onClose={() => setShowAlert(false)} dismissible>
          {alertMessage}
        </Alert>
      )}
      <Button className="mb-3" onClick={handleNewAccount}>Nueva Cuenta</Button>
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
          {accounts.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-4">No hay cuentas disponibles.</td>
            </tr>
          ) : (
            accounts.map(account => (
              <tr key={account.id}>
                <td>{account.id}</td>
                <td>{account.name}</td>
                <td>{account.email}</td>
                <td>{account.role}</td>
                <td>
                  <Button size="sm" variant="outline-primary" className="me-2" onClick={() => handleEditAccount(account)}>Editar</Button>
                  <Button size="sm" variant="outline-danger" onClick={() => handleDeleteAccount(account.id)}>Eliminar</Button>
      {/* Modal de confirmación de eliminación */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que quieres eliminar esta cuenta?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={() => {
            setAccounts(prev => prev.filter(acc => acc.id !== accountToDelete));
            showAlertMessage("Cuenta eliminada exitosamente", "success");
            setShowDeleteModal(false);
            setAccountToDelete(null);
          }}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingAccount ? "Editar Cuenta" : "Nueva Cuenta"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                isInvalid={!!errors.name}
                placeholder="Ingrese su nombre"
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                isInvalid={!!errors.email}
                placeholder="Ingrese su email"
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Rol</Form.Label>
              <Form.Select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                isInvalid={!!errors.role}
              >
                <option value="Cliente">Cliente</option>
                <option value="Administrador">Administrador</option>
                <option value="Vendedor">Vendedor</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.role}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSaveAccount}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Accounts;
