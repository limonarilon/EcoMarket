import React from "react";

const PrivacyPolicy = () => (
  <div className="container my-5">
    <h2>Política de Privacidad</h2>
    
    <div className="row">
      <div className="col-lg-10 mx-auto">
        <p className="lead">Última actualización: Octubre 2025</p>
        
        <h4 className="mt-4 text-success">1. Información que Recopilamos</h4>
        <p><strong>Datos personales:</strong> Nombre, dirección de correo electrónico, teléfono, dirección de entrega y facturación.</p>
        <p><strong>Datos de navegación:</strong> Información sobre su uso del sitio web, incluyendo páginas visitadas y productos visualizados.</p>
        
        <h4 className="mt-4 text-success">2. Cómo Utilizamos su Información</h4>
        <ul>
          <li>Procesar y gestionar sus pedidos</li>
          <li>Comunicarnos con usted sobre su compra</li>
          <li>Mejorar nuestros productos y servicios</li>
          <li>Enviar ofertas y promociones (con su consentimiento)</li>
          <li>Cumplir con obligaciones legales</li>
        </ul>
        
        <h4 className="mt-4 text-success">3. Compartir Información</h4>
        <p>No vendemos, intercambiamos o transferimos sus datos personales a terceros, excepto:</p>
        <ul>
          <li>Proveedores de servicios necesarios para el funcionamiento del negocio</li>
          <li>Cumplimiento de obligaciones legales</li>
          <li>Proteger nuestros derechos y seguridad</li>
        </ul>
        
        <h4 className="mt-4 text-success">4. Seguridad de los Datos</h4>
        <p>Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger sus datos personales contra acceso no autorizado, alteración, divulgación o destrucción.</p>
        
        <h4 className="mt-4 text-success">5. Sus Derechos</h4>
        <p>Usted tiene derecho a:</p>
        <ul>
          <li>Acceder a sus datos personales</li>
          <li>Rectificar información inexacta</li>
          <li>Solicitar la eliminación de sus datos</li>
          <li>Oponerse al procesamiento de sus datos</li>
          <li>Portabilidad de datos</li>
        </ul>
        
        <div className="alert alert-warning mt-4">
          <strong>Ejercer sus derechos:</strong> Para ejercer cualquier derecho, contáctanos en privacidad@ecomarket.cl
        </div>
      </div>
    </div>
  </div>
);

export default PrivacyPolicy;
