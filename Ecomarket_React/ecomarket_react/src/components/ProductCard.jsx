import React from "react";

const ProductCard = ({ img, title, price, onAddToCart }) => {
  return (
    <div className="col-md-3 col-sm-6 mb-4">
      <div className="product-card">
        <img src={img} alt={title} className="img-fluid" />
        <h5 className="product-title mt-2">{title}</h5>
        <p className="product-price">{price}</p>
        {onAddToCart && (
          <button className="btn btn-primary mt-2" onClick={onAddToCart}>
            Agregar al carrito
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
