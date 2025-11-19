import React from "react";

const CookiesPolicy = () => (
  <div className="container my-5">
    <h2>Política de Cookies</h2>
    
    <div className="row">
      <div className="col-lg-10 mx-auto">
        <p className="lead">Esta política explica cómo EcoMarket utiliza cookies y tecnologías similares en nuestro sitio web.</p>
        
        <h4 className="mt-4 text-success">1. ¿Qué son las Cookies?</h4>
        <p>Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita nuestro sitio web. Nos ayudan a proporcionar una mejor experiencia de navegación y analizar cómo se utiliza nuestro sitio.</p>
        
        <h4 className="mt-4 text-success">2. Tipos de Cookies que Utilizamos</h4>
        
        <div className="card mb-3">
          <div className="card-body">
            <h6 className="card-title text-success">Cookies Esenciales</h6>
            <p className="card-text">Necesarias para el funcionamiento básico del sitio, como mantener su sesión de compra activa.</p>
          </div>
        </div>
        
        <div className="card mb-3">
          <div className="card-body">
            <h6 className="card-title text-success">Cookies de Rendimiento</h6>
            <p className="card-text">Recopilan información sobre cómo interactúa con nuestro sitio para mejorarlo.</p>
          </div>
        </div>
        
        <div className="card mb-3">
          <div className="card-body">
            <h6 className="card-title text-success">Cookies de Funcionalidad</h6>
            <p className="card-text">Recuerdan sus preferencias para personalizar su experiencia.</p>
          </div>
        </div>
        
        <div className="card mb-3">
          <div className="card-body">
            <h6 className="card-title text-success">Cookies de Marketing</h6>
            <p className="card-text">Se utilizan para mostrar publicidad relevante basada en sus intereses.</p>
          </div>
        </div>
        
        <h4 className="mt-4 text-success">3. Control de Cookies</h4>
        <p>Puede controlar y gestionar las cookies de varias maneras:</p>
        <ul>
          <li><strong>Configuración del navegador:</strong> La mayoría de navegadores le permiten rechazar cookies</li>
          <li><strong>Herramientas de terceros:</strong> Puede optar por no recibir cookies de marketing</li>
          <li><strong>Configuración del sitio:</strong> Algunas preferencias se pueden ajustar en su cuenta</li>
        </ul>
        
        <h4 className="mt-4 text-success">4. Cookies de Terceros</h4>
        <p>Utilizamos servicios de terceros como Google Analytics para analizar el tráfico del sitio. Estos servicios pueden establecer sus propias cookies.</p>
        
        <div className="alert alert-warning mt-4">
          <strong>Nota importante:</strong> Deshabilitar ciertas cookies puede afectar la funcionalidad del sitio web.
        </div>
        
        <div className="alert alert-info mt-4">
          <strong>Más información:</strong> Para preguntas sobre cookies, contáctenos en cookies@ecomarket.cl
        </div>
      </div>
    </div>
  </div>
);

export default CookiesPolicy;
