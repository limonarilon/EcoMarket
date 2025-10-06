import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Featured from "./components/Featured";
import BlogPost from "./components/BlogPost";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import RegisterForm from "./components/RegisterForm";
import { Modal, Button } from "react-bootstrap";
import "./App.css";

// Componentes de páginas
const Home = ({ products, onAddToCart }) => (
  <div>
    <Featured products={products} onAddToCart={onAddToCart} />
    <BlogPost />
  </div>
);

const Ofertas = () => (
  <div className="container my-5">
    <h2>Ofertas Especiales</h2>
    <p>Aquí encontrarás nuestras mejores ofertas y descuentos.</p>
  </div>
);

const Novedades = () => (
  <div className="container my-5">
    <h2>Novedades</h2>
    <p>Descubre los productos más nuevos en EcoMarket.</p>
  </div>
);

const FAQ = () => (
  <div className="container my-5">
    <h2>Preguntas Frecuentes</h2>
    <div className="accordion" id="faqAccordion">
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
            ¿Cómo puedo realizar un pedido?
          </button>
        </h2>
        <div id="collapseOne" className="accordion-collapse collapse show">
          <div className="accordion-body">
            Puedes realizar tu pedido navegando por nuestros productos y agregándolos al carrito.
          </div>
        </div>
      </div>
    </div>
  </div>
);

const About = () => (
  <div className="container my-5">
    <h2>Sobre EcoMarket</h2>
    <p>EcoMarket es tu tienda de productos orgánicos y sustentables.</p>
  </div>
);

const Contact = () => (
  <div className="container my-5">
    <h2>Contacto</h2>
    <p>Ponte en contacto con nosotros para cualquier consulta.</p>
  </div>
);

const Location = () => (
  <div className="container my-5">
    <h2>Ubicación</h2>
    <p>Encuéntranos en nuestras tiendas físicas.</p>
  </div>
);

const News = () => (
  <div className="container my-5">
    <h2>Noticias Relevantes</h2>
    <p>Mantente al día con las últimas noticias sobre productos orgánicos y sustentabilidad.</p>
  </div>
);

const TrackOrder = () => (
  <div className="container my-5">
    <h2>Seguimiento de Compra</h2>
    <p>Rastrea el estado de tu pedido aquí.</p>
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

  // Array de productos de ejemplo (deberías cargar estos desde backend en el futuro)
  const products = [
    { id: 1, img: "/assets/producto1.jpg", title: "Producto 1", price: "$10.000" },
    { id: 2, img: "/assets/producto2.jpg", title: "Producto 2", price: "$15.000" },
    { id: 3, img: "/assets/producto3.jpg", title: "Producto 3", price: "$20.000" },
    { id: 4, img: "/assets/producto4.jpg", title: "Producto 4", price: "$25.000" },
  ];

  return (
    <div className="App">
      <Navbar cart={cart} />
      
      <Routes>
        <Route path="/" element={<Home products={products} onAddToCart={handleAddToCart} />} />
        <Route path="/ofertas" element={<Ofertas />} />
        <Route path="/novedades" element={<Novedades />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/location" element={<Location />} />
        <Route path="/news" element={<News />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/track-order" element={<TrackOrder />} />
        <Route path="/cart" element={
          <Cart
            cart={cart}
            onRemove={handleRemoveFromCart}
            onUpdateQuantity={handleUpdateQuantity}
          />
        } />
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
