import React from "react";
import Carousel from "react-bootstrap/Carousel";
import { getImageSrc } from './Images';

const Carrusel = ({ products = [] }) => {
  // Productos seguros para el primer slide
  const p0 = products && products.length > 0 ? products[0] : null;

  return (
    <Carousel className="my-5">
      <Carousel.Item>
        <div className="d-flex align-items-center" style={{ height: "300px", background: "#fff" }}>
          <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <img
              src={getImageSrc(p0 ? p0.img : null)}
              alt={p0 ? p0.title : 'Producto destacado'}
              style={{ height: "320px", width: "320px", objectFit: "cover", borderRadius: "16px", boxShadow: "0 2px 16px rgba(0,0,0,0.10)" }}
            />
          </div>
          <div style={{ flex: 2, paddingLeft: "30px" }}>
            <h3 className="text-success mb-2">{p0 ? p0.title : 'Producto destacado'}</h3>
            <p className="fs-5">¡Descubre este producto destacado en Novedades!</p>
            <p className="fw-bold">{p0 ? p0.price : ''} (200g)</p>
            {p0 && (
              <a href={`/product/${p0.id}`} className="btn btn-primary mt-3">
                Ver detalle
              </a>
            )}
          </div>
        </div>
      </Carousel.Item>

      <Carousel.Item>
        <div
          className="d-flex align-items-center justify-content-center"
          style={{
            height: "340px",
            borderRadius: "10px",
            padding: "0 40px",
            backgroundImage: `url(${getImageSrc('blog-banner')})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }}
        >
          <div
            className="mx-auto d-flex flex-row align-items-center"
            style={{
              background: "rgba(255,255,255,0.85)",
              borderRadius: "14px",
              padding: "32px 48px",
              maxWidth: "900px",
              minHeight: "220px",
              boxShadow: "0 2px 16px rgba(0,0,0,0.10)"
            }}
          >
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              <img
                src={getImageSrc('foto-banner-carrusel-blog')}
                alt="Blog EcoMarket"
                style={{ width: "200px", height: "200px", objectFit: "cover", borderRadius: "16px", boxShadow: "0 2px 12px rgba(0,0,0,0.12)" }}
              />
            </div>
            <div style={{ flex: 2, paddingLeft: "36px" }}>
              <h3 className="text-success mb-3">Blog EcoMarket</h3>
              <ul className="list-unstyled mb-3">
                <li>✅ Recetas saludables</li>
                <li>✅ Consejos de nutrición</li>
                <li>✅ Estilo de vida sostenible</li>
              </ul>
              <a href="/blog" className="btn btn-success px-4 py-2 fw-bold mt-2">Nuestro Blog</a>
            </div>
          </div>
        </div>
      </Carousel.Item>

      <Carousel.Item>
        <div
          className="d-flex align-items-center justify-content-center position-relative"
          style={{
            height: "340px",
            borderRadius: "10px",
            padding: "0 40px",
            backgroundImage: `url(${getImageSrc('programa-afiliados')})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }}
        >
          <div
            className="position-relative"
            style={{
              background: "rgba(255,255,255,0.85)",
              borderRadius: "14px",
              padding: "32px 36px",
              maxWidth: "480px",
              boxShadow: "0 2px 16px rgba(0,0,0,0.10)"
            }}
          >
            <h3 className="text-success mb-3">Programa de Afiliados</h3>
            <p className="fs-5 mb-2">Gana puntos y descuentos con cada compra y recomendación.</p>
            <ul className="list-unstyled mb-3">
              <li>✅ 10 puntos por cada $1.000 gastado</li>
              <li>✅ Descuentos exclusivos y productos gratis</li>
              <li>✅ Refiera amigos y gane más</li>
            </ul>
            <a href="/programa-afiliados" className="btn btn-success px-4 py-2 fw-bold mt-2">
              Más información
            </a>
          </div>
        </div>
      </Carousel.Item>
    </Carousel>
  );
};

export default Carrusel;