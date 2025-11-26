import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getImageSrc } from "./Images";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {

    fetch("http://localhost:8080/productos")
      .then((response) => response.json())
      .then((data) => {
        const allProducts = [
          ...data.dulce,
          ...data.salado,
          ...data.integral,
          ...data.bebestibles,
        ];

        const foundProduct = allProducts.find((p) => p.id === parseInt(id));

        if (foundProduct && !foundProduct.expirationDate) {
          foundProduct.expirationDate = new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000
          )
            .toISOString()
            .slice(0, 10);
        }

        setProduct(foundProduct);
      })
      .catch((error) => {
        console.error("Error fetching product data: ", error);
        setProduct(null);
      });
  }, [id]);

  if (!product) {
    return (
      <div className="container my-5">
        <h2>Producto no encontrado</h2>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="row g-4">
        <div className="col-md-5">
          <img
            src={getImageSrc(product.img || product.image || product.img)}
            alt={product.nombre || product.title}
            className="img-fluid rounded"
            style={{ height: "300px", width: "100%", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-7">
          <h2>{product.nombre || product.title}</h2>
          <p className="text-primary fs-4 fw-bold">
            {product.precio !== undefined
              ? `$${product.precio.toLocaleString("es-CL")}`
              : product.price}
          </p>
          <p className="mb-1">
            <strong>Fecha de expiración:</strong> {product.expirationDate}
          </p>
          <button className="btn btn-success mb-3">Agregar al carrito</button>
          <p>
            Este producto orgánico es ideal para una alimentación saludable.
            Libre de químicos y cultivado de manera sustentable.
          </p>
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