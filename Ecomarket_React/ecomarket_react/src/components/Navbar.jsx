import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ cart }) => {
  // Calcular total de items en el carrito
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="header">
      <div className="container-fluid">
        <div className="row py-3">
          <div className="d-flex justify-content-center justify-content-sm-between align-items-center">
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
                  <select className="filter-categories border-0 mb-0 me-5">
                    <option>Filtros</option>
                    <option>Dulce</option>
                    <option>Salado</option>
                    <option>Integral</option>
                  </select>

                  <ul className="navbar-nav justify-content-end menu-list list-unstyled d-flex gap-md-3 mb-0">
                    <li className="nav-item active">
                      <Link to="/" className="nav-link">Inicio</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/ofertas" className="nav-link">Ofertas</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/novedades" className="nav-link">Novedades</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/faq" className="nav-link">Preguntas frecuentes</Link>
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
                        <li><Link to="/about" className="dropdown-item">Sobre EcoMarket</Link></li>
                        <li><Link to="/contact" className="dropdown-item">Contacto</Link></li>
                        <li><Link to="/location" className="dropdown-item">Ubicación</Link></li>
                        <li>
                          <Link to="/cart" className="dropdown-item">
                            Carrito {totalItems > 0 && (
                              <span className="badge bg-success ms-2">{totalItems}</span>
                            )}
                          </Link>
                        </li>
                        <li><Link to="/news" className="dropdown-item">Noticias relevantes</Link></li>
                      </ul>
                    </li>

                    <li className="nav-item">
                      <Link to="/register" className="nav-link">Regístrate</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/track-order" className="nav-link">Seguimiento de compra</Link>
                    </li>
                  </ul>
                </div>
              </div>

            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
