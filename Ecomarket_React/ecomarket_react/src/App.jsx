import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Featured from "./components/Featured";
import BlogPost from "./components/BlogPost";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import RegisterForm from "./components/RegisterForm";
import InicioSesion from "./components/InicioSesion";
import ProductCard from "./components/ProductCard";
import { Modal, Button, Accordion } from "react-bootstrap";
import "./styles/style.css";
import ProductDetail from "./components/ProductDetail";
import PrivateRoute from "./routes/PrivateRoute";
import Dashboard from "./backoffice/Dashboard";
import Products from "./backoffice/Products";
import Accounts from "./backoffice/Accounts";
import BackofficeLayout from "./backoffice/BackofficeLayout";

// Componentes de páginas
const Home = ({ products, onAddToCart }) => (
  <div>
    <Featured products={products} onAddToCart={onAddToCart} />
    <BlogPost />
  </div>
);

const Ofertas = ({ products, onAddToCart }) => {
  // Estado para el filtro
  const [selectedFilter, setSelectedFilter] = useState("Filtros");

  // Filtrar productos según la categoría seleccionada 
  let filteredProducts;
  if (selectedFilter === "Filtros") {
    filteredProducts = products; // Mostrar todos los productos
  } else {
    filteredProducts = products.filter(product => product.category === selectedFilter); // Filtrar por categoría
  }

  // Manejar cambio de filtro
  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
  };

  return (
    <div className="container my-5">
      <h2>Ofertas Especiales</h2>
      <p>Aquí encontrarás nuestras mejores ofertas y descuentos.</p>
      
      <select 
        className="form-select bg-success text-white border-success rounded px-3 py-2 fw-medium me-5 w-auto"
        value={selectedFilter}
        onChange={handleFilterChange}
      >
        <option value="Filtros">Filtros</option>
        <option value="Dulce">Dulce</option>
        <option value="Salado">Salado</option>
        <option value="Integral">Integral</option>
      </select>

      {/* Mostrar productos filtrados */}
      <div className="row mt-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              productId={product.id}
              img={product.img}
              title={product.title}
              price={product.price}
              originalPrice={product.originalPrice}
              discount={product.discount}
              product={product}
              onAddToCart={() => onAddToCart(product)}
            />
          ))
        ) : (
          <div className="col-12 text-center">
            <p className="text-muted">No hay productos disponibles para esta categoría.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Novedades = ({ products, onAddToCart }) => {
  const navigate = useNavigate();
  
  // Seleccionar solo los primeros 2 productos para novedades
  const featuredProducts = products.slice(0, 2);

  // Descripciones para cada producto
  const productDescriptions = {
    1: "Este producto revolucionario ha llegado para transformar tu experiencia culinaria. Perfecto para quienes buscan calidad premium y sabor excepcional.",
    2: "Una novedad increíble que combina tradición y modernidad. Ideal para crear momentos especiales en tu hogar con ingredientes de primera calidad."
  };

  return (
    <div className="container my-5">
      <h2>Novedades</h2>
      <p>Descubre los productos más nuevos en EcoMarket.</p>
      
      {/* Layout vertical de productos */}
      <div className="mt-4">
        {featuredProducts.map((product, index) => (
          <div key={product.id} className={`row align-items-center g-2 ${index > 0 ? 'mt-3' : ''}`}>
            {/* Columna del producto */}
            <div className="col-md-6">
              <div className="product-card">
                <img 
                  src={product.img} 
                  alt={product.title} 
                  className="img-fluid" 
                  onClick={() => navigate(`/product/${product.id}`)}
                  style={{ cursor: 'pointer' }} 
                />
                <h5 className="product-title mt-2" style={{ cursor: 'pointer' }}>
                  {product.title}
                </h5>
                <p className="product-price">{product.price}</p>
                <button 
                  className="btn btn-primary mt-2" 
                  onClick={() => onAddToCart(product)}
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
            
            {/* Columna del texto descriptivo */}
            <div className="col-md-6">
              <div className="product-description p-2 bg-light rounded">
                <h4 className="text-success mb-2">¡Novedad!</h4>
                <p className="text-muted mb-1">
                  {productDescriptions[product.id] || "¡Descubre este increíble producto que acaba de llegar a nuestra tienda! Una opción perfecta para complementar tu estilo de vida saludable."}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const FAQ = () => {
  console.log("FAQ component is rendering"); // Para debug
  
  return (
    <div className="container my-5">
      <h2>Preguntas Frecuentes</h2>
      <p>Prueba de renderizado...</p>
      
      {/* Accordion simplificado para prueba */}
      <div className="accordion" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button 
              className="accordion-button" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#collapseOne" 
              aria-expanded="true" 
              aria-controls="collapseOne"
            >
              ¿Cómo puedo realizar un pedido?
            </button>
          </h2>
          <div 
            id="collapseOne" 
            className="accordion-collapse collapse show" 
            aria-labelledby="headingOne" 
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              Puedes realizar tu pedido navegando por nuestros productos y agregándolos al carrito.
            </div>
          </div>
        </div>
        
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button 
              className="accordion-button collapsed" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#collapseTwo" 
              aria-expanded="false" 
              aria-controls="collapseTwo"
            >
              ¿Qué métodos de pago aceptan?
            </button>
          </h2>
          <div 
            id="collapseTwo" 
            className="accordion-collapse collapse" 
            aria-labelledby="headingTwo" 
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              Aceptamos pagos con tarjetas de crédito, débito y transferencias bancarias.
            </div>
          </div>
        </div>
        
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingThree">
            <button 
              className="accordion-button collapsed" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#collapseThree" 
              aria-expanded="false" 
              aria-controls="collapseThree"
            >
              ¿Realizan despachos en días hábiles?
            </button>
          </h2>
          <div 
            id="collapseThree" 
            className="accordion-collapse collapse" 
            aria-labelledby="headingThree" 
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              Sí, los despachos se realizan únicamente en días hábiles. Los pedidos realizados durante fines de semana o feriados serán procesados el siguiente día hábil.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const About = () => (
  <div className="container my-5">
    <h2>Sobre EcoMarket</h2>
    <p>
      En EcoMarket nos dedicamos a ofrecer productos orgánicos de la más alta calidad, seleccionados cuidadosamente para promover un estilo de vida saludable y sostenible. Nuestra misión es facilitar el acceso a alimentos y productos naturales, garantizando frescura, autenticidad y responsabilidad ambiental en cada compra. Creemos en el poder de la alimentación consciente y trabajamos para que cada cliente disfrute de una experiencia confiable y satisfactoria al adquirir nuestros productos en línea.
    </p>
    <div className="text-center mt-4">
      <img src="/assets/about-ecoshop.jpg" alt="EcoMarket equipo" className="img-fluid rounded shadow" style={{ maxWidth: "400px" }} />
    </div>
  </div>
);

const Contact = () => (
  <div className="container my-5">
    <h2>Contacto</h2>
    <p>
      ¿Tienes dudas, sugerencias o necesitas ayuda con tu compra? Nuestro equipo está disponible para atenderte y brindarte la mejor experiencia en EcoMarket. Puedes contactarnos a través de los siguientes medios:
    </p>
    <ul className="list-unstyled mt-4">
      <li className="mb-3 d-flex align-items-center">
        <img src="/assets/whatsapp-logo.png" alt="WhatsApp" style={{ width: "28px", marginRight: "10px" }} />
        <span className="fw-bold">WhatsApp:</span> <span className="ms-2">+569 1234 5678</span>
      </li>
      <li className="mb-3 d-flex align-items-center">
        <img src="/assets/instagram-logo.png" alt="Instagram" style={{ width: "28px", marginRight: "10px" }} />
        <span className="fw-bold">Instagram:</span> <span className="ms-2">@ecomarket_cl</span>
      </li>
      <li className="mb-3 d-flex align-items-center">
        <img src="/assets/email-logo.png" alt="Correo" style={{ width: "28px", marginRight: "10px" }} />
        <span className="fw-bold">Correo electrónico:</span> <span className="ms-2">contacto@ecomarket.cl</span>
      </li>
    </ul>
    <p>
      ¡Esperamos tu mensaje y te responderemos lo antes posible!
    </p>
  </div>
);

const Location = () => (
  <div className="container my-5">
    <h2>Ubicación</h2>
    <p>Somos una tienda online con la posibilidad de retiro en nuestras oficinas. A continuación, te mostramos nuestra dirección:</p>
    <p><strong>Dirección:</strong> Av. Siempre Viva 123, Santiago, Chile</p>
    <img src="/assets/location-map.jpg" alt="Mapa de ubicación" className="img-fluid rounded shadow" />
  </div>
);

const TrackOrder = () => (
  <div className="container my-5">
    <h2>Seguimiento de Compra</h2>
    <p>Rastrea el estado de tu pedido aquí.</p>
  </div>
);

// Nuevos componentes para las páginas adicionales del footer
const Terms = () => (
  <div className="container my-5">
    <h2>Términos y Condiciones</h2>
    
    <div className="row">
      <div className="col-lg-10 mx-auto">
        <p className="lead">Última actualización: Octubre 2025</p>
        
        <h4 className="mt-4 text-success">1. Aceptación de los Términos</h4>
        <p>Al acceder y utilizar el sitio web de EcoMarket, usted acepta cumplir con estos términos y condiciones. Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestro servicio.</p>
        
        <h4 className="mt-4 text-success">2. Productos y Servicios</h4>
        <p>EcoMarket se especializa en la venta de productos orgánicos y naturales. Nos esforzamos por proporcionar descripciones precisas de todos nuestros productos, incluyendo ingredientes, origen y certificaciones orgánicas.</p>
        
        <h4 className="mt-4 text-success">3. Precios y Pagos</h4>
        <ul>
          <li>Todos los precios están expresados en pesos chilenos e incluyen IVA</li>
          <li>Los precios pueden cambiar sin previo aviso</li>
          <li>Aceptamos pagos con tarjetas de crédito, débito y transferencias bancarias</li>
          <li>El pago debe completarse antes del envío del pedido</li>
        </ul>
        
        <h4 className="mt-4 text-success">4. Envíos y Entregas</h4>
        <p>Los envíos se realizan dentro del territorio nacional. Los tiempos de entrega pueden variar según la ubicación geográfica. EcoMarket no se hace responsable por retrasos causados por terceros o condiciones climáticas adversas.</p>
        
        <h4 className="mt-4 text-success">5. Responsabilidades del Usuario</h4>
        <ul>
          <li>Proporcionar información veraz y actualizada</li>
          <li>Mantener la confidencialidad de su cuenta</li>
          <li>Usar el sitio web de manera responsable y legal</li>
        </ul>
        
        <h4 className="mt-4 text-success">6. Limitación de Responsabilidad</h4>
        <p>EcoMarket no será responsable por daños indirectos, incidentales o consecuenciales que resulten del uso de nuestros productos o servicios, excepto donde la ley lo prohíba.</p>
        
        <div className="alert alert-info mt-4">
          <strong>Contacto:</strong> Para consultas sobre estos términos, contáctanos en info@ecomarket.cl
        </div>
      </div>
    </div>
  </div>
);

const Blog = () => (
  <div className="container my-5">
    <h2>Nuestro Blog</h2>
    <p>Artículos sobre vida saludable y productos orgánicos.</p>
  </div>
);

const Careers = () => (
  <div className="container my-5">
    <h2>Trabajar en EcoMarket</h2>
    
    <div className="row">
      <div className="col-lg-10 mx-auto">
        <div className="text-center mb-5">
          <img 
            src="/assets/equipo-ecomarket.jpg" 
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
      <h2>Programa de Afiliados EcoMarket</h2>
      
      <div className="row">
        <div className="col-lg-10 mx-auto">
          <div className="text-center mb-5">
            <img 
              src="/assets/programa-afiliados.jpg" 
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

  // Array de productos de ejemplo 
  const products = [
    { id: 1, img: "/assets/producto1.jpg", title: "Producto 1", price: "$10.000" },
    { id: 2, img: "/assets/producto2.jpg", title: "Producto 2", price: "$15.000" },
    { id: 3, img: "/assets/producto3.jpg", title: "Producto 3", price: "$20.000" },
    { id: 4, img: "/assets/producto4.jpg", title: "Producto 4", price: "$25.000" },
  ];

  // Array de productos en oferta
  const offerProducts = [
    { id: 5, img: "/assets/producto1.jpg", title: "Aceite de Coco Orgánico", price: "$8.500", originalPrice: "$12.000", discount: "30%", category: "Dulce" },
    { id: 6, img: "/assets/producto2.jpg", title: "Quinoa Premium", price: "$6.000", originalPrice: "$9.000", discount: "33%", category: "Salado" },
    { id: 7, img: "/assets/producto3.jpg", title: "Miel de Agave", price: "$4.500", originalPrice: "$7.000", discount: "35%", category: "Dulce" },
    { id: 8, img: "/assets/producto4.jpg", title: "Pasta Integral", price: "$3.200", originalPrice: "$5.000", discount: "36%", category: "Integral" },
  ];

  return (
    <div className="App">
      <Navbar cart={cart} />
      
      <Routes>
        {/* Rutas públicas existentes */}
        <Route path="/" element={<Home products={products} onAddToCart={handleAddToCart} />} />
        <Route path="/ofertas" element={<Ofertas products={offerProducts} onAddToCart={handleAddToCart} />} />
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
        </Route>

      </Routes>
      
      <Footer />

      {/* Modal de confirmación */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Producto agregado al carrito</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalProduct && (
            <div className="d-flex align-items-center">
              <img
                src={modalProduct.img}
                alt={modalProduct.title}
                style={{ width: "60px", height: "60px", marginRight: "15px" }}
              />
              <div>
                <p className="mb-0">{modalProduct.title}</p>
                <p className="mb-0">{modalProduct.price}</p>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
