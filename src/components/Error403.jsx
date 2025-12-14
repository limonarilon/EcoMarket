import React from "react";

const Error403 = () => (
  <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
    <h1 style={{ color: "#d9534f" }}>403 - Acceso Denegado</h1>
    <p>No tienes permisos para acceder a esta página o realizar esta acción.</p>
    <a href="/" className="btn btn-primary mt-3">Volver al inicio</a>
  </div>
);

export default Error403;
