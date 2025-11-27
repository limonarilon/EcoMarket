import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { getImageSrc } from './Images';

/**
 * Componente de Ofertas Especiales.
 * Muestra hasta 4 productos en oferta, con opción de filtrado por categoría.
 * Usa datos estáticos de productos como referencia.
 * @param {Function} onAddToCart - Función para agregar producto al carrito.
 */
const Ofertas = ({ onAddToCart }) => {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("Filtros");
  const [loading, setLoading] = useState(true);

  // Datos de productos por categorías (referencia)
  const productosData = {
    dulce: [
      { id: 106, nombre: "Miel Natural", precio: 3990, img: "miel de agave", expirationDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().slice(0,10), category: "Dulce" }
    ],
    salado: [
      { id: 202, nombre: "Aceitunas Verdes", precio: 3200, img: "aceitunas", expirationDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().slice(0,10), category: "Salado" }
    ],
    integral: [
      { id: 304, nombre: "Cereal Integral", precio: 4100, img: "cereal", expirationDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().slice(0,10), category: "Integral" }
      
    ],
    bebestibles: [
      { id: 405, nombre: "Alimento vegetal de almendras (1Lt)", precio: 3990, img: "leche-vegetal", expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0,10), category: "Bebestibles" }
    ],
  };

  useEffect(() => {
    let mounted = true;
    const loadProducts = () => {
      const productosArray = [];
   
      Object.keys(productosData).forEach(categoriaKey => {
        productosData[categoriaKey].forEach(producto => {
          productosArray.push(producto);
        });
      });

      if (mounted) {
        setProductos(productosArray);
        setLoading(false);
      }
    };

    loadProducts();

    return () => { mounted = false; };
  }, []);

  const filtered =
    selectedFilter === "Filtros"
      ? productos
      : productos.filter((p) => p.category === selectedFilter);

 const productsToShow = filtered.slice(0, 4);

  if (loading) return <div className="container my-5 text-center"><h3>Cargando productos...</h3></div>;

  return (
    <div className="container my-5">
      <h2 className="mb-4">Ofertas Especiales</h2>
      <div className="mb-3">
        <select
          className="form-select w-auto"
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
        >
          <option value="Filtros">Filtros</option>
          <option value="Integral">Integral</option>
          <option value="Dulce">Dulce</option>
          <option value="Salado">Salado</option>
          <option value="Bebestibles">Bebestibles</option>
        </select>
      </div>

      <div className="row">
        {productsToShow.length === 0 ? (
          <div className="col-12 text-center">No hay productos en esta categoría.</div>
        ) : (
          productsToShow.map(producto => (
            <div className="col-md-4 mb-4" key={producto.id}>
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  src={getImageSrc(producto.img)} 
                  alt={producto.nombre}
                  style={{ height: "180px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/product/${producto.id}`)} 
                  >
                    {producto.nombre}
                  </Card.Title>
                  <Card.Text>
                    Precio: ${producto.precio.toLocaleString("es-CL")}
                  </Card.Text>
                  <Card.Text>
                    <small className="text-muted">Expira: {producto.expirationDate}</small>
                  </Card.Text>
                  <Button variant="primary" onClick={() => navigate(`/product/${producto.id}`)}>
                    Ver detalle
                  </Button>
                  <Button variant="success" className="ms-2" onClick={() => onAddToCart({
                    title: producto.nombre,
                    price: `$${producto.precio.toLocaleString("es-CL")}`,
                    img: producto.img
                  })}>
                    Agregar al carrito
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Ofertas;
