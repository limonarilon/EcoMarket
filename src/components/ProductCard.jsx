import React from "react";
import { useNavigate } from 'react-router-dom';
import { getImageSrc } from './Images';

const ProductCard = ({ productId, img, title, price, originalPrice, discount, product, onAddToCart }) => {
  const navigate = useNavigate();
  const handleProductClick = () => {
    navigate(`/product/${productId}`);
  };
  return (
    <div className="col-md-3 col-sm-6 mb-4">
      <div className="product-card">
        <img
          src={getImageSrc(img)}
          alt={title}
          className="img-fluid"
          onClick={handleProductClick}
          style={{
            cursor: 'pointer',
            width: '200px',
            height: '200px',
            objectFit: 'cover',
            borderRadius: '10px',
            display: 'block',
            margin: '0 auto'
          }}
        />
        <h5 className="product-title mt-2" onClick={handleProductClick} style={{ cursor: 'pointer' }}>{title}</h5>
        {/* Fecha de expiración si existe */}
        {product && product.expirationDate && (
          <p className="mb-1"><small className="text-muted">Expira: {product.expirationDate}</small></p>
        )}
        {/* Precios con oferta */}
        <div className="price-section">
          {originalPrice ? (
            <div>
              <span className="current-price text-success fw-bold fs-5">{price}</span>
              <span className="original-price text-muted text-decoration-line-through ms-2">{originalPrice}</span>
              {discount && (
                <span className="discount-badge badge bg-danger ms-2">{discount} OFF</span>
              )}
            </div>
          ) : (
            <p className="product-price">{price}</p>
          )}
        </div>
        {onAddToCart && (
          <button className="btn btn-primary mt-2" onClick={onAddToCart}>
            Agregar al carrito
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
