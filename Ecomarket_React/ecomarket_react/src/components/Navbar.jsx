import React from "react";

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
                      <a href="#women" className="nav-link">Inicio</a>
                    </li>
                    <li className="nav-item dropdown">
                      <a href="#men" className="nav-link">Ofertas</a>
                    </li>
                    <li className="nav-item">
                      <a href="#kids" className="nav-link">Novedades</a>
                    </li>
                    <li className="nav-item">
                      <a href="#accessories" className="nav-link">Preguntas frecuentes</a>
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
                        <li><a href="index.html" className="dropdown-item">Sobre EcoMarket</a></li>
                        <li><a href="index.html" className="dropdown-item">Contacto</a></li>
                        <li><a href="index.html" className="dropdown-item">Ubicación</a></li>
                        <li>
                          <a href="#cart" className="dropdown-item">
                            Carrito {totalItems > 0 && (
                              <span className="badge bg-success ms-2">{totalItems}</span>
                            )}
                          </a>
                        </li>
                        <li><a href="index.html" className="dropdown-item">Noticias relevantes</a></li>
                      </ul>
                    </li>

                    <li className="nav-item">
                      <a href="#brand" className="nav-link">Regístrate</a>
                    </li>
                    <li className="nav-item">
                      <a href="#sale" className="nav-link">Seguimiento de compra</a>
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
