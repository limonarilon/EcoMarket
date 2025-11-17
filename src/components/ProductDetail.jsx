import React from "react";
import images from "../assets/images";
import { useParams } from 'react-router-dom';

// Productos genéricos por categoría
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

const ProductDetail = ({ products = [] }) => {
  const { id } = useParams();
  const allProducts = [
    ...products,
    ...productosPorCategoria.dulce,
    ...productosPorCategoria.salado,
    ...productosPorCategoria.integral,
    ...productosPorCategoria.bebestibles,
  ];
  let product = allProducts.find(p => p.id === parseInt(id));
  if (product && !product.expirationDate) {
    product = {
      ...product,
      expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0,10)
    };
  }
  if (!product) {
    return <div className="container my-5"><h2>Producto no encontrado</h2></div>;
  }

  return (
    <div className="container my-5">
      <div className="row g-4">
        <div className="col-md-5">
          <img src={images[product.img] || product.img}
            alt={product.nombre || product.title}
            className="img-fluid rounded"
            style={{ height: "300px", width: "100%", objectFit: "cover" }} />
        </div>
        <div className="col-md-7">
          <h2>{product.nombre || product.title}</h2>
          <p className="text-primary fs-4 fw-bold">
            {product.precio !== undefined
              ? `$${product.precio.toLocaleString("es-CL")}`
              : product.price}
          </p>
          <p className="mb-1"><strong>Fecha de expiración:</strong> {product.expirationDate}</p>
          <button className="btn btn-success mb-3">Agregar al carrito</button>
          <p>
            Este producto orgánico es ideal para una alimentación saludable.
            Libre de químicos y cultivado de manera sustentable.
          </p>
          <hr />
          <h5>Opiniones</h5>
          <div className="mb-2">
            <strong>Juan Pérez</strong> <span className="text-warning">★★★★★</span>
            <p>Excelente calidad y sabor. Lo recomiendo totalmente.</p>
          </div>
          <div>
            <strong>María López</strong> <span className="text-warning">★★★★☆</span>
            <p>Muy buen producto, llegó rápido y en buen estado.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
