import React from "react";
import { useNavigate } from "react-router-dom";
import { getImageSrc } from "./Images";

const Affiliates = () => {
  const navigate = useNavigate();

  return (
    <div className="container my-5">
      <h2>Programa de Afiliados EcoMarket</h2>
      
      <div className="row">
        <div className="col-lg-10 mx-auto">
          <div className="mb-5">
            <img 
              src={getImageSrc("programa-afiliados.jpg")}
              alt="Programa de Afiliados EcoMarket"
              className="affiliate-banner w-100"
              style={{ width: "100%", height: "200px", objectFit: "cover", display: "block" }}
            />
          </div>
          
          <div className="alert alert-success">
            <h4 className="alert-heading">🎁 ¡Gana Puntos con Cada Compra!</h4>
            <p>Únete a nuestro programa de afiliados y acumula puntos por cada compra que realices y por cada persona que refiera a EcoMarket. ¡Convierte tu pasión por lo orgánico en beneficios!</p>
          </div>
          
          <h4 className="mt-4 text-success">¿Cómo Funciona?</h4>
          <div className="row mt-3">
            <div className="col-md-4 mb-3">
              <div className="card h-100 text-center">
                <div className="card-body">
                  <h1 className="text-primary">1️⃣</h1>
                  <h6 className="card-title">Regístrate</h6>
                  <p className="card-text">Crea tu cuenta gratuita en EcoMarket y automáticamente formas parte del programa</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card h-100 text-center">
                <div className="card-body">
                  <h1 className="text-success">2️⃣</h1>
                  <h6 className="card-title">Compra y Acumula</h6>
                  <p className="card-text">Por cada $1.000 de compra, ganas 10 puntos que puedes canjear por descuentos</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card h-100 text-center">
                <div className="card-body">
                  <h1 className="text-warning">3️⃣</h1>
                  <h6 className="card-title">Refiere y Gana Más</h6>
                  <p className="card-text">Invita amigos y gana 500 puntos extra por cada nueva compra que realicen</p>
                </div>
              </div>
            </div>
          </div>
          
          <h4 className="mt-4 text-success">Sistema de Puntos</h4>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead className="table-success">
                <tr>
                  <th>Actividad</th>
                  <th>Puntos Ganados</th>
                  <th>Equivalencia</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Compra Personal</strong></td>
                  <td>10 puntos por cada $1.000</td>
                  <td>1% de cashback</td>
                </tr>
                <tr>
                  <td><strong>Registro de Nuevo Usuario</strong></td>
                  <td>200 puntos de bienvenida</td>
                  <td>$2.000 de descuento</td>
                </tr>
                <tr>
                  <td><strong>Referir un Amigo</strong></td>
                  <td>500 puntos por primera compra</td>
                  <td>$5.000 de descuento</td>
                </tr>
                <tr>
                  <td><strong>Compra del Referido</strong></td>
                  <td>50 puntos por cada $1.000</td>
                  <td>0.5% adicional</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <h4 className="mt-4 text-success">Beneficios del Programa</h4>
          <div className="row mt-3">
            <div className="col-md-6">
              <ul className="list-unstyled">
                <li className="mb-2">🎯 <strong>Descuentos exclusivos:</strong> Canje de puntos por descuentos</li>
                <li className="mb-2">🎁 <strong>Productos gratuitos:</strong> Usa tus puntos como dinero</li>
                <li className="mb-2">📧 <strong>Ofertas especiales:</strong> Acceso prioritario a promociones</li>
              </ul>
            </div>
            <div className="col-md-6">
              <ul className="list-unstyled">
                <li className="mb-2">🏆 <strong>Niveles VIP:</strong> Más compras = más beneficios</li>
                <li className="mb-2">📊 <strong>Dashboard personal:</strong> Seguimiento de tus puntos</li>
                <li className="mb-2">💚 <strong>Impacto ambiental:</strong> Rastrea tu contribución verde</li>
              </ul>
            </div>
          </div>
          
          <h4 className="mt-4 text-success">Niveles de Afiliado</h4>
          <div className="row mt-3">
            <div className="col-md-3 mb-3">
              <div className="card border-secondary bg-light">
                <div className="card-body text-center">
                  <h6 className="card-title" style={{color: '#8B4513'}}>🥉 Bronce</h6>
                  <p className="card-text"><small>0 - 999 puntos</small></p>
                  <p><strong>Beneficio:</strong> 1% cashback</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="card border-warning bg-light">
                <div className="card-body text-center">
                  <h6 className="card-title" style={{color: '#6B7280'}}>🥈 Plata</h6>
                  <p className="card-text"><small>1000 - 4999 puntos</small></p>
                  <p><strong>Beneficio:</strong> 1.5% cashback</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="card border-warning bg-light">
                <div className="card-body text-center">
                  <h6 className="card-title" style={{color: '#FFD700'}}>🥇 Oro</h6>
                  <p className="card-text"><small>5000 - 9999 puntos</small></p>
                  <p><strong>Beneficio:</strong> 2% cashback</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="card border-success bg-light">
                <div className="card-body text-center">
                  <h6 className="card-title text-success">💎 Diamante</h6>
                  <p className="card-text"><small>+10000 puntos</small></p>
                  <p><strong>Beneficio:</strong> 3% cashback</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="alert alert-warning mt-4">
            <h6 className="alert-heading">⚠️ Importante</h6>
            <p className="mb-0">Para participar en el programa de afiliados, debes tener una cuenta registrada en EcoMarket. Los puntos se acreditan automáticamente en tu perfil después de cada compra confirmada.</p>
          </div>
          
          <div className="text-center mt-5">
            <h4 className="text-success mb-4">¿Listo para Comenzar a Ganar Puntos?</h4>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <button 
                className="btn btn-success btn-lg px-4"
                onClick={() => navigate('/registrarse')}
              >
                🎯 Registrarme Ahora
              </button>
              <button 
                className="btn btn-outline-success btn-lg px-4"
                onClick={() => navigate('/iniciar-sesion')}
              >
                🔑 Ya Tengo Cuenta
              </button>
            </div>
            <p className="text-muted mt-3">¡Es gratis y obtienes 200 puntos de bienvenida!</p>
          </div>
          
          <div className="alert alert-info mt-4">
            <h6 className="alert-heading">📞 ¿Necesitas Ayuda?</h6>
            <div className="row">
              <div className="col-md-4">
                <strong>Email:</strong> afiliados@ecomarket.cl
              </div>
              <div className="col-md-4">
                <strong>WhatsApp:</strong> +56 9 1234 5678
              </div>
              <div className="col-md-4">
                <strong>Horario:</strong> Lun - Vie 9:00 - 18:00
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Affiliates;
