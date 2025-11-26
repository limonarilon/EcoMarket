import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { getImageSrc } from './Images';

const Categoria = ({ onAddToCart }) => {
  const { categoria } = useParams(); 
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Productos por categorías
  const productosData = {
  "Dulce": [
    "Chocolate Orgánico 90% cacao", 
    "Mix Frutos Secos", 
    "Mermelada Frutal",
    "Barra de Cereal", 
    "Galletas Integrales", 
    "Miel Natural"
  ],
  "Salado": [
    "Quinoa Premium", 
    "Aceitunas Verdes", 
    "Pasta Integral Vegana (400g)", 
    "Mix de Semillas", 
    "Aceite de Coco"
  ],
  "Integral": [
    "Pan Integral", 
    "Harina Integral", 
    "Galletas de Avena", 
    "Cereal Integral", 
    "Tortillas Integrales", 
    "Pasta Integral Vegana (400g)"
],
  "Bebestibles":[
    "Fruta congelada (500g)", 
    "Kombucha sabor naranja (200ml)", 
    "Té Chino sabor menta (10u)", 
    "Jugos de fruta prensados en frio (3u de 200ml)", 
    "Alimento vegetal de almendras (1Lt)"
]
};


  useEffect(() => {
    let mounted = true;
    const loadProducts = () => {
      const productosArray = [];
      // se filtran los productos por categoria
      Object.keys(productosData).forEach(categoriaKey => {
        if (!categoria || categoriaKey.toLowerCase() === categoria.toLowerCase()) {
          productosData[categoriaKey].forEach(producto => {
            productosArray.push(producto);
          });
        }
      });

      if (mounted) {
        setProductos(productosArray);
        setLoading(false);
      }
    };

    loadProducts();

    return () => { mounted = false; };
  }, [categoria]);

  if (loading) return <div className="container my-5 text-center"><h3>Cargando productos...</h3></div>;

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-capitalize">Categoría: {categoria || "Todas"}</h2>

      <div className="row">
        {productos.length === 0 ? (
          <div className="col-12 text-center">No hay productos en esta categoría.</div>
        ) : (
          productos.map(producto => (
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

export default Categoria;