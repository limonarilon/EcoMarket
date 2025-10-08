import React from "react";
import { useNavigate } from 'react-router-dom';
const ProductCard = ({ productId,img, title, price, product, onAddToCart }) => {
const navigate = useNavigate();
const handleProductClick = () => {
  navigate(`/product/${productId}`);
}
  return (
    <div className="col-md-3 col-sm-6 mb-4">
      <div className="product-card">
        <img src={img} alt={title} className="img-fluid" onClick={handleProductClick} style={{ cursor: 'pointer' }} />
        <h5 className="product-title mt-2" onClick={handleProductClick} style={{ cursor: 'pointer' }}>{title}</h5>
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
