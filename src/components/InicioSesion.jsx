import React, { useState, useEffect } from 'react';
import formattedImages from './Images';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { login } from '../services/api';

const InicioSesion = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const validateEmail = (email) => {
        // Validación básica de correo
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateEmail(email)) {
            setError('Correo electrónico inválido.');
            return;
        }
        try {
            setIsLoading(true); // Iniciar carga
            // Llamada a la función de login del servicio API
            const { token, role } = await login(email, password);

            // Guardar el token en localStorage
            localStorage.setItem('token', token);
            console.log('Token guardado en localStorage:', localStorage.getItem('token'));
            // Mostrar modal de éxito
            setShowSuccessModal(true);
            setIsLoading(false); // Finalizar carga
            console.log('Rol recibido en handleSubmit:', role);
            // Extraer roles desde el token JWT
            let userRoles = [];
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                if (payload.roles) {
                    userRoles = payload.roles.split(',');
                }
            } catch (e) {}

            // Redirigir según el rol prioritario
            if (userRoles.includes('ADMIN')) {
                navigate('/backoffice');
            } else if (userRoles.includes('GERENTE')) {
                navigate('/backoffice/products');
            } else if (userRoles.includes('LOGISTICA')) {
                navigate('/backoffice/pedidos');
            } else {
                navigate('/');
            }
        } catch (err) {
            setIsLoading(false); // Finalizar carga en caso de error
            let errorMessage = 'Error al iniciar sesión. Por favor, intenta nuevamente.';
            if (err.message) {
                // Usar el mensaje del backend si está disponible
                errorMessage = err.message;
            }
            setError(errorMessage);
        }
    };

    const handleCloseModal = () => {
    setShowSuccessModal(false);
    const role = localStorage.getItem('userRole');
    // Redirección según tipo de usuario
    if (role === 'admin') {
        navigate('/backoffice');
    } else {
        navigate('/');
    }
    };

    // Redirección automática después de 3 segundos
    useEffect(() => {
        if (showSuccessModal) {
            const timer = setTimeout(() => {
                handleCloseModal();
            }, 3000); // 3 segundos

            return () => clearTimeout(timer); // Limpiar el timer si el componente se desmonta
        }
    }, [showSuccessModal]);

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
                        <div className="col-md-6 col-lg-4">
                            <div className="card shadow">
                                <div className="card-body">
                                    <h2 className="card-title text-center mb-4">Iniciar Sesión</h2>
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label className="form-label">Correo electrónico:</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Contraseña:</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                value={password}
                                                onChange={e => setPassword(e.target.value)}
                                                required
                                            />
                                        </div>
                                        {error && (
                                            <div className="alert alert-danger" role="alert">
                                                {error}
                                            </div>
                                        )}
                                        <div className="d-grid">
                                            <button type="submit" className="btn btn-primary" disabled={isLoading}>
                                                {isLoading ? 'Cargando...' : 'Ingresar'}
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
            <Modal 
                show={showSuccessModal} 
                onHide={handleCloseModal}
                centered
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                        ¡Inicio de sesión exitoso!
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-center">
                        <p className="mb-3">Bienvenido de vuelta a EcoMarket</p>
                        <p className="text-muted">Serás redirigido a la página principal en unos momentos...</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleCloseModal}>
                        Continuar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default InicioSesion;