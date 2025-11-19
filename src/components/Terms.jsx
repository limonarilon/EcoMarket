import React from "react";

const Terms = () => (
  <div className="container my-5">
    <h2>Términos y Condiciones</h2>
    
    <div className="row">
      <div className="col-lg-10 mx-auto">
        <p className="lead">Última actualización: Octubre 2025</p>
        
        <h4 className="mt-4 text-success">1. Aceptación de los Términos</h4>
        <p>Al acceder y utilizar el sitio web de EcoMarket, usted acepta cumplir con estos términos y condiciones. Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestro servicio.</p>
        
        <h4 className="mt-4 text-success">2. Productos y Servicios</h4>
        <p>EcoMarket se especializa en la venta de productos orgánicos y naturales. Nos esforzamos por proporcionar descripciones precisas de todos nuestros productos, incluyendo ingredientes, origen y certificaciones orgánicas.</p>
        
        <h4 className="mt-4 text-success">3. Precios y Pagos</h4>
        <ul>
          <li>Todos los precios están expresados en pesos chilenos e incluyen IVA</li>
          <li>Los precios pueden cambiar sin previo aviso</li>
          <li>Aceptamos pagos con tarjetas de crédito, débito y transferencias bancarias</li>
          <li>El pago debe completarse antes del envío del pedido</li>
        </ul>
        
        <h4 className="mt-4 text-success">4. Envíos y Entregas</h4>
        <p>Los envíos se realizan dentro del territorio nacional. Los tiempos de entrega pueden variar según la ubicación geográfica. EcoMarket no se hace responsable por retrasos causados por terceros o condiciones climáticas adversas.</p>
        
        <h4 className="mt-4 text-success">5. Responsabilidades del Usuario</h4>
        <ul>
          <li>Proporcionar información veraz y actualizada</li>
          <li>Mantener la confidencialidad de su cuenta</li>
          <li>Usar el sitio web de manera responsable y legal</li>
        </ul>
        
        <h4 className="mt-4 text-success">6. Limitación de Responsabilidad</h4>
        <p>EcoMarket no será responsable por daños indirectos, incidentales o consecuenciales que resulten del uso de nuestros productos o servicios, excepto donde la ley lo prohíba.</p>
        
        <div className="alert alert-info mt-4">
          <strong>Contacto:</strong> Para consultas sobre estos términos, contáctanos en info@ecomarket.cl
        </div>
      </div>
    </div>
  </div>
);

export default Terms;
