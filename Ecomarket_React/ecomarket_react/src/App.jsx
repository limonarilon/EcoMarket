import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Featured from "./components/Featured";
import BlogPost from "./components/BlogPost";
import Footer from "./components/Footer";
import Cart from "./components/Cart"; // nuevo componente
import { Modal, Button } from "react-bootstrap";
import "./App.css";

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
      {/* Navbar recibe el carrito para mostrar contador si quieres */}
      <Navbar cart={cart} />

      {/* Productos destacados */}
      <Featured products={products} onAddToCart={handleAddToCart} />

      {/* Carrito */}
      <Cart
        cart={cart}
        onRemove={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
      />

      {/* Blog y footer */}
      <BlogPost />
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
