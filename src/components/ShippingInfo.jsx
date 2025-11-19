import React from "react";

const ShippingInfo = () => (
  <div className="container my-5">
    <h2>Información de Envíos</h2>
    
    <div className="row">
      <div className="col-lg-10 mx-auto">
        <div className="alert alert-success">
          <strong>🚚 Envíos a todo Chile</strong> - Llevamos productos orgánicos frescos hasta tu puerta
        </div>
        
        <h4 className="mt-4 text-success">1. Zonas de Cobertura</h4>
        <div className="row">
          <div className="col-md-6">
            <h6 className="text-primary">Región Metropolitana</h6>
            <ul>
              <li>Santiago y comunas aledañas</li>
              <li>Entrega en 24-48 horas</li>
              <li>Envío gratis sobre $30.000</li>
            </ul>
          </div>
          <div className="col-md-6">
            <h6 className="text-info">Regiones</h6>
            <ul>
              <li>Todas las regiones de Chile</li>
              <li>Entrega en 2-5 días hábiles</li>
              <li>Envío gratis sobre $50.000</li>
            </ul>
          </div>
        </div>
        
        <h4 className="mt-4 text-success">2. Métodos de Envío</h4>
        
        <div className="table-responsive">
          <table className="table table-striped">
            <thead className="table-success">
              <tr>
                <th>Método</th>
                <th>Tiempo</th>
                <th>Costo RM</th>
                <th>Costo Regiones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Envío Estándar</strong></td>
                <td>2-3 días hábiles</td>
                <td>$3.500</td>
                <td>$5.500</td>
              </tr>
              <tr>
                <td><strong>Envío Express</strong></td>
                <td>24 horas</td>
                <td>$6.500</td>
                <td>No disponible</td>
              </tr>
              <tr>
                <td><strong>Retiro en Tienda</strong></td>
                <td>Mismo día</td>
                <td>Gratis</td>
                <td>-</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <h4 className="mt-4 text-success">3. Productos Refrigerados</h4>
        <div className="alert alert-info">
          <strong>❄️ Cadena de frío:</strong> Los productos refrigerados se envían en empaques especiales con gel refrigerante para mantener la temperatura adecuada durante el transporte.
        </div>
        
        <h4 className="mt-4 text-success">4. Seguimiento del Pedido</h4>
        <ul>
          <li><strong>Confirmación:</strong> Recibirá un email con los detalles del envío</li>
          <li><strong>Código de seguimiento:</strong> Podrá rastrear su pedido en tiempo real</li>
          <li><strong>Notificación de entrega:</strong> Le avisaremos cuando su pedido esté en camino</li>
        </ul>
        
        <h4 className="mt-4 text-success">5. Políticas Importantes</h4>
        <ul>
          <li><strong>Direcciones:</strong> Verifique que su dirección sea correcta y completa</li>
          <li><strong>Reintento de entrega:</strong> Hasta 2 intentos sin costo adicional</li>
          <li><strong>Productos perecibles:</strong> Deben ser recibidos el día programado</li>
          <li><strong>Zonas rurales:</strong> Pueden tener costos y tiempos adicionales</li>
        </ul>
        
        <div className="alert alert-warning mt-4">
          <strong>📱 Seguimiento en línea:</strong> Visite nuestra página de "Seguimiento de Compra" o contáctenos por WhatsApp +56 9 1234 5678
        </div>
      </div>
    </div>
  </div>
);

export default ShippingInfo;
