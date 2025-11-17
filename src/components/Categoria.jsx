import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductDetail from "./ProductDetail";
import { Card, Button } from "react-bootstrap";
import images from "../assets/images";

const productosPorCategoria = {
  dulce: [
    { id: 101, nombre: "Chocolate Orgánico 90% cacao", precio: 3590, img: "chcolatee", expirationDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0,10) },
    { id: 102, nombre: "Mix Frutos Secos", precio: 4670, img: "fruos-secos", expirationDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().slice(0,10) },
    { id: 103, nombre: "Mermelada Frutal", precio: 2990, img: "mermelada", expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0,10) },
    { id: 104, nombre: "Barra de Cereal", precio: 1890, img: "barra datil", expirationDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().slice(0,10) },
    { id: 105, nombre: "Galletas Integrales", precio: 2490, img: "galletas", expirationDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString().slice(0,10) },
    { id: 106, nombre: "Miel Natural", precio: 3990, img: "miel de agave", expirationDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().slice(0,10) },
  ],
  salado: [
    { id: 201, nombre: "Quinoa Premium", precio: 6000, img: "quinoa", expirationDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().slice(0,10) },
    { id: 202, nombre: "Aceitunas Verdes", precio: 3200, img: "aceitunas", expirationDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().slice(0,10) },
    { id: 203, nombre: "Pasta Integral Vegana (400g)", precio: 11990, img: "pasta", expirationDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().slice(0,10) },
    { id: 204, nombre: "Mix de Semillas", precio: 4500, img: "semillas", expirationDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().slice(0,10) },
    { id: 205, nombre: "Aceite de Coco", precio: 15000, img: "aceite y coco", expirationDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().slice(0,10) },
  ],
  integral: [
    { id: 301, nombre: "Pan Integral", precio: 2500, img: "pan", expirationDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0,10) },
    { id: 302, nombre: "Harina Integral", precio: 3500, img: "harina", expirationDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().slice(0,10) },
    { id: 303, nombre: "Galletas de Avena", precio: 2200, img: "galletasa", expirationDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString().slice(0,10) },
    { id: 304, nombre: "Cereal Integral", precio: 4100, img: "cereal", expirationDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().slice(0,10) },
    { id: 305, nombre: "Tortillas Integrales", precio: 2800, img: "tortillas", expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0,10) },
    { id: 306, nombre: "Pasta Integral Vegana (400g)", precio: 11990, img: "pasta", expirationDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().slice(0,10) }, 
  ],
  bebestibles: [
    { id: 401, nombre: "Fruta congelada (500g)", precio: 4990, img: "fruta-congelada", expirationDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0,10) },
    { id: 402, nombre: "Kombucha sabor naranja (200ml)", precio: 2990, img: "kombucha", expirationDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().slice(0,10) },
    { id: 403, nombre: "Té Chino sabor menta (10u)", precio: 2590, img: "te-menta", expirationDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().slice(0,10) },
    { id: 404, nombre: "Jugos de fruta prensados en frio (3u de 200ml)", precio: 5990, img: "jugos", expirationDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0,10) },
    { id: 405, nombre: "Alimento vegetal de almendras (1Lt)", precio: 3990, img: "leche-vegetal", expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0,10) },
  ],
};

const Categoria = ({ onAddToCart }) => {
  const { categoria } = useParams();
  const navigate = useNavigate();
  const productos = productosPorCategoria[categoria] || [];
  const [filtro, setFiltro] = useState("");

  const productosFiltrados = filtro
    ? productos.filter(p => p.nombre.toLowerCase().includes(filtro.toLowerCase()))
    : productos;

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
                  src={images[producto.img]}
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
                  <Button variant="success" onClick={() => onAddToCart({...producto,
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
