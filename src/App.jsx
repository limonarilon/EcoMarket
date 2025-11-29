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
// import Ofertas from "./components/Ofertas";
// import Novedades from "./components/Novedades";
import FAQ from "./components/FAQ";
import About from "./components/About";
import Contact from "./components/Contact";
import Location from "./components/Location";
import { formatPriceCLP } from "./utils/formatPriceCLP";
import TrackOrder from "./components/TrackOrder";
import Terms from "./components/Terms";
import Careers from "./components/Careers";
import Affiliates from "./components/Affiliates";
import PrivacyPolicy from "./components/PrivacyPolicy";
import ReturnsRefunds from "./components/ReturnsRefunds";
import CookiesPolicy from "./components/CookiesPolicy";
import ShippingInfo from "./components/ShippingInfo";
import Pago from "./components/Pago";

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
      <Featured products={featuredProducts} onAddToCart={onAddToCart} />
      <Carrusel products={featuredProducts} />
      <BlogPost />
    </div>
  );
};



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
    // Normalizar el producto entrante en UN SOLO LUGAR (aquí)
    // Objetivo: que el carrito siempre reciba el mismo shape de objeto.
    // Shape decidido para el carrito (compatibilidad con código existente):
    // {
    //   id,            // identificador único
    //   title,         // nombre para mostrar en UI
    //   price,         // string formateada p.e. "$3.590" (lo que el componente Cart espera)
    //   priceRaw,      // número entero en CLP, útil para cálculos
    //   img,           // clave o URL de imagen
    //   quantity       // cantidad (iniciamos en 1)
    // }

    // 1) Extraer precio numérico (priceRaw) de posibles formatos entrantes.
    // - Si la llamada ya nos da `priceRaw`, lo usamos.
    // - Si `product.price` es número lo usamos tal cual.
    // - Si `product.price` es string (p.e. "$3.590"), limpiamos caracteres no numéricos.
    const priceRaw = product.priceRaw ?? (
      typeof product.price === 'number'
        ? product.price
        : Number(String(product.price || '').replace(/[^0-9]/g, '')) || 0
    );

    // 2) Construir el título que usará la UI (compatibilidad con distintos componentes)
    const title = product.title ?? product.name ?? product.nombre ?? `Producto ${product.id}`;

    // 3) Construir el objeto normalizado que guardaremos en el carrito.
    const normalized = {
      id: product.id,
      title,
      // Si ya recibimos una cadena formateada la respetamos, sino generamos una con el utilitario.
      price: typeof product.price === 'string' && product.price.trim().startsWith('$')
        ? product.price
        : formatPriceCLP(priceRaw),
      priceRaw,
      img: product.img ?? product.image ?? '',
      quantity: 1,
    };

    // 4) Actualizar carrito: si ya existe aumentar cantidad, si no, agregar nuevo item normalizado.
    const existingProduct = cart.find((item) => item.id === normalized.id);
    let newCart;
    if (existingProduct) {
      newCart = cart.map((item) =>
        item.id === normalized.id
          ? { ...item, quantity: (item.quantity || 0) + 1 }
          : item
      );
    } else {
      newCart = [...cart, normalized];
    }

    // 5) Guardar en localStorage y mostrar modal con el objeto normalizado.
    updateLocalStorage(newCart);
    setModalProduct(normalized);
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
        // Fallback: si el backend no responde, mostramos algunos productos locales mínimos
        const fallback = [
          { id: 101, img: 'chcolatee', title: 'Chocolate Orgánico 90% cacao', price: formatPriceCLP(3590), priceRaw: 3590, category: 'dulce' },
          { id: 201, img: 'quinoa', title: 'Quinoa Premium', price: formatPriceCLP(6000), priceRaw: 6000, category: 'salado' },
          { id: 401, img: 'jugos', title: 'Jugos prensados', price: formatPriceCLP(5990), priceRaw: 5990, category: 'bebestibles' },
          { id: 301, img: 'pan', title: 'Pan Integral', price: formatPriceCLP(2500), priceRaw: 2500, category: 'integral' },
        ];
        if (mounted) setProducts(fallback);
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
        {/* <Route path="/ofertas" element={<Ofertas products={offerProducts} onAddToCart={handleAddToCart} />} /> */}
        <Route path="/categoria/:categoria" element={<Categoria onAddToCart={handleAddToCart} />} />
        {/* <Route path="/novedades" element={<Novedades products={products} onAddToCart={handleAddToCart} />} /> */}
        <Route path="/preguntas-frecuentes" element={<FAQ />} />
        <Route path="/preguntas-frecuentes" element={<FAQ />} />
        <Route path="/sobre-nosotros" element={<About />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/ubicacion" element={<Location />} />
        <Route path="/seguimiento-compra" element={<TrackOrder />} />      
        <Route path="/registrarse" element={<RegisterForm />} />
        <Route path="/iniciar-sesion" element={<InicioSesion />} />
        <Route path="/product/:id" element={<ProductDetail onAddToCart={handleAddToCart} />} />
        <Route path="/carrito" element={
          <PrivateRoute>
            <Cart
              cart={cart}
              onRemove={handleRemoveFromCart}
              onUpdateQuantity={handleUpdateQuantity}
            />
          </PrivateRoute>
        } />
        <Route path="/pago" element={<Pago />} />
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
        <Route path="/backoffice/*" element={
          <PrivateRoute adminOnly={true}>
            <BackofficeLayout />
          </PrivateRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="accounts" element={<Accounts />} />
          <Route path="products" element={<Products />} />
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
