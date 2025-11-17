import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProducts } from "../services/api";
import ProductDetail from "./ProductDetail";
import { Card, Button } from "react-bootstrap";
import { getImageSrc } from './Images';

// Ahora obtenemos productos desde la API y filtramos por categoría

const Categoria = ({ onAddToCart }) => {
  const { categoria } = useParams();
  const navigate = useNavigate();
  const [filtro, setFiltro] = useState("");
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const resp = await getProducts();
        // mapear a la forma usada por el UI
        const ui = (resp || []).map(p => ({
          id: p.id,
          nombre: p.name || p.nombre || p.title || `Producto ${p.id}`,
          precio: p.price !== undefined ? p.price : p.precio,
          img: p.img || p.image || null,
          categoria: (p.category || p.categoria || "").toLowerCase(),
          expirationDate: p.expirationDate || p.vencimiento || null,
        }));

        if (mounted) {
          setProductos(ui);
          setLoading(false);
        }
      } catch (e) {
        console.error('Error cargando productos en Categoria', e);
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  const productosFiltrados = productos
    .filter(p => !categoria || p.categoria === categoria.toLowerCase())
    .filter(p => !filtro || p.nombre.toLowerCase().includes(filtro.toLowerCase()));

  if (loading) return <div className="container my-5 text-center"><h3>Cargando productos...</h3></div>;

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-capitalize section-title-llamativo">Categoría: {categoria}</h2>
      <input
        type="text"
        className="form-control w-auto mb-3"
        placeholder="Filtrar productos..."
        value={filtro}
        onChange={e => setFiltro(e.target.value)}
      />
      <div className="row">
        {productosFiltrados.length === 0 ? (
          <div className="col-12 text-center">No hay productos en esta categoría.</div>
        ) : (
          productosFiltrados.map(producto => (
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
                  <Button variant="success" className="ms-2" onClick={() => onAddToCart({...producto,
                    title : producto.nombre,
                    price : `$${producto.precio.toLocaleString("es-CL")}`,
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
