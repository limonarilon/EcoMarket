import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getImageSrc } from "./Images";
import { getProduct } from "../services/api";

const ProductDetail = ({ onAddToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        setLoading(true);
        const p = await getProduct(id);
        if (mounted) {
          setProduct(p);
          setError(null);
        }
      } catch (err) {
        console.error("Error fetching product data: ", err);
        if (mounted) {
          setProduct(null);
          setError(err);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();

    return () => { mounted = false; };
  }, [id]);

  if (loading) {
    return (
      <div className="container my-5 text-center">
        <h3>Cargando producto...</h3>
      </div>
    );
  }

  if (!product || error) {
    return (
      <div className="container my-5">
        <h2>Producto no encontrado</h2>
      </div>
    );
  }

  const displayName = product.name ?? product.nombre ?? product.title;
  const displayPrice = product.price ?? product.precio ?? 0;
  const displayImg = getImageSrc(product.img ?? product.image ?? '');

  const handleAdd = () => {
    const item = {
      id: product.id,
      name: displayName,
      price: Number(displayPrice),
      img: product.img ?? product.image ?? '',
      quantity: 1,
    };

    if (typeof onAddToCart === 'function') {
      onAddToCart(item);
    } else {
      // Si no hay handler, solo logueamos para depuración
      console.log('Agregar al carrito (no handler):', item);
    }
  };

  return (
    <div className="container my-5">
      <div className="row g-4">
        <div className="col-md-5">
          <img
            src={displayImg}
            alt={displayName}
            className="img-fluid rounded"
            style={{ height: "300px", width: "100%", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-7">
          <h2>{displayName}</h2>
          <p className="text-primary fs-4 fw-bold">{`$${displayPrice.toLocaleString('es-CL')}`}</p>
          <p className="mb-1">
            <strong>Fecha de expiración:</strong> {product.expirationDate ?? 'No disponible'}
          </p>
          <button className="btn btn-success mb-3" onClick={handleAdd}>Agregar al carrito</button>
          <p>
            Este producto orgánico es ideal para una alimentación saludable.
            Libre de químicos y cultivado de manera sustentable.
          </p>
          {/* Imagen nutricional */}
          {product.imgNutricional && (
            <>
              <hr />
              <h5>Información nutricional</h5>
              <img
                src={product.imgNutricional}
                alt="Información nutricional"
                className="img-fluid rounded"
                style={{ maxWidth: "100%", marginTop: "10px" }}
              />
            </>
          )}
          <hr />
          <h5>Opiniones</h5>
          <div className="mb-2">
            <strong>Juan Pérez</strong>{" "}
            <span className="text-warning">★★★★★</span>
            <p>Excelente calidad y sabor. Lo recomiendo totalmente.</p>
          </div>
          <div>
            <strong>María López</strong>{" "}
            <span className="text-warning">★★★★☆</span>
            <p>Muy buen producto, llegó rápido y en buen estado.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;