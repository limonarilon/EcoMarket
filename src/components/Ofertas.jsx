import React, { useState } from "react";
import { getImageSrc } from "./Images";

/**
 * Componente de Ofertas Especiales.
 * @param {Array} products - Array de productos en oferta.
 * @param {Function} onAddToCart - Función para agregar producto al carrito.
 */
function Ofertas({ products, onAddToCart }) {
  const [selectedFilter, setSelectedFilter] = useState("Filtros");
  const filtered =
    selectedFilter === "Filtros"
      ? products
      : (products || []).filter((p) => p.category === selectedFilter);

  return (
    <div className="container my-5">
      <h2 className="section-title-llamativo">Ofertas Especiales</h2>
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
        </select>
      </div>
      <div className="row">
        {(filtered || []).map((p) => (
          <div key={p.id} className="col-md-6 mb-4">
            <div className="card h-100">
              <img
                src={getImageSrc(p.img)}
                className="card-img-top"
                alt={p.title}
              />
              <div className="card-body">
                <h5 className="card-title">{p.title}</h5>
                <p className="card-text">{p.price}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => onAddToCart(p)}
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Ofertas;