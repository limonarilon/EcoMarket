import React from "react";

const FAQ = () => {
  console.log("FAQ component is rendering"); // Para debug
  
  return (
    <div className="container my-5">
      <h2>Preguntas Frecuentes</h2>
      <p>Prueba de renderizado...</p>
      
      {/* Accordion simplificado para prueba */}
      <div className="accordion" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button 
              className="accordion-button" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#collapseOne" 
              aria-expanded="true" 
              aria-controls="collapseOne"
            >
              ¿Cómo puedo realizar un pedido?
            </button>
          </h2>
          <div 
            id="collapseOne" 
            className="accordion-collapse collapse show" 
            aria-labelledby="headingOne" 
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              Puedes realizar tu pedido navegando por nuestros productos y agregándolos al carrito.
            </div>
          </div>
        </div>
        
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button 
              className="accordion-button collapsed" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#collapseTwo" 
              aria-expanded="false" 
              aria-controls="collapseTwo"
            >
              ¿Qué métodos de pago aceptan?
            </button>
          </h2>
          <div 
            id="collapseTwo" 
            className="accordion-collapse collapse" 
            aria-labelledby="headingTwo" 
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              Aceptamos pagos con tarjetas de crédito, débito y transferencias bancarias.
            </div>
          </div>
        </div>
        
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingThree">
            <button 
              className="accordion-button collapsed" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#collapseThree" 
              aria-expanded="false" 
              aria-controls="collapseThree"
            >
              ¿Realizan despachos en días hábiles?
            </button>
          </h2>
          <div 
            id="collapseThree" 
            className="accordion-collapse collapse" 
            aria-labelledby="headingThree" 
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              Sí, los despachos se realizan únicamente en días hábiles. Los pedidos realizados durante fines de semana o feriados serán procesados el siguiente día hábil.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
