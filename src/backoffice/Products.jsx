import React, { useState } from "react";
import { Table, Button, Modal, Form, Alert } from "react-bootstrap";

const Products = () => {
  // Estado para el modal de confirmación de eliminación
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  // Estado para los productos
  const [products, setProducts] = useState([
    { id: 1, name: "Aceite de Coco", price: 8500, stock: 25, expirationDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().slice(0,10) },
    { id: 2, name: "Quinoa Premium", price: 6000, stock: 42, expirationDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().slice(0,10) },
    { id: 3, name: "Pasta Integral", price: 3200, stock: 60, expirationDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().slice(0,10) },
  ]);

  // Estados para el modal
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const categoriasFijas = ["dulce", "salado", "integral", "bebestibles"];
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    expirationDate: "",
    categoria: "dulce",
    nuevaCategoria: ""
  });

  // Estados para validación y mensajes
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");

  // Función para generar nuevo ID
  const generateNewId = () => {
    return products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
  };

  // Función para mostrar alertas
  const showAlertMessage = (message, type = "success") => {
    setAlertMessage(message);
    setAlertType(type);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  // Función para validar el formulario
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido";
    }
    if (!formData.price || isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = "El precio debe ser un número mayor a 0";
    } else if (!Number.isInteger(Number(formData.price))) {
      newErrors.price = "El precio no debe tener decimales";
    }
    if (!formData.stock || isNaN(formData.stock) || parseInt(formData.stock) < 0) {
      newErrors.stock = "El stock debe ser un número mayor o igual a 0";
    }
    if (!formData.expirationDate) {
      newErrors.expirationDate = "La fecha de expiración es requerida";
    } else {
      const today = new Date();
      const expDate = new Date(formData.expirationDate);
      today.setHours(0,0,0,0);
      expDate.setHours(0,0,0,0);
      if (expDate <= today) {
        newErrors.expirationDate = "La fecha debe ser posterior a hoy";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Función para abrir modal para nuevo producto
  const handleNewProduct = () => {
  setEditingProduct(null);
  // Sugerir fecha según categoría
  const hoy = new Date();
  let sugerida = "";
  // Por defecto dulce: 1 semana, salado/integral/bebestibles: 3 meses
  sugerida = new Date(hoy.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0,10);
  setFormData({ name: "", price: "", stock: "", expirationDate: sugerida, categoria: "dulce", nuevaCategoria: "" });
  setErrors({});
  setShowModal(true);
  };

  // Función para abrir modal para editar producto
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      stock: product.stock.toString(),
      expirationDate: product.expirationDate || "",
      categoria: product.categoria || "dulce",
      nuevaCategoria: ""
    });
    setErrors({});
    setShowModal(true);
  };

  // Función para cerrar modal
  const handleCloseModal = () => {
  setShowModal(false);
  setEditingProduct(null);
  setFormData({ name: "", price: "", stock: "", expirationDate: "" });
  setErrors({});
  };

  // Función para manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  // Función para guardar producto (crear o editar)
  const handleSaveProduct = () => {
    if (!validateForm()) return;

    const categoriaFinal = formData.categoria === "nueva"
      ? formData.nuevaCategoria.trim()
      : formData.categoria;
    const productData = {
      name: formData.name.trim(),
      price: parseInt(formData.price),
      stock: parseInt(formData.stock),
      expirationDate: formData.expirationDate,
      categoria: categoriaFinal
    };

    if (editingProduct) {
      // Editar producto existente
      setProducts(prev => prev.map(product => 
        product.id === editingProduct.id 
          ? { ...product, ...productData }
          : product
      ));
      showAlertMessage("Producto actualizado exitosamente", "success");
    } else {
      // Crear nuevo producto
      const newProduct = {
        id: generateNewId(),
        ...productData
      };
      setProducts(prev => [...prev, newProduct]);
      showAlertMessage("Producto creado exitosamente", "success");
    }

    handleCloseModal();
  };

  // Función para eliminar producto
  const handleDeleteProduct = (productId) => {
    setProductToDelete(productId);
    setShowDeleteModal(true);
  };

  // Función para formatear precio
  const formatPrice = (price) => {
  return `$${price.toLocaleString('es-CL')}`;
  };

  return (
    <div>
      <h2 className="mb-4">Gestión de Productos</h2>
      
      {/* Alerta para mensajes */}
      {showAlert && (
        <Alert variant={alertType} className="mb-3">
          {alertMessage}
        </Alert>
      )}

      <div className="d-flex justify-content-end mb-3">
        <Button variant="success" onClick={handleNewProduct}>
          + Nuevo Producto
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Expiración</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-4">
                No hay productos registrados
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{formatPrice(product.price)}</td>
                <td>
                  <span className={`badge ${product.stock > 10 ? 'bg-success' : product.stock > 0 ? 'bg-warning text-dark' : 'bg-danger text-dark'}`}>
                    {product.stock} unidades
                  </span>
                </td>
                <td>{product.expirationDate}</td>
                <td>
                  <Button 
                    size="sm" 
                    variant="primary" 
                    className="me-2"
                    onClick={() => handleEditProduct(product)}
                  >
                    Editar
                  </Button>
                  <Button 
                    size="sm" 
                    variant="danger"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Eliminar
                  </Button>
      {/* Modal de confirmación de eliminación */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que quieres eliminar este producto?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={() => {
            setProducts(prev => prev.filter(product => product.id !== productToDelete));
            showAlertMessage("Producto eliminado exitosamente", "info");
            setShowDeleteModal(false);
            setProductToDelete(null);
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

      {/* Modal para agregar/editar producto */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingProduct ? "Editar Producto" : "Nuevo Producto"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Categoría *</Form.Label>
              <Form.Select
                name="categoria"
                value={formData.categoria}
                onChange={handleInputChange}
              >
                {categoriasFijas.map(cat => (
                  <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                ))}
                <option value="nueva">Agregar nueva categoría</option>
              </Form.Select>
              {formData.categoria === "nueva" && (
                <Form.Control
                  className="mt-2"
                  type="text"
                  name="nuevaCategoria"
                  value={formData.nuevaCategoria}
                  onChange={handleInputChange}
                  placeholder="Escribe la nueva categoría"
                />
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nombre del Producto *</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                isInvalid={!!errors.name}
                placeholder="Ingrese el nombre del producto"
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Precio *</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                isInvalid={!!errors.price}
                placeholder="Ingrese el precio (sin puntos ni comas)"
                min="0"
                step="0.01"
              />
              <Form.Control.Feedback type="invalid">
                {errors.price}
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                Ingrese el precio en pesos Chilenos (ejemplo: 8500)
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Stock *</Form.Label>
              <Form.Control
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                isInvalid={!!errors.stock}
                placeholder="Ingrese la cantidad en stock"
                min="0"
              />
              <Form.Control.Feedback type="invalid">
                {errors.stock}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Fecha de Expiración *</Form.Label>
              <Form.Control
                type="date"
                name="expirationDate"
                value={formData.expirationDate}
                onChange={handleInputChange}
                isInvalid={!!errors.expirationDate}
              />
              <Form.Control.Feedback type="invalid">
                {errors.expirationDate}
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                Sugerencia: Vegetales 1 semana, frutos secos/quinoa 3 meses.
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSaveProduct}>
            {editingProduct ? "Actualizar" : "Guardar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Products;
