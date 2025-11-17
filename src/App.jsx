import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Featured from "./components/Featured";
import BlogPost from "./components/BlogPost";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import Categoria from "./components/Categoria";
import RegisterForm from "./components/RegisterForm";
import InicioSesion from "./components/InicioSesion";
import Products from "./backoffice/Products";
import Accounts from "./backoffice/Accounts";
import Boletas from "./backoffice/Boletas";
import Dashboard from "./backoffice/Dashboard";
import BackofficeLayout from "./backoffice/BackofficeLayout";
import PrivateRoute from "./routes/PrivateRoute";
import Blog from "./components/Blog";
import { getProducts } from "./services/api";
import formattedImages, { getImageSrc } from "./components/Images";
import Carrusel from "./components/carrusel";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

// Simple page components used in routes (kept minimal to avoid duplication)
const Home = ({ products, onAddToCart }) => {
  if (!products) {
    return (
      <div className="container my-5 text-center">
        <h3>Cargando productos...</h3>
      </div>
    );
  }

  // Seleccionamos unos pocos productos como destacados (primeras 4 entradas)
  const featuredProducts = (products && products.length > 0) ? products.slice(0, 4) : [];

  return (
    <div>
      {/* Carrusel del equipo */}
      
      <Featured products={featuredProducts} onAddToCart={onAddToCart} />
      <Carrusel products={featuredProducts} />
      <BlogPost />
    </div>
  );
};

const Ofertas = ({ products, onAddToCart }) => {
  const [selectedFilter, setSelectedFilter] = useState("Filtros");
  const filtered = selectedFilter === "Filtros" ? products : (products || []).filter(p => p.category === selectedFilter);
  return (
    <div className="container my-5">
      <h2 className="section-title-llamativo">Ofertas Especiales</h2>
      <div className="mb-3">
        <select className="form-select w-auto" value={selectedFilter} onChange={e => setSelectedFilter(e.target.value)}>
          <option value="Filtros">Filtros</option>
          <option value="Integral">Integral</option>
          <option value="Dulce">Dulce</option>
          <option value="Salado">Salado</option>
        </select>
      </div>
      <div className="row">
        {(filtered || []).map(p => (
          <div key={p.id} className="col-md-6 mb-4">
            <div className="card h-100">
              <img src={getImageSrc(p.img)} className="card-img-top" alt={p.title} />
              <div className="card-body">
                <h5 className="card-title">{p.title}</h5>
                <p className="card-text">{p.price}</p>
                <button className="btn btn-primary" onClick={() => onAddToCart(p)}>Agregar al carrito</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Novedades = ({ products, onAddToCart }) => {
  const navigate = useNavigate();
  const novedadesProducts = [
    { id: 101, img: "chcolatee", title: "Chocolate Orgánico 90% cacao", price: "$3.590" },
    { id: 102, img: "fruos-secos", title: "Mix Frutos Secos", price: "$4.670" },
    { id: 203, img: "pasta", title: "Pasta Integral Vegana (400g)", price: "$11.990" },
    { id: 205, img: "aceite y coco", title: "Aceite de Coco", price: "$15.000" },
  ];
  return (
    <div className="container my-5">
      <h2 className="section-title-llamativo">Novedades</h2>
      <div className="row">
        {novedadesProducts.map(product => (
          <div key={product.id} className="col-md-6 mb-4 d-flex">
            <div className="card w-100">
              <img src={getImageSrc(product.img)} className="card-img-top" alt={product.title} />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.price}</p>
                <button className="btn btn-primary" onClick={() => onAddToCart(product)}>Agregar al carrito</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const FAQ = () => (
  <div className="container my-5">
    <h2 className="section-title-llamativo">Preguntas Frecuentes</h2>
    <p>Preguntas y respuestas básicas.</p>
  </div>
);

const About = () => (
  <div className="container my-5">
    <h2>Sobre EcoMarket</h2>
    <p>En EcoMarket nos dedicamos a ofrecer productos orgánicos de la más alta calidad.</p>
  </div>
);

const Contact = () => (
  <div className="container my-5">
    <h2>Contacto</h2>
    <p>contacto@ecomarket.cl</p>
  </div>
);

const Location = () => (
  <div className="container my-5">
    <h2>Ubicación</h2>
    <p>Av. Siempre Viva 123, Santiago, Chile</p>
  </div>
);

// Helper to format prices (simple, used while migrating)
const formatPriceCLP = (value) => {
  if (value === undefined || value === null) return "";
  try {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(Number(value));
  } catch (e) {
    return `$${value}`;
  }
};

// Minimal placeholders for components referenced in routes (can be replaced later)
const TrackOrder = () => (
  <div className="container my-5">
    <h2>Seguimiento de Compra</h2>
    <p>Ingrese su número de pedido para ver el estado.</p>
  </div>
);

const Terms = () => (
  <div className="container my-5">
    <h2>Términos y Condiciones</h2>
    <p>Políticas generales de uso del sitio.</p>
  </div>
);

const BotonPago = () => (
  <div className="container my-5 text-center">
    <h2>Pago</h2>
    <p>Integración de pago pendiente.</p>
  </div>
);




const Careers = () => (
  <div className="container my-5">
    <h2>Trabajar en EcoMarket</h2>
    
    <div className="row">
      <div className="col-lg-10 mx-auto">
        <div className="text-center mb-5">
          <img 
            src={formattedImages['.assets/images/equipo-ecomarket']}
            alt="Equipo EcoMarket" 
            className="img-fluid rounded shadow" 
            style={{ maxWidth: "500px", height: "300px", objectFit: "cover" }} 
          />
        </div>
        
        <div className="alert alert-success">
          <h4 className="alert-heading">🌱 ¡Únete a Nuestra Misión Verde!</h4>
          <p>En EcoMarket creemos que cada persona puede hacer la diferencia. Buscamos talentos apasionados por la sustentabilidad y comprometidos con ofrecer productos orgánicos de calidad.</p>
        </div>
        
        <h4 className="mt-4 text-success">¿Por qué trabajar con nosotros?</h4>
        <div className="row mt-3">
          <div className="col-md-6">
            <ul className="list-unstyled">
              <li className="mb-2">🌿 <strong>Propósito con impacto:</strong> Contribuyes a un mundo más sostenible</li>
              <li className="mb-2">👥 <strong>Ambiente colaborativo:</strong> Equipo joven y dinámico</li>
              <li className="mb-2">📈 <strong>Crecimiento profesional:</strong> Oportunidades de desarrollo</li>
            </ul>
          </div>
          <div className="col-md-6">
            <ul className="list-unstyled">
              <li className="mb-2">⚖️ <strong>Balance vida-trabajo:</strong> Horarios flexibles</li>
              <li className="mb-2">🎯 <strong>Innovación:</strong> Implementamos nuevas ideas</li>
              <li className="mb-2">💚 <strong>Beneficios verdes:</strong> Descuentos en productos orgánicos</li>
            </ul>
          </div>
        </div>
        
        <h4 className="mt-4 text-success">Áreas de Trabajo</h4>
        <div className="row mt-3">
          <div className="col-md-4 mb-3">
            <div className="card h-100">
              <div className="card-body text-center">
                <h6 className="card-title text-primary">🛒 Ventas y Atención al Cliente</h6>
                <p className="card-text">Ayuda a nuestros clientes a encontrar los mejores productos orgánicos</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card h-100">
              <div className="card-body text-center">
                <h6 className="card-title text-success">📦 Logística y Distribución</h6>
                <p className="card-text">Garantiza que los productos lleguen frescos y a tiempo</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card h-100">
              <div className="card-body text-center">
                <h6 className="card-title text-primary">💻 Marketing Digital</h6>
                <p className="card-text">Difunde nuestro mensaje de vida saludable y sostenible</p>
              </div>
            </div>
          </div>
        </div>
        
        <h4 className="mt-4 text-success">¿Cómo Postular?</h4>
        <div className="card">
          <div className="card-body">
            <p><strong>Envía tu CV y carta de motivación explicando por qué quieres ser parte del equipo EcoMarket:</strong></p>
            
            <div className="row mt-3">
              <div className="col-md-6">
                <h6 className="text-primary">📧 Correo Electrónico</h6>
                <p className="mb-1"><strong>empleos@ecomarket.cl</strong></p>
                <small className="text-muted">Respuesta en 5-7 días hábiles</small>
              </div>
              <div className="col-md-6">
                <h6 className="text-success">📱 WhatsApp</h6>
                <p className="mb-1"><strong>+56 9 1234 5678</strong></p>
                <small className="text-muted">Lun - Vie: 9:00 - 18:00 hrs</small>
              </div>
            </div>
            
            <div className="mt-3">
              <h6 className="text-warning">📍 Oficina Central</h6>
              <p className="mb-1"><strong>Av. Providencia 1234, Providencia, Santiago</strong></p>
              <small className="text-muted">Metro Manuel Montt - Línea 1</small>
            </div>
          </div>
        </div>
        
        <div className="alert alert-info mt-4">
          <h6 className="alert-heading">💡 Tip para Postulantes</h6>
          <p className="mb-0">Menciona en tu carta por qué te apasiona la alimentación orgánica y cómo contribuirías a nuestra misión de promover un estilo de vida más saludable y sostenible.</p>
        </div>
        
        <div className="text-center mt-4">
          <h5 className="text-success">¡Esperamos conocerte pronto!</h5>
          <p className="text-muted">Juntos podemos hacer la diferencia para un futuro más verde 🌱</p>
        </div>
      </div>
    </div>
  </div>
);

const Affiliates = () => {
  const navigate = useNavigate();

  return (
    <div className="container my-5">
      <h2 className="section-title-llamativo">Programa de Afiliados EcoMarket</h2>
      
      <div className="row">
        <div className="col-lg-10 mx-auto">
          <div className="text-center mb-5">
            <img 
              src={formattedImages['.assets/images/afiliados']} 
              alt="Programa de Afiliados EcoMarket" 
              className="img-fluid rounded shadow" 
              style={{ maxWidth: "500px", height: "300px", objectFit: "cover" }} 
            />
          </div>
          
          <div className="alert alert-success">
            <h4 className="alert-heading">🎁 ¡Gana Puntos con Cada Compra!</h4>
            <p>Únete a nuestro programa de afiliados y acumula puntos por cada compra que realices y por cada persona que refiera a EcoMarket. ¡Convierte tu pasión por lo orgánico en beneficios!</p>
          </div>
          
          <h4 className="mt-4 text-success">¿Cómo Funciona?</h4>
          <div className="row mt-3">
            <div className="col-md-4 mb-3">
              <div className="card h-100 text-center">
                <div className="card-body">
                  <h1 className="text-primary">1️⃣</h1>
                  <h6 className="card-title">Regístrate</h6>
                  <p className="card-text">Crea tu cuenta gratuita en EcoMarket y automáticamente formas parte del programa</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card h-100 text-center">
                <div className="card-body">
                  <h1 className="text-success">2️⃣</h1>
                  <h6 className="card-title">Compra y Acumula</h6>
                  <p className="card-text">Por cada $1.000 de compra, ganas 10 puntos que puedes canjear por descuentos</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card h-100 text-center">
                <div className="card-body">
                  <h1 className="text-warning">3️⃣</h1>
                  <h6 className="card-title">Refiere y Gana Más</h6>
                  <p className="card-text">Invita amigos y gana 500 puntos extra por cada nueva compra que realicen</p>
                </div>
              </div>
            </div>
          </div>
          
          <h4 className="mt-4 text-success">Sistema de Puntos</h4>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead className="table-success">
                <tr>
                  <th>Actividad</th>
                  <th>Puntos Ganados</th>
                  <th>Equivalencia</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Compra Personal</strong></td>
                  <td>10 puntos por cada $1.000</td>
                  <td>1% de cashback</td>
                </tr>
                <tr>
                  <td><strong>Registro de Nuevo Usuario</strong></td>
                  <td>200 puntos de bienvenida</td>
                  <td>$2.000 de descuento</td>
                </tr>
                <tr>
                  <td><strong>Referir un Amigo</strong></td>
                  <td>500 puntos por primera compra</td>
                  <td>$5.000 de descuento</td>
                </tr>
                <tr>
                  <td><strong>Compra del Referido</strong></td>
                  <td>50 puntos por cada $1.000</td>
                  <td>0.5% adicional</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <h4 className="mt-4 text-success">Beneficios del Programa</h4>
          <div className="row mt-3">
            <div className="col-md-6">
              <ul className="list-unstyled">
                <li className="mb-2">🎯 <strong>Descuentos exclusivos:</strong> Canje de puntos por descuentos</li>
                <li className="mb-2">🎁 <strong>Productos gratuitos:</strong> Usa tus puntos como dinero</li>
                <li className="mb-2">📧 <strong>Ofertas especiales:</strong> Acceso prioritario a promociones</li>
              </ul>
            </div>
            <div className="col-md-6">
              <ul className="list-unstyled">
                <li className="mb-2">🏆 <strong>Niveles VIP:</strong> Más compras = más beneficios</li>
                <li className="mb-2">📊 <strong>Dashboard personal:</strong> Seguimiento de tus puntos</li>
                <li className="mb-2">💚 <strong>Impacto ambiental:</strong> Rastrea tu contribución verde</li>
              </ul>
            </div>
          </div>
          
          <h4 className="mt-4 text-success">Niveles de Afiliado</h4>
          <div className="row mt-3">
            <div className="col-md-3 mb-3">
              <div className="card border-secondary bg-light">
                <div className="card-body text-center">
                  <h6 className="card-title" style={{color: '#8B4513'}}>🥉 Bronce</h6>
                  <p className="card-text"><small>0 - 999 puntos</small></p>
                  <p><strong>Beneficio:</strong> 1% cashback</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="card border-warning bg-light">
                <div className="card-body text-center">
                  <h6 className="card-title" style={{color: '#6B7280'}}>🥈 Plata</h6>
                  <p className="card-text"><small>1000 - 4999 puntos</small></p>
                  <p><strong>Beneficio:</strong> 1.5% cashback</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="card border-warning bg-light">
                <div className="card-body text-center">
                  <h6 className="card-title" style={{color: '#FFD700'}}>🥇 Oro</h6>
                  <p className="card-text"><small>5000 - 9999 puntos</small></p>
                  <p><strong>Beneficio:</strong> 2% cashback</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="card border-success bg-light">
                <div className="card-body text-center">
                  <h6 className="card-title text-success">💎 Diamante</h6>
                  <p className="card-text"><small>+10000 puntos</small></p>
                  <p><strong>Beneficio:</strong> 3% cashback</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="alert alert-warning mt-4">
            <h6 className="alert-heading">⚠️ Importante</h6>
            <p className="mb-0">Para participar en el programa de afiliados, debes tener una cuenta registrada en EcoMarket. Los puntos se acreditan automáticamente en tu perfil después de cada compra confirmada.</p>
          </div>
          
          <div className="text-center mt-5">
            <h4 className="text-success mb-4">¿Listo para Comenzar a Ganar Puntos?</h4>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <button 
                className="btn btn-success btn-lg px-4"
                onClick={() => navigate('/registrarse')}
              >
                🎯 Registrarme Ahora
              </button>
              <button 
                className="btn btn-outline-success btn-lg px-4"
                onClick={() => navigate('/iniciar-sesion')}
              >
                🔑 Ya Tengo Cuenta
              </button>
            </div>
            <p className="text-muted mt-3">¡Es gratis y obtienes 200 puntos de bienvenida!</p>
          </div>
          
          <div className="alert alert-info mt-4">
            <h6 className="alert-heading">📞 ¿Necesitas Ayuda?</h6>
            <div className="row">
              <div className="col-md-4">
                <strong>Email:</strong> afiliados@ecomarket.cl
              </div>
              <div className="col-md-4">
                <strong>WhatsApp:</strong> +56 9 1234 5678
              </div>
              <div className="col-md-4">
                <strong>Horario:</strong> Lun - Vie 9:00 - 18:00
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PrivacyPolicy = () => (
  <div className="container my-5">
    <h2>Política de Privacidad</h2>
    
    <div className="row">
      <div className="col-lg-10 mx-auto">
        <p className="lead">Última actualización: Octubre 2025</p>
        
        <h4 className="mt-4 text-success">1. Información que Recopilamos</h4>
        <p><strong>Datos personales:</strong> Nombre, dirección de correo electrónico, teléfono, dirección de entrega y facturación.</p>
        <p><strong>Datos de navegación:</strong> Información sobre su uso del sitio web, incluyendo páginas visitadas y productos visualizados.</p>
        
        <h4 className="mt-4 text-success">2. Cómo Utilizamos su Información</h4>
        <ul>
          <li>Procesar y gestionar sus pedidos</li>
          <li>Comunicarnos con usted sobre su compra</li>
          <li>Mejorar nuestros productos y servicios</li>
          <li>Enviar ofertas y promociones (con su consentimiento)</li>
          <li>Cumplir con obligaciones legales</li>
        </ul>
        
        <h4 className="mt-4 text-success">3. Compartir Información</h4>
        <p>No vendemos, intercambiamos o transferimos sus datos personales a terceros, excepto:</p>
        <ul>
          <li>Proveedores de servicios necesarios para el funcionamiento del negocio</li>
          <li>Cumplimiento de obligaciones legales</li>
          <li>Proteger nuestros derechos y seguridad</li>
        </ul>
        
        <h4 className="mt-4 text-success">4. Seguridad de los Datos</h4>
        <p>Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger sus datos personales contra acceso no autorizado, alteración, divulgación o destrucción.</p>
        
        <h4 className="mt-4 text-success">5. Sus Derechos</h4>
        <p>Usted tiene derecho a:</p>
        <ul>
          <li>Acceder a sus datos personales</li>
          <li>Rectificar información inexacta</li>
          <li>Solicitar la eliminación de sus datos</li>
          <li>Oponerse al procesamiento de sus datos</li>
          <li>Portabilidad de datos</li>
        </ul>
        
        <div className="alert alert-warning mt-4">
          <strong>Ejercer sus derechos:</strong> Para ejercer cualquier derecho, contáctanos en privacidad@ecomarket.cl
        </div>
      </div>
    </div>
  </div>
);

const ReturnsRefunds = () => (
  <div className="container my-5">
    <h2>Devoluciones y Reembolsos</h2>
    
    <div className="row">
      <div className="col-lg-10 mx-auto">
        <div className="alert alert-success">
          <strong>Su satisfacción es nuestra prioridad.</strong> Ofrecemos una política de devoluciones flexible para garantizar su confianza en EcoMarket.
        </div>
        
        <h4 className="mt-4 text-success">1. Derecho de Retracto</h4>
        <p>Tiene derecho a devolver productos sin necesidad de justificar su decisión dentro de <strong>7 días hábiles</strong> desde la recepción del pedido, conforme a la Ley del Consumidor.</p>
        
        <h4 className="mt-4 text-success">2. Condiciones para Devoluciones</h4>
        <ul>
          <li><strong>Productos no perecibles:</strong> Deben estar sin abrir y en su empaque original</li>
          <li><strong>Productos perecibles:</strong> Solo por defectos de calidad o problemas de conservación</li>
          <li><strong>Estado del producto:</strong> Sin señales de uso, etiquetas intactas</li>
          <li><strong>Comprobante:</strong> Debe incluir boleta o factura de compra</li>
        </ul>
        
        <h4 className="mt-4 text-success">3. Productos No Retornables</h4>
        <ul>
          <li>Productos con fecha de vencimiento próxima (menos de 7 días)</li>
          <li>Productos personalizados o hechos a medida</li>
          <li>Productos abiertos de higiene personal</li>
        </ul>
        
        <h4 className="mt-4 text-success">4. Proceso de Devolución</h4>
        <ol>
          <li><strong>Contacto:</strong> Envíe un email a devoluciones@ecomarket.cl</li>
          <li><strong>Autorización:</strong> Recibirá un código de devolución RMA</li>
          <li><strong>Envío:</strong> Empaque el producto con el RMA incluido</li>
          <li><strong>Recepción:</strong> Procesamos la devolución en 3-5 días hábiles</li>
        </ol>
        
        <h4 className="mt-4 text-success">5. Reembolsos</h4>
        <p><strong>Tiempo de procesamiento:</strong> 5-10 días hábiles después de recibir el producto</p>
        <p><strong>Método:</strong> Mismo método de pago utilizado en la compra original</p>
        <p><strong>Gastos de envío:</strong> Los gastos de devolución corren por cuenta del cliente, excepto en caso de productos defectuosos</p>
        
        <div className="alert alert-info mt-4">
          <strong>¿Necesita ayuda?</strong> Contáctanos en devoluciones@ecomarket.cl o WhatsApp +56 9 1234 5678
        </div>
      </div>
    </div>
  </div>
);

const CookiesPolicy = () => (
  <div className="container my-5">
    <h2>Política de Cookies</h2>
    
    <div className="row">
      <div className="col-lg-10 mx-auto">
        <p className="lead">Esta política explica cómo EcoMarket utiliza cookies y tecnologías similares en nuestro sitio web.</p>
        
        <h4 className="mt-4 text-success">1. ¿Qué son las Cookies?</h4>
        <p>Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita nuestro sitio web. Nos ayudan a proporcionar una mejor experiencia de navegación y analizar cómo se utiliza nuestro sitio.</p>
        
        <h4 className="mt-4 text-success">2. Tipos de Cookies que Utilizamos</h4>
        
        <div className="card mb-3">
          <div className="card-body">
            <h6 className="card-title text-success">Cookies Esenciales</h6>
            <p className="card-text">Necesarias para el funcionamiento básico del sitio, como mantener su sesión de compra activa.</p>
          </div>
        </div>
        
        <div className="card mb-3">
          <div className="card-body">
            <h6 className="card-title text-success">Cookies de Rendimiento</h6>
            <p className="card-text">Recopilan información sobre cómo interactúa con nuestro sitio para mejorarlo.</p>
          </div>
        </div>
        
        <div className="card mb-3">
          <div className="card-body">
            <h6 className="card-title text-success">Cookies de Funcionalidad</h6>
            <p className="card-text">Recuerdan sus preferencias para personalizar su experiencia.</p>
          </div>
        </div>
        
        <div className="card mb-3">
          <div className="card-body">
            <h6 className="card-title text-success">Cookies de Marketing</h6>
            <p className="card-text">Se utilizan para mostrar publicidad relevante basada en sus intereses.</p>
          </div>
        </div>
        
        <h4 className="mt-4 text-success">3. Control de Cookies</h4>
        <p>Puede controlar y gestionar las cookies de varias maneras:</p>
        <ul>
          <li><strong>Configuración del navegador:</strong> La mayoría de navegadores le permiten rechazar cookies</li>
          <li><strong>Herramientas de terceros:</strong> Puede optar por no recibir cookies de marketing</li>
          <li><strong>Configuración del sitio:</strong> Algunas preferencias se pueden ajustar en su cuenta</li>
        </ul>
        
        <h4 className="mt-4 text-success">4. Cookies de Terceros</h4>
        <p>Utilizamos servicios de terceros como Google Analytics para analizar el tráfico del sitio. Estos servicios pueden establecer sus propias cookies.</p>
        
        <div className="alert alert-warning mt-4">
          <strong>Nota importante:</strong> Deshabilitar ciertas cookies puede afectar la funcionalidad del sitio web.
        </div>
        
        <div className="alert alert-info mt-4">
          <strong>Más información:</strong> Para preguntas sobre cookies, contáctenos en cookies@ecomarket.cl
        </div>
      </div>
    </div>
  </div>
);

const ShippingInfo = () => (
  <div className="container my-5">
    <h2>Información de Envíos</h2>
    
    <div className="row">
      <div className="col-lg-10 mx-auto">
        <div className="alert alert-success">
          <strong>🚚 Envíos a todo Chile</strong> - Llevamos productos orgánicos frescos hasta tu puerta
        </div>
        
        <h4 className="mt-4 text-success">1. Zonas de Cobertura</h4>
        <div className="row">
          <div className="col-md-6">
            <h6 className="text-primary">Región Metropolitana</h6>
            <ul>
              <li>Santiago y comunas aledañas</li>
              <li>Entrega en 24-48 horas</li>
              <li>Envío gratis sobre $30.000</li>
            </ul>
          </div>
          <div className="col-md-6">
            <h6 className="text-info">Regiones</h6>
            <ul>
              <li>Todas las regiones de Chile</li>
              <li>Entrega en 2-5 días hábiles</li>
              <li>Envío gratis sobre $50.000</li>
            </ul>
          </div>
        </div>
        
        <h4 className="mt-4 text-success">2. Métodos de Envío</h4>
        
        <div className="table-responsive">
          <table className="table table-striped">
            <thead className="table-success">
              <tr>
                <th>Método</th>
                <th>Tiempo</th>
                <th>Costo RM</th>
                <th>Costo Regiones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Envío Estándar</strong></td>
                <td>2-3 días hábiles</td>
                <td>$3.500</td>
                <td>$5.500</td>
              </tr>
              <tr>
                <td><strong>Envío Express</strong></td>
                <td>24 horas</td>
                <td>$6.500</td>
                <td>No disponible</td>
              </tr>
              <tr>
                <td><strong>Retiro en Tienda</strong></td>
                <td>Mismo día</td>
                <td>Gratis</td>
                <td>-</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <h4 className="mt-4 text-success">3. Productos Refrigerados</h4>
        <div className="alert alert-info">
          <strong>❄️ Cadena de frío:</strong> Los productos refrigerados se envían en empaques especiales con gel refrigerante para mantener la temperatura adecuada durante el transporte.
        </div>
        
        <h4 className="mt-4 text-success">4. Seguimiento del Pedido</h4>
        <ul>
          <li><strong>Confirmación:</strong> Recibirá un email con los detalles del envío</li>
          <li><strong>Código de seguimiento:</strong> Podrá rastrear su pedido en tiempo real</li>
          <li><strong>Notificación de entrega:</strong> Le avisaremos cuando su pedido esté en camino</li>
        </ul>
        
        <h4 className="mt-4 text-success">5. Políticas Importantes</h4>
        <ul>
          <li><strong>Direcciones:</strong> Verifique que su dirección sea correcta y completa</li>
          <li><strong>Reintento de entrega:</strong> Hasta 2 intentos sin costo adicional</li>
          <li><strong>Productos perecibles:</strong> Deben ser recibidos el día programado</li>
          <li><strong>Zonas rurales:</strong> Pueden tener costos y tiempos adicionales</li>
        </ul>
        
        <div className="alert alert-warning mt-4">
          <strong>📱 Seguimiento en línea:</strong> Visite nuestra página de "Seguimiento de Compra" o contáctenos por WhatsApp +56 9 1234 5678
        </div>
      </div>
    </div>
  </div>
);

function App() {
  // Estado del carrito
  const [cart, setCart] = useState([]);

  // Estado para modal de confirmación
  const [showModal, setShowModal] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);

  // Cargar carrito de localStorage al iniciar
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Guardar en localStorage cada vez que cambia el carrito
  const updateLocalStorage = (newCart) => {
  setCart(newCart);
  localStorage.setItem("cart", JSON.stringify(newCart));
  console.log('Carrito actualizado:', newCart);
  };

  // Agregar producto (con manejo de cantidad)
  const handleAddToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);

    let newCart;
    if (existingProduct) {
      newCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newCart = [...cart, { ...product, quantity: 1 }];
    }

    updateLocalStorage(newCart);

    // Mostrar modal de confirmación
    setModalProduct(product);
    setShowModal(true);
  };

  // Eliminar producto del carrito
  const handleRemoveFromCart = (id) => {
    const newCart = cart.filter((item) => item.id !== id);
    updateLocalStorage(newCart);
  };

  // Actualizar cantidad de un producto
  const handleUpdateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      handleRemoveFromCart(id); // si baja a 0 lo eliminamos
    } else {
      const newCart = cart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
      updateLocalStorage(newCart);
    }
  };

  // Productos cargados desde el backend
  const [products, setProducts] = useState([]);
  useEffect(() => {
    let mounted = true;
    async function loadProducts() {
      try {
        const resp = await getProducts();
        // mapear al formato que usan los componentes (title, price formateado, img key)
        console.debug('getProducts() raw response mapped items:', resp);
        const ui = resp.map(p => ({
          id: p.id,
          // `mapProducto` ahora intenta extraer hrefs comunes de `_links` si existe.
          // Aquí usamos directamente `p.img` (puede ser URL absoluta, href a recurso o clave local).
          img: p.img || null,
          title: p.name || p.nombre || `Producto ${p.id}`,
          price: p.price !== undefined ? formatPriceCLP(p.price) : p.price,
          priceRaw: p.price,
          category: p.category,
          expirationDate: p.expirationDate,
        }));
        if (mounted) setProducts(ui);
      } catch (e) {
        console.error('Error cargando productos desde API', e);
      }
    }
    loadProducts();
    return () => { mounted = false; };
  }, []);

  // Array de productos en oferta
  const offerProducts = [
    { id: 205, img: "aceite y coco", title: "Aceite de Coco", price: "$15.000", originalPrice: "$18.000", discount: "17%", category: "Dulce" },
    { id: 201, img: "quinoa", title: "Quinoa Premium", price: "$6.000", originalPrice: "$9.000", discount: "33%", category: "Salado" },
    { id: 106, img: "miel de agave", title: "Miel Natural", price: "$3.990", originalPrice: "$5.000", discount: "20%", category: "Dulce" },
    { id: 203, img: "pasta", title: "Pasta Integral Vegana (400g)", price: "$11.990", originalPrice: "$14.000", discount: "14%", category: "Integral" },
  ];

  return (
    <div className="App">
      <Navbar cart={cart} 
      />

      <Routes>
  {/* Rutas públicas existentes */}
        <Route path="/" element={<Home products={products} onAddToCart={handleAddToCart} />} />
  <Route path="/ofertas" element={<Ofertas products={offerProducts} onAddToCart={handleAddToCart} />} />
  <Route path="/categoria/:categoria" element={<Categoria onAddToCart={handleAddToCart} />} />
        <Route path="/novedades" element={<Novedades products={products} onAddToCart={handleAddToCart} />} />
        <Route path="/preguntas-frecuentes" element={<FAQ />} />
        <Route path="/sobre-nosotros" element={<About />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/ubicacion" element={<Location />} />
        <Route path="/registrarse" element={<RegisterForm />} />
        <Route path="/seguimiento-compra" element={<TrackOrder />} />
        <Route path="/iniciar-sesion" element={<InicioSesion />} />
        <Route path="/product/:id" element={<ProductDetail products={[...products, ...offerProducts]} />} />
        <Route path="/carrito" element={
          <Cart
            cart={cart}
            onRemove={handleRemoveFromCart}
            onUpdateQuantity={handleUpdateQuantity}
          />
        } />
        {/* Rutas adicionales del footer */}
        <Route path="/terminos-condiciones" element={<Terms />} />
  <Route path="/blog" element={<Blog />} />
        <Route path="/empleos" element={<Careers />} />
        <Route path="/programa-afiliados" element={<Affiliates />} />
        <Route path="/politica-privacidad" element={<PrivacyPolicy />} />
        <Route path="/devoluciones-reembolsos" element={<ReturnsRefunds />} />
        <Route path="/politica-cookies" element={<CookiesPolicy />} />
        <Route path="/informacion-envios" element={<ShippingInfo />} />
        <Route path="/pago" element={<BotonPago />} />
        {/*  Rutas privadas (solo admin) */}
        <Route
          path="/backoffice/*"
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <BackofficeLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="accounts" element={<Accounts />} />
          <Route path="boletas" element={<Boletas />} />
        </Route>

      </Routes>
      
      <Footer />

      {/* Modal de confirmación */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Producto agregado</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {modalProduct && (
            <>
              <img 
                src={getImageSrc(modalProduct.img)} 
                alt={modalProduct.title} 
                style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "8px", marginBottom: "10px" }} 
              />
              <h5 className="mt-2">{modalProduct.title}</h5>
              <p className="mb-0">Se ha agregado al carrito.</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => setShowModal(false)}>
            Seguir comprando
          </Button>
          <Button variant="primary" href="/carrito">
            Ir al carrito
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
