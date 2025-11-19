import React from "react";
import { useNavigate } from "react-router-dom";
import { getImageSrc } from "./Images";

/**
 * Componente de Novedades.
 * @param {Array} products - Array de productos (no se usa, pero puedes adaptarlo si lo necesitas).
 * @param {Function} onAddToCart - Función para agregar producto al carrito.
 */
function Novedades({ products, onAddToCart }) {
  const navigate = useNavigate();
  const novedadesProducts = [
    { id: 101, img: "chcolatee", title: "Chocolate Orgánico 90% cacao", price: "$3.590" },
    { id: 102, img: "fruos-secos", title: "Mix Frutos Secos", price: "$4.670" },
    { id: 203, img: "pasta", title: "Pasta Integral Vegana (400g)", price: "$11.990" },
    { id: 205, img: "aceite y coco", title: "Aceite de Coco", price: "$15.000" },
  ];
  return (
    <div className="container my-5">
      <h2 className="section-title-llamativo">Novedades</h2>
      <div className="row">
        {novedadesProducts.map(product => (
          <div key={product.id} className="col-md-6 mb-4 d-flex">
            <div className="card w-100">
              <img src={getImageSrc(product.img)} className="card-img-top" alt={product.title} />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.price}</p>
                <button className="btn btn-primary" onClick={() => onAddToCart(product)}>Agregar al carrito</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Novedades;