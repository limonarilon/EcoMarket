import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo--ecomarket.png";
import images from "../assets/images";

import "../assets/css/Footer.css";

const Footer = () => {
  return (
    <>
      <footer className="py-5 bg-light">
        <div className="container-fluid">
          <div className="row">

            {/* Columna Logo + redes sociales */}
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="footer-menu">
                <img
                  src={logo}
                  alt="EcoMarket Logo"
                  style={{height: '60px', marginBottom: '20px'}}
                />
                <div className="social-links mt-4">
                  <h6 className="text-muted mb-3">Síguenos en:</h6>
                  <ul className="d-flex list-unstyled gap-3">
                    <li>
                      <a href="#" title="Facebook">
                        <img src={images["facebook"]} alt="Facebook" style={{width: '32px', height: '32px'}} />
                      </a>
                    </li>
                    <li>
                      <a href="#" title="X">
                        <img src={images["x"]} alt="X" style={{width: '32px', height: '32px'}} />
                      </a>
                    </li>
                    <li>
                      <a href="#" title="Instagram">
                        <img src={images["instagram"]} alt="Instagram" style={{width: '32px', height: '32px'}} />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Columna EcoMarket */}
            <div className="col-md-2 col-sm-6">
              <div className="footer-menu">
                <h5 className="widget-title text-primary fw-bold mb-4">EcoMarket</h5>
                <ul className="menu-list list-unstyled">
                  <li className="menu-item mb-2">
                    <Link to="/sobre-nosotros" className="nav-link text-muted p-0 footer-link">
                      Sobre nosotros
                    </Link>
                  </li>
                  <li className="menu-item mb-2">
                    <Link to="/terminos-condiciones" className="nav-link text-muted p-0 footer-link">
                      Condiciones
                    </Link>
                  </li>
                  <li className="menu-item mb-2">
                    <Link to="/blog" className="nav-link text-muted p-0 footer-link">
                      Nuestro blog
                    </Link>
                  </li>
                  <li className="menu-item mb-2">
                    <Link to="/empleos" className="nav-link text-muted p-0 footer-link">
                      Empleos
                    </Link>
                  </li>
                  <li className="menu-item mb-2">
                    <Link to="/programa-afiliados" className="nav-link text-muted p-0 footer-link">
                      Programa de afiliados
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Columna Atención al Cliente */}
            <div className="col-md-2 col-sm-6">
              <div className="footer-menu">
                <h5 className="widget-title text-primary fw-bold mb-4">Atención al cliente</h5>
                <ul className="menu-list list-unstyled">
                  <li className="menu-item mb-2">
                    <Link to="/preguntas-frecuentes" className="nav-link text-muted p-0 footer-link">
                      Preguntas frecuentes
                    </Link>
                  </li>
                  <li className="menu-item mb-2">
                    <Link to="/contacto" className="nav-link text-muted p-0 footer-link">
                      Contacto
                    </Link>
                  </li>
                  <li className="menu-item mb-2">
                    <Link to="/politica-privacidad" className="nav-link text-muted p-0 footer-link">
                      Política de privacidad
                    </Link>
                  </li>
                  <li className="menu-item mb-2">
                    <Link to="/devoluciones-reembolsos" className="nav-link text-muted p-0 footer-link">
                      Devoluciones y reembolsos
                    </Link>
                  </li>
                  <li className="menu-item mb-2">
                    <Link to="/politica-cookies" className="nav-link text-muted p-0 footer-link">
                      Política de cookies
                    </Link>
                  </li>
                  <li className="menu-item mb-2">
                    <Link to="/informacion-envios" className="nav-link text-muted p-0 footer-link">
                      Información de envíos
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Columna Suscripción */}
            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="footer-menu">
                <h5 className="widget-title text-primary fw-bold mb-4">Newsletter</h5>
                <p className="text-muted mb-4">
                  🌱 Recibe novedades sobre productos orgánicos y ofertas exclusivas 
                  suscribiéndote a nuestro boletín semanal.
                </p>
                <form className="d-flex mt-3 gap-0" role="newsletter">
                  <input
                    className="form-control rounded-start rounded-0"
                    type="email"
                    placeholder="tu@email.com"
                    aria-label="Correo electrónico"
                    style={{borderRight: 'none'}}
                  />
                  <button className="btn btn-primary rounded-end rounded-0 px-4" type="submit">
                    ✉ Suscribirse
                  </button>
                </form>
                <small className="text-muted mt-2 d-block">
                  No spam. Puedes cancelar en cualquier momento.
                </small>
              </div>
            </div>

          </div>
        </div>
      </footer>

      {/* Footer Bottom */}
      <div id="footer-bottom" className="bg-primary py-3">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-6 copyright">
              <p className="mb-0 text-white">
                © 2025 <strong>EcoMarket</strong>. Todos los derechos reservados.
              </p>
            </div>
            <div className="col-md-6 credit-link text-start text-md-end">
              <p className="mb-0 text-white">
                <small>
                  Plantilla por{' '}
                  <a href="https://templatesjungle.com/" className="text-white text-decoration-underline">
                    TemplatesJungle
                  </a>
                  {' '}• Distribuido por{' '}
                  <a href="https://themewagon.com" className="text-white text-decoration-underline">
                    ThemeWagon
                  </a>
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
