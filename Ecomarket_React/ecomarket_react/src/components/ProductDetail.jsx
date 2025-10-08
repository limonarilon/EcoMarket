import React from "react";
import { useParams } from 'react-router-dom';
const ProductDetail = ({ products }) => {
const { id } = useParams();//esto es para obtener el id del producto desde la URL

const product = products.find(p => p.id === parseInt(id));//buscar el producto en el array de productos
  if (!product) {
    return <div className="container my-5"><h2>Producto no encontrado</h2></div>;
  }


  return (
    <div className="container my-5">
      <div className="row g-4">
        <div className="col-md-5">
          <img src={product.img} 
          alt={product.title} 
          className="img-fluid rounded" />
        </div>
        <div className="col-md-7">
          <h2>{product.title}</h2>
          <p className="text-primary fs-4 fw-bold">{product.price}</p>
          <button className="btn btn-success mb-3">Agregar al carrito</button>
          <p>
            Este producto orgánico es ideal para una alimentación saludable.
            Libre de químicos y cultivado de manera sustentable.
          </p>
          <hr />
          <h5>Opiniones</h5>
          <div className="mb-2">
            <strong>Juan Pérez</strong> <span className="text-warning">★★★★★</span>
            <p>Excelente calidad y sabor. Lo recomiendo totalmente.</p>
          </div>
          <div>
            <strong>María López</strong> <span className="text-warning">★★★★☆</span>
            <p>Muy buen producto, llegó rápido y en buen estado.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
