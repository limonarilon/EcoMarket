import React from "react";
import { useNavigate } from 'react-router-dom';
import { getImageSrc } from './Images';

const ProductCard = ({ productId, img, title, price, product, onAddToCart }) => {

  const finalTitle = title || product?.title || product?.nombre || product?.name || "Sin nombre";
  // Si el precio ya tiene '$', no lo agregues de nuevo
  const finalPrice = price ?? product?.precio ?? product?.price ?? "—";

  const navigate = useNavigate();
  const handleProductClick = () => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="col-md-3 col-sm-6 mb-4">
      <div className="product-card">

        <img
          src={getImageSrc(img)}
          alt={finalTitle}
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

        <h5
          className="product-title mt-2"
          onClick={handleProductClick}
          style={{ cursor: 'pointer' }}
        >
          {finalTitle}
        </h5>

        {/* Fecha de expiración */}
        {product?.expirationDate && (
          <p className="mb-1">
            <small className="text-muted">
              Expira: {product.expirationDate}
            </small>
          </p>
        )}

        {/* Precio */}
        <div className="price-section">
          <p className="product-price text-success fw-bold fs-5">
            {String(finalPrice).includes('$') ? finalPrice : `$${finalPrice}`}
          </p>
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
