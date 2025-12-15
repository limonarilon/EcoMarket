import React, { useState } from "react";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  LogOut,
  Menu,
} from "lucide-react";

// Función para obtener roles desde el token
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

const BackofficeLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();
  const roles = getUserRolesFromToken();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/iniciar-sesion");
  };

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  // Helpers para visibilidad o clase de ayuda para poder organizarnos mejor
  const isAdmin = roles.includes("ADMIN");
  const isGerente = roles.includes("GERENTE");
  const isLogistica = roles.includes("LOGISTICA");

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <Offcanvas
        show={showSidebar}
        onHide={toggleSidebar}
        responsive="lg"
        className="bg-dark text-white"
      >
        <Offcanvas.Header closeButton closeVariant="white">
          <Offcanvas.Title className="fw-bold">EcoMarket Admin</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            {/* Dashboard: visible para todos los roles del backoffice */}
            {(isAdmin || isGerente || isLogistica) && (
              <Nav.Link
                as={Link}
                to="/backoffice"
                className="text-white mb-2"
                onClick={toggleSidebar}
              >
                <LayoutDashboard className="me-2" size={18} /> Dashboard
              </Nav.Link>
            )}
            {/* Productos: Admin y Gerente pueden gestionar, Logistica solo ver */}
            {(isAdmin || isGerente || isLogistica) && (
              <Nav.Link
                as={Link}
                to="/backoffice/products"
                className="text-white mb-2"
                onClick={toggleSidebar}
              >
                <ShoppingBag className="me-2" size={18} /> Productos
              </Nav.Link>
            )}
            {/* Cuentas: solo Admin */}
            {isAdmin && (
              <Nav.Link
                as={Link}
                to="/backoffice/accounts"
                className="text-white mb-2"
                onClick={toggleSidebar}
              >
                <Users className="me-2" size={18} /> Cuentas
              </Nav.Link>
            )}
            {/* Boletas/Órdenes: Admin, Gerente y Logistica */}
            {(isAdmin || isGerente || isLogistica) && (
              <Nav.Link
                as={Link}
                to="/backoffice/boletas"
                className="text-white mb-2"
                onClick={toggleSidebar}
              >
                <ShoppingBag className="me-2" size={18} /> Boletas / Órdenes
              </Nav.Link>
            )}

            <hr className="border-secondary my-3" />

            <Nav.Link
              onClick={handleLogout}
              className="text-white mt-auto"
              style={{ cursor: "pointer" }}
            >
              <LogOut className="me-2" size={18} /> Cerrar sesión
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Contenido principal */}
      <div className="flex-grow-1 bg-light">
        <Navbar bg="white" className="shadow-sm px-3">
          <button
            className="btn btn-outline-secondary d-lg-none"
            onClick={toggleSidebar}
          >
            <Menu size={20} />
          </button>
          <Navbar.Brand className="ms-3 fw-bold text-success">
            EcoMarket Backoffice
          </Navbar.Brand>
        </Navbar>

        <Container fluid className="p-4">
          <Outlet />
        </Container>
      </div>
    </div>
  );
};

export default BackofficeLayout;
