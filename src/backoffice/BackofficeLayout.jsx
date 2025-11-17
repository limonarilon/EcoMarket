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

const BackofficeLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/iniciar-sesion");
  };

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Sidebar (versión móvil y escritorio) */}
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
            <Nav.Link
              as={Link}
              to="/backoffice"
              className="text-white mb-2"
              onClick={toggleSidebar}
            >
              <LayoutDashboard className="me-2" size={18} /> Dashboard
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/backoffice/products"
              className="text-white mb-2"
              onClick={toggleSidebar}
            >
              <ShoppingBag className="me-2" size={18} /> Productos
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/backoffice/accounts"
              className="text-white mb-2"
              onClick={toggleSidebar}
            >
              <Users className="me-2" size={18} /> Cuentas
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/backoffice/boletas"
              className="text-white mb-2"
              onClick={toggleSidebar}
            >
              <ShoppingBag className="me-2" size={18} /> Boletas / Órdenes
            </Nav.Link>

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
