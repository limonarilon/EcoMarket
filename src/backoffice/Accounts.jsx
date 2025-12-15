import React, { useEffect, useState } from "react";
import { Table, Button, Badge, Modal, Form } from "react-bootstrap";
import { getUsers, createUser, updateUser, deleteUser } from "../services/api";

// Función para extraer los roles del usuario desde el token almacenado en localStorage
function getUserRolesFromToken() {
  const token = localStorage.getItem('token');
  if (!token) return [];
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.roles) {
      // Normalizar: quitar prefijo 'ROLE_' si existe
      return payload.roles.split(',').map(role => role.replace(/^ROLE_/, ''));
    }
    return [];
  } catch (error) {
    return [];
  }
}
const Accounts = () => {
  // Estados principales
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    rut: "",
    email: "",
    password: "",
    confirmPassword: "",
    rol: "USER", // Cambiado de "role" a "rol"
  });
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState(null);
  // Función para mostrar mensajes de alerta
  const showAlertMessage = (message, type) => {
    setAlertMessage(message); // Mensaje que se mostrará
    setAlertType(type); // Tipo de alerta (por ejemplo, 'success', 'error')
    setShowAlert(true); // Mostrar la alerta
  };
  // Funciones auxiliares
  // Obtener roles y determinar si es admin
  const roles = getUserRolesFromToken();
  const isAdmin = roles.includes("ADMIN");

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      try {
        const users = await getUsers();
        setAccounts(users);
      } catch {
        showAlertMessage("Error al cargar usuarios", "danger");
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);
                  <Button size="sm" variant="outline-danger" onClick={() => { setAccountToDelete(account.id); setShowDeleteModal(true); }}>Eliminar</Button>


  // VALIDACIONES  
  // Función auxiliar para validar RUT chileno (módulo 11 sacado de internet :P ) 
  const validarRut = (rutCompleto) => {
    rutCompleto = rutCompleto.replace(/\./g, '').replace(/-/g, '');
    if (rutCompleto.length < 2) return false;
    const rut = rutCompleto.slice(0, -1);
    let dv = rutCompleto.slice(-1).toUpperCase();
    let suma = 0;
    let multiplo = 2;
    for (let i = rut.length - 1; i >= 0; i--) {
      suma += parseInt(rut[i], 10) * multiplo;
      multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }
    let dvEsperado = 11 - (suma % 11);
    if (dvEsperado === 11) dvEsperado = '0';
    else if (dvEsperado === 10) dvEsperado = 'K';
    else dvEsperado = dvEsperado.toString();
    return dv === dvEsperado;
  };
  // Validación del formulario
  const validate = (data) => {
    const newErrors = {};
    if (!data.name.trim()) newErrors.name = "El nombre es obligatorio.";
    else if (!/^([a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s]+)$/.test(data.name))
      newErrors.name = "Por favor ingresar un nombre válido.";

    if (!data.rut.trim()) newErrors.rut = "El RUT es obligatorio.";
    else if (!/^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$/.test(data.rut.trim()))
      newErrors.rut = "El formato debe ser XX.XXX.XXX-X";
    else if (!validarRut(data.rut.trim()))
      newErrors.rut = "El RUT ingresado no es válido.";

    if (!data.email.trim()) newErrors.email = "El correo es obligatorio.";
    else if (!/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(data.email))
      newErrors.email = "El correo no es válido.";

    if (!data.password) newErrors.password = "La contraseña es obligatoria.";
    else if (data.password.length < 8) newErrors.password = "La contraseña debe tener al menos 8 caracteres.";
    else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(data.password))
      newErrors.password = "La contraseña debe tener al menos 1 mayúscula, 1 minúscula y 1 número.";

    if (data.confirmPassword !== data.password)
      newErrors.confirmPassword = "Las contraseñas no coinciden.";

    if (!data.rol) newErrors.rol = "El rol es obligatorio."; // Cambiado de "role" a "rol"

    return newErrors;
  };

  /*
  CRUD
  --------------------------
  CREAR USUARIO (Botón Nueva Cuenta)
  EDITAR USUARIO  (Botón Editar en cada fila)
  ELIMINAR USUARIO  (Botón Eliminar en cada fila)
  LISTAR USUARIOS (Carga inicial y después de cada operación)
  */
  
  /*==========================CREATE Y UPDATE=================================*/
  const handleEditAccount = (account) => {
    setEditingAccount(account);
    setFormData({
      name: account.name,
      rut: account.rut || "",
      email: account.email,
      password: "",
      confirmPassword: "",
      rol: account.rol, // Cambiado de "role" a "rol"
    });
    setShowModal(true);
  };

  // Actualización de handleSaveAccount para incluir correctamente el campo password en el payload
  const handleSaveAccount = async () => {
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors({});
    setShowAlert(false);

    const payload = {
      nombre: formData.name,
      email: formData.email,
      rut: formData.rut.replace(/\.|-/g, ''), // Enviar el RUT sin puntos ni guiones
      rol: formData.rol, // Asegurarse de enviar el rol correctamente
    };

    console.log("Payload enviado al backend:", payload); // Log para depuración

    try {
      let newUser;
      if (editingAccount) {
        console.log("Editando usuario con ID:", editingAccount.id); // Log para depuración
        await updateUser(editingAccount.id, payload);
        showAlertMessage("Usuario actualizado exitosamente", "success");
      } else {
        console.log("Creando nuevo usuario"); // Log para depuración
        const response = await createUser(payload);
        console.log("Respuesta del backend:", response); // Log para depuración
        newUser = response; // Capturar el usuario creado
        showAlertMessage("Usuario creado exitosamente", "success");
      }

      if (newUser) {
        setAccounts((prevAccounts) => [...prevAccounts, newUser]);
      } else {
        const users = await getUsers();
        setAccounts(users);
      }

      setShowModal(false);
      setFormData({ name: "", rut: "", email: "", password: "", confirmPassword: "", rol: "USER" });
      setEditingAccount(null);
    } catch (err) {
      let msg = "No se pudo guardar el usuario.";
      if (err.response) {
        console.error("Error del backend:", err.response.data); // Log detallado del error
        console.error("Detalles de la respuesta del backend:", err.response); // Log completo de la respuesta
        if (err.response.status === 409) {
          msg = "El correo electrónico ya está registrado.";
        } else {
          msg = err.response.data.error || err.response.data.message || msg;
        }
      } else {
        console.error("Error desconocido al guardar el usuario:", err); // Log para errores desconocidos
      }
      showAlertMessage(msg, "danger");
    } finally {
      setLoading(false);
    }
  };
  /*==========================DELETE=================================*/
  const handleDeleteAccount = async (accountId) => {
    setLoading(true);
    try {
      await deleteUser(accountId);
      showAlertMessage("Usuario eliminado exitosamente", "success");
      const users = await getUsers();
      setAccounts(users);
    } catch (err) {
      let msg = "No se pudo eliminar el usuario.";
      if (err.response && err.response.data) {
        msg = err.response.data.error || err.response.data.message || msg;
      }
      setShowAlert(true);
      setAlertMessage(msg);
      setAlertType("danger");
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
      setAccountToDelete(null);
    }
  };
  // Handlers 
  //Handler para cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: null }));
  };
  //Hanlder para nueva cuenta
  const handleNewAccount = () => {
    setEditingAccount(null);
    setFormData({ name: "", rut: "", email: "", password: "", confirmPassword: "", rol: "USER" });
    setErrors({});
    setShowModal(true);
  };
  //Handler para cerrar modal
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingAccount(null);
    setFormData({ name: "", rut: "", email: "", password: "", confirmPassword: "", rol: "USER" });
    setErrors({});
  };
  // Si no es admin, mostrar mensaje de acceso denegado
  // Modal de acceso denegado si no es admin
  if (!isAdmin) {
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
      <h2 className="mb-4">Gestión de Cuentas</h2>
      {showAlert && (
        <Alert variant={alertType} onClose={() => setShowAlert(false)} dismissible>
          {alertMessage}
        </Alert>
      )}
      {isAdmin && (
        <Button className="mb-3" onClick={handleNewAccount}>Nueva Cuenta</Button>
      )}
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
                  {isAdmin && (
                    <>
                      <Button size="sm" variant="outline-primary" className="me-2" onClick={() => handleEditAccount(account)}>Editar</Button>
                      <Button size="sm" variant="outline-danger" onClick={() => { setAccountToDelete(account.id); setShowDeleteModal(true); }}>Eliminar</Button>
                    </>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      {/* Modal de confirmación de eliminación fuera del map */}
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
          <Button variant="danger" onClick={() => handleDeleteAccount(accountToDelete)}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingAccount ? "Editar Cuenta" : "Nueva Cuenta"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Nombre */}
            <Form.Group className="mb-3">
              <Form.Label>Nombre completo</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                isInvalid={!!errors.name}
                placeholder="Ingrese el nombre completo"
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>
            {/* RUT */}
            <Form.Group className="mb-3">
              <Form.Label>RUT</Form.Label>
              <Form.Control
                type="text"
                name="rut"
                value={formData.rut}
                onChange={handleInputChange}
                isInvalid={!!errors.rut}
                placeholder="Ej: 12.345.678-5"
              />
              <Form.Control.Feedback type="invalid">
                {errors.rut}
              </Form.Control.Feedback>
            </Form.Group>
            {/* Email */}
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                isInvalid={!!errors.email}
                placeholder="Ingrese el email"
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            {/* Contraseña */}
            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                isInvalid={!!errors.password}
                placeholder="***********"
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            {/* Confirmar contraseña */}
            <Form.Group className="mb-3">
              <Form.Label>Confirmar contraseña</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                isInvalid={!!errors.confirmPassword}
                placeholder="***********"
              />
              <Form.Control.Feedback type="invalid">
                {errors.confirmPassword}
              </Form.Control.Feedback>
            </Form.Group>
            {/* Rol */}
            <Form.Group className="mb-3">
              <Form.Label>Rol</Form.Label>
              <Form.Select
                name="rol"
                value={formData.rol}
                onChange={handleInputChange}
                isInvalid={!!errors.rol}
                disabled={!isAdmin}
              >
                <option value="">Selecciona un rol</option>
                <option value="USER">Usuario</option>
                <option value="ADMIN">Administrador</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.rol}
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
