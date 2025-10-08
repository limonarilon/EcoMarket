import React from "react";
import ProductCard from "./ProductCard";

const Featured = ({ products, onAddToCart }) => {
  return (
    <section id="featured-products" className="featured-product-section">
      <div className="container">
        <div className="row mb-5">
          <div className="col-12 text-center">
            <h2 className="section-title">Productos Destacados</h2>
            <p className="section-subtitle">
              Encuentra los mejores productos seleccionados para ti
            </p>
          </div>
        </div>

        <div className="row">
          {products.map((product) => (
          <ProductCard
            key={product.id}
            productId={product.id}
            img={product.img}
            title={product.title}
            price={product.price}
            product={product}
            onAddToCart={() => onAddToCart(product)}
          />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Featured;
