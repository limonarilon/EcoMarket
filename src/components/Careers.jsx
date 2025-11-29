import React from "react";
import { getImageSrc } from "./Images";

const Careers = () => (
  <div className="container my-5">
    <h2>Trabajar en EcoMarket</h2>
    
    <div className="row">
      <div className="col-lg-10 mx-auto">
        <div className="text-center mb-5">
            <img 
              src={getImageSrc("equipo-trabajo.png")} 
              alt="Equipo EcoMarket" 
              className="img-fluid rounded shadow" 
              style={{ maxWidth: "500px", height: "300px", objectFit: "cover" }} 
            />
        </div>
        
        <div className="alert alert-success">
          <h4 className="alert-heading">🌱 ¡Únete a Nuestra Misión Verde!</h4>
          <p>En EcoMarket creemos que cada persona puede hacer la diferencia. Buscamos talentos apasionados por la sustentabilidad y comprometidos con ofrecer productos orgánicos de calidad.</p>
        </div>
        
        <h4 className="mt-4 text-success">¿Por qué trabajar con nosotros?</h4>
        <div className="row mt-3">
          <div className="col-md-6">
            <ul className="list-unstyled">
              <li className="mb-2">🌿 <strong>Propósito con impacto:</strong> Contribuyes a un mundo más sostenible</li>
              <li className="mb-2">👥 <strong>Ambiente colaborativo:</strong> Equipo joven y dinámico</li>
              <li className="mb-2">📈 <strong>Crecimiento profesional:</strong> Oportunidades de desarrollo</li>
            </ul>
          </div>
          <div className="col-md-6">
            <ul className="list-unstyled">
              <li className="mb-2">⚖️ <strong>Balance vida-trabajo:</strong> Horarios flexibles</li>
              <li className="mb-2">🎯 <strong>Innovación:</strong> Implementamos nuevas ideas</li>
              <li className="mb-2">💚 <strong>Beneficios verdes:</strong> Descuentos en productos orgánicos</li>
            </ul>
          </div>
        </div>
        
        <h4 className="mt-4 text-success">Áreas de Trabajo</h4>
        <div className="row mt-3">
          <div className="col-md-4 mb-3">
            <div className="card h-100">
              <div className="card-body text-center">
                <h6 className="card-title text-primary">🛒 Ventas y Atención al Cliente</h6>
                <p className="card-text">Ayuda a nuestros clientes a encontrar los mejores productos orgánicos</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card h-100">
              <div className="card-body text-center">
                <h6 className="card-title text-success">📦 Logística y Distribución</h6>
                <p className="card-text">Garantiza que los productos lleguen frescos y a tiempo</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card h-100">
              <div className="card-body text-center">
                <h6 className="card-title text-primary">💻 Marketing Digital</h6>
                <p className="card-text">Difunde nuestro mensaje de vida saludable y sostenible</p>
              </div>
            </div>
          </div>
        </div>
        
        <h4 className="mt-4 text-success">¿Cómo Postular?</h4>
        <div className="card">
          <div className="card-body">
            <p><strong>Envía tu CV y carta de motivación explicando por qué quieres ser parte del equipo EcoMarket:</strong></p>
            
            <div className="row mt-3">
              <div className="col-md-6">
                <h6 className="text-primary">📧 Correo Electrónico</h6>
                <p className="mb-1"><strong>empleos@ecomarket.cl</strong></p>
                <small className="text-muted">Respuesta en 5-7 días hábiles</small>
              </div>
              <div className="col-md-6">
                <h6 className="text-success">📱 WhatsApp</h6>
                <p className="mb-1"><strong>+56 9 1234 5678</strong></p>
                <small className="text-muted">Lun - Vie: 9:00 - 18:00 hrs</small>
              </div>
            </div>
            
            <div className="mt-3">
              <h6 className="text-warning">📍 Oficina Central</h6>
              <p className="mb-1"><strong>Av. Providencia 1234, Providencia, Santiago</strong></p>
              <small className="text-muted">Metro Manuel Montt - Línea 1</small>
            </div>
          </div>
        </div>
        
        <div className="alert alert-info mt-4">
          <h6 className="alert-heading">💡 Tip para Postulantes</h6>
          <p className="mb-0">Menciona en tu carta por qué te apasiona la alimentación orgánica y cómo contribuirías a nuestra misión de promover un estilo de vida más saludable y sostenible.</p>
        </div>
        
        <div className="text-center mt-4">
          <h5 className="text-success">¡Esperamos conocerte pronto!</h5>
          <p className="text-muted">Juntos podemos hacer la diferencia para un futuro más verde 🌱</p>
        </div>
      </div>
    </div>
  </div>
);

export default Careers;
