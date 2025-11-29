import React from "react";
import { getImageSrc } from "./Images";

const Location = () => (
  <div className="container my-5">
    <h2>Ubicación</h2>
    <p>Somos una tienda online con la posibilidad de retiro en nuestras oficinas. A continuación, te mostramos nuestra dirección:</p>
    <p><strong>Dirección:</strong> Av. Siempre Viva 123, Santiago, Chile</p>
     <img src={getImageSrc("mapa-ubicacion.png")} alt="Mapa de ubicación" className="img-fluid rounded shadow" />
  </div>
);

export default Location;
