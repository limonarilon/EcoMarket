import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import formattedImages from './Images';
import { createUser } from "../services/api";

// Función auxiliar para validar RUT chileno (módulo 11)
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

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    rut: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const validate = (data) => {
    const newErrors = {};
    if (!data.name.trim()) newErrors.name = "El nombre es obligatorio.";
    else if (!/^([a-zA-ZùÙüÜäàáëèéïìíöòóüùúÄÀÁËÈÉÏÌÍÖÒÓÜÚñÑ\s]+)$/.test(data.name))
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

    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setSubmitError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const payload = {
        nombre: formData.name,                    // <-- Nombre correcto
        email: formData.email,                    // <-- Email
        password: formData.password,              // <-- Password
        rut: formData.rut.replace(/\./g, ''),    // <-- RUT limpio
        rol: "USER"
      };

      await createUser(payload);

      setShowModal(true);
      setFormData({ name: '', rut: '', email: '', password: '', confirmPassword: '' });
    } catch (err) {
      console.error('--- ERROR EN REGISTER ---');
      console.error('Error completo:', err);
      console.error('Respuesta del backend:', err.response);

      let msg = "No se pudo completar el registro. Intenta nuevamente.";
      if (err.response && err.response.data) {
        if (err.response.data.error) msg = err.response.data.error;
        else if (err.response.data.message) msg = err.response.data.message;
        else msg = JSON.stringify(err.response.data);
      }
      setSubmitError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="register-bg"
        style={{
          minHeight: '100vh',
          backgroundImage: `url(${formattedImages['.assets/images/banner-image-1']})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container my-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header text-center">
                  <h3>Regístrate en EcoMarket</h3>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit} noValidate>
                    {/* Nombre */}
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">Nombre completo</label>
                      <input
                        type="text"
                        className={`form-control${errors.name ? " is-invalid" : ""}`}
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Ingrese su nombre completo"
                        required
                      />
                      <div className="invalid-feedback" style={{display:'block'}}>{errors.name || ''}</div>
                    </div>
                    {/* RUT */}
                    <div className="mb-3">
                      <label htmlFor="rut" className="form-label">RUT</label>
                      <input
                        type="text"
                        className={`form-control${errors.rut ? " is-invalid" : ""}`}
                        id="rut"
                        name="rut"
                        value={formData.rut}
                        onChange={handleChange}
                        placeholder="Ej: 12.345.678-5"
                        required
                      />
                      <div className="invalid-feedback" style={{display:'block'}}>{errors.rut || ''}</div>
                    </div>
                    {/* Email */}
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Correo electrónico</label>
                      <input
                        type="email"
                        className={`form-control${errors.email ? " is-invalid" : ""}`}
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="correo@ejemplo.com"
                        required
                      />
                      <div className="invalid-feedback" style={{display:'block'}}>{errors.email || ''}</div>
                    </div>
                    {/* Contraseña */}
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">Contraseña</label>
                      <input
                        type="password"
                        className={`form-control${errors.password ? " is-invalid" : ""}`}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="***********"
                        required
                      />
                      <div className="invalid-feedback" style={{display:'block'}}>{errors.password || ''}</div>
                    </div>
                    {/* Confirmar contraseña */}
                    <div className="mb-3">
                      <label htmlFor="confirmPassword" className="form-label">Confirmar contraseña</label>
                      <input
                        type="password"
                        className={`form-control${errors.confirmPassword ? " is-invalid" : ""}`}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="***********"
                        required
                      />
                      <div className="invalid-feedback" style={{display:'block'}}>{errors.confirmPassword || ''}</div>
                    </div>
                    {submitError && <div className="alert alert-danger">{submitError}</div>}
                    <div className="d-grid">
                      <button type="submit" className="btn btn-success" disabled={loading}>
                        {loading ? "Procesando..." : "Registrarse"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal de éxito */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>¡Registro exitoso!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Tu registro se ha realizado correctamente. ¡Bienvenido a EcoMarket!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RegisterForm;
