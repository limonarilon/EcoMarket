import React from "react";
import { getImageSrc } from "./Images";

const Contact = () => (
  <div className="container my-5">
    <h2>Contacto</h2>
    <p>
      ¿Tienes dudas, sugerencias o necesitas ayuda con tu compra? Nuestro equipo está disponible para atenderte y brindarte la mejor experiencia en EcoMarket. Puedes contactarnos a través de los siguientes medios:
    </p>
    <ul className="list-unstyled mt-4">
      <li className="mb-3 d-flex align-items-center">
          <img src={getImageSrc("whatsapp.png")} alt="WhatsApp" style={{ width: "28px", marginRight: "10px" }} />
        <span className="fw-bold">WhatsApp:</span> <span className="ms-2">+569 1234 5678</span>
      </li>
      <li className="mb-3 d-flex align-items-center">
          <img src={getImageSrc("instagram.png")} alt="Instagram" style={{ width: "28px", marginRight: "10px" }} />
        <span className="fw-bold">Instagram:</span> <span className="ms-2">@ecomarket_cl</span>
      </li>
      <li className="mb-3 d-flex align-items-center">
          <img src={getImageSrc("gmail.png")} alt="Correo" style={{ width: "28px", marginRight: "10px" }} />
        <span className="fw-bold">Correo electrónico:</span> <span className="ms-2">contacto@ecomarket.cl</span>
      </li>
    </ul>
    <p>
      ¡Esperamos tu mensaje y te responderemos lo antes posible!
    </p>
  </div>
);

export default Contact;
