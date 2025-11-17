import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo--ecomarket.png";

import "../assets/css/Navbar.css";

const Navbar = ({ cart }) => {
  // Calcular total de items en el carrito
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="header" style={{minHeight: 'var(--header-height-min)'}}>
      <div className="container-fluid">
        <div className="row py-3">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              {/* Logo */}
              <div className="navbar-brand">
                <Link to="/">
                  <img 
                    src={logo} 
                    alt="EcoMarket" 
                    style={{height: '50px'}}
                    />
                </Link>   
              </div>
              
              <nav className="main-menu d-flex navbar navbar-expand-lg">
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasNavbar"
                aria-controls="offcanvasNavbar"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div
                className="offcanvas offcanvas-end"
                tabIndex="-1"
                id="offcanvasNavbar"
                aria-labelledby="offcanvasNavbarLabel"
              >
                <div className="offcanvas-header justify-content-center">
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>

                <div className="offcanvas-body">
               

                  <ul className="navbar-nav justify-content-end menu-list list-unstyled d-flex gap-md-3 mb-0">
                    <li className="nav-item active">
                      <Link to="/" className="nav-link">Inicio</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/ofertas" className="nav-link">Ofertas</Link>
                    </li>
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        role="button"
                        id="categoriasDropdown"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Categorías
                      </a>
                      <ul className="dropdown-menu" aria-labelledby="categoriasDropdown">
                        <li><Link to="/categoria/dulce" className="dropdown-item">Dulce</Link></li>
                        <li><Link to="/categoria/salado" className="dropdown-item">Salado</Link></li>
                        <li><Link to="/categoria/integral" className="dropdown-item">Integral</Link></li>
                        <li><Link to="/categoria/bebestibles" className="dropdown-item">Bebestibles</Link></li>
                        
                      </ul>
                    </li>
                    <li className="nav-item">
                      <Link to="/novedades" className="nav-link">Novedades</Link>
                    </li>
                    

                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        role="button"
                        id="pages"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Información
                      </a>
                      <ul className="dropdown-menu" aria-labelledby="pages">
                        <li><Link to="/sobre-nosotros" className="dropdown-item">Sobre EcoMarket</Link></li>
                        <li><Link to="/contacto" className="dropdown-item">Contacto</Link></li>
                        <li><Link to="/ubicacion" className="dropdown-item">Ubicación</Link></li>
                      </ul>
                    </li>
                    <li className="nav-item">
                      <Link to="/preguntas-frecuentes" className="nav-link">Preguntas frecuentes</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/registrarse" className="nav-link">Regístrate</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/iniciar-sesion" className="nav-link">Inicia Sesión</Link>
                    </li>
                  </ul>
                </div>
              </div>

            </nav>
            
            {/* Carrito visible siempre */}
            <div className="cart-icon d-flex align-items-center ms-3">
              <Link to="/carrito" className="btn btn-outline-light position-relative">
                🛒
                {totalItems > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
