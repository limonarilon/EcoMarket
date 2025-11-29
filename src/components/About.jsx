import React from "react";
import { getImageSrc } from "./Images";

const About = () => (
  <div className="container my-5">
    <h2>Sobre EcoMarket</h2>
    <p>
      En EcoMarket nos dedicamos a ofrecer productos orgánicos de la más alta calidad, seleccionados cuidadosamente para promover un estilo de vida saludable y sostenible. Nuestra misión es facilitar el acceso a alimentos y productos naturales, garantizando frescura, autenticidad y responsabilidad ambiental en cada compra. Creemos en el poder de la alimentación consciente y trabajamos para que cada cliente disfrute de una experiencia confiable y satisfactoria al adquirir nuestros productos en línea.
    </p>
    <div className="text-center mt-4">
        <img src={getImageSrc("equipo-ecomarket.jpg")} alt="EcoMarket equipo" className="img-fluid rounded shadow" style={{ maxWidth: "400px" }} />
    </div>
  </div>
);

export default About;
