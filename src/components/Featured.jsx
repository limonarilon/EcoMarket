import React from "react";
import formattedImages, { getImageSrc } from './Images';
import ProductCard from "./ProductCard";

import "../assets/css/Featured.css";

const Featured = ({ products, onAddToCart }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${formattedImages['.assets/images/background-pattern']})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
      }}
    >
      <section id="featured-products" className="featured-product-section">
        <div className="container">
          <div className="row mb-5">
            <div className="col-12 text-center">
              <h2
                className="section-title"
                style={{
                  color: '#28a745',
                  fontWeight: 'bold',
                  fontSize: '2.8rem',
                  letterSpacing: '2px',
                  textShadow: '0 2px 8px rgba(40,167,69,0.15)',
                  marginBottom: '0.5rem',
                  fontFamily: 'Montserrat, Arial, sans-serif',
                }}
              >
                Productos Destacados
              </h2>
              <p
                className="section-subtitle"
                style={{
                  color: '#155724',
                  fontSize: '1.35rem',
                  fontWeight: 500,
                  background: 'rgba(255,255,255,0.85)',
                  borderRadius: '12px',
                  display: 'inline-block',
                  padding: '0.5rem 1.5rem',
                  boxShadow: '0 2px 12px rgba(21,87,36,0.08)',
                  fontFamily: 'Montserrat, Arial, sans-serif',
                }}
              >
                Encuentra los mejores productos seleccionados para ti
              </p>
            </div>
          </div>
          <div className="row">
            {products.map((product) => {
              // Si el producto no tiene expirationDate, asignar una por defecto (1 mes en el futuro)
              const safeProduct = {
                ...product,
                expirationDate: product.expirationDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0,10)
              };
              return (
                <ProductCard
                      key={safeProduct.id}
                      productId={safeProduct.id}
                      img={safeProduct.img}
                      title={safeProduct.title}
                      price={safeProduct.price}
                      product={safeProduct}
                      onAddToCart={() => onAddToCart(safeProduct)}
                    />
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Featured;
