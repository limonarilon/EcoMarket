import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { getImageSrc } from './Images';
import { getProducts } from '../services/api';
import { classifyMany } from '../utils/classifyProduct';

const Categoria = ({ onAddToCart }) => {
  const { categoria } = useParams(); 
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ahora obtenemos los productos desde la API y clasificamos por heurística.


  useEffect(() => {
    let mounted = true;

    async function loadProducts() {
      try {
        setLoading(true);
        // Traemos productos desde la API (mapProducto en api.js normaliza campos)
        const apiProducts = await getProducts();

        // Aplicamos la clasificación heurística (si un producto ya tiene category, no se sobreescribe)
        const normalized = classifyMany(apiProducts);

        // Filtrado por parámetro de ruta `categoria` (si existe)
        const catParam = (categoria || '').toLowerCase();
        const filtered = normalized.filter(p => {
          const pc = (p.category || 'sin-categoria').toLowerCase();
          return !catParam || pc === catParam;
        });

        if (mounted) {
          setProductos(filtered);
        }
      } catch (err) {
        console.error('Error cargando productos en Categoria:', err);
        if (mounted) setProductos([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }

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
                      {producto.name ?? producto.nombre}
                    </Card.Title>
                  <Card.Text>
                      Precio: ${((producto.price ?? producto.precio) || 0).toLocaleString("es-CL")}
                  </Card.Text>
                  <Button variant="primary" onClick={() => navigate(`/product/${producto.id}`)}>
                    Ver detalle
                  </Button>
                    <Button variant="success" className="ms-2" onClick={() => onAddToCart({
                      id: producto.id,
                      name: producto.name ?? producto.nombre,
                      price: Number(producto.price ?? producto.precio ?? 0),
                      img: producto.img ?? '',
                      quantity: 1
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