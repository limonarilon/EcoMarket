import React from "react";

const ReturnsRefunds = () => (
  <div className="container my-5">
    <h2>Devoluciones y Reembolsos</h2>
    
    <div className="row">
      <div className="col-lg-10 mx-auto">
        <div className="alert alert-success">
          <strong>Su satisfacción es nuestra prioridad.</strong> Ofrecemos una política de devoluciones flexible para garantizar su confianza en EcoMarket.
        </div>
        
        <h4 className="mt-4 text-success">1. Derecho de Retracto</h4>
        <p>Tiene derecho a devolver productos sin necesidad de justificar su decisión dentro de <strong>7 días hábiles</strong> desde la recepción del pedido, conforme a la Ley del Consumidor.</p>
        
        <h4 className="mt-4 text-success">2. Condiciones para Devoluciones</h4>
        <ul>
          <li><strong>Productos no perecibles:</strong> Deben estar sin abrir y en su empaque original</li>
          <li><strong>Productos perecibles:</strong> Solo por defectos de calidad o problemas de conservación</li>
          <li><strong>Estado del producto:</strong> Sin señales de uso, etiquetas intactas</li>
          <li><strong>Comprobante:</strong> Debe incluir boleta o factura de compra</li>
        </ul>
        
        <h4 className="mt-4 text-success">3. Productos No Retornables</h4>
        <ul>
          <li>Productos con fecha de vencimiento próxima (menos de 7 días)</li>
          <li>Productos personalizados o hechos a medida</li>
          <li>Productos abiertos de higiene personal</li>
        </ul>
        
        <h4 className="mt-4 text-success">4. Proceso de Devolución</h4>
        <ol>
          <li><strong>Contacto:</strong> Envíe un email a devoluciones@ecomarket.cl</li>
          <li><strong>Autorización:</strong> Recibirá un código de devolución RMA</li>
          <li><strong>Envío:</strong> Empaque el producto con el RMA incluido</li>
          <li><strong>Recepción:</strong> Procesamos la devolución en 3-5 días hábiles</li>
        </ol>
        
        <h4 className="mt-4 text-success">5. Reembolsos</h4>
        <p><strong>Tiempo de procesamiento:</strong> 5-10 días hábiles después de recibir el producto</p>
        <p><strong>Método:</strong> Mismo método de pago utilizado en la compra original</p>
        <p><strong>Gastos de envío:</strong> Los gastos de devolución corren por cuenta del cliente, excepto en caso de productos defectuosos</p>
        
        <div className="alert alert-info mt-4">
          <strong>¿Necesita ayuda?</strong> Contáctanos en devoluciones@ecomarket.cl o WhatsApp +56 9 1234 5678
        </div>
      </div>
    </div>
  </div>
);

export default ReturnsRefunds;
