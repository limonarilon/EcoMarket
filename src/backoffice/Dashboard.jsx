import React from "react";
import { Card, Row, Col, Table, Badge } from "react-bootstrap";
import { ShoppingCart, DollarSign, Users, Package } from "lucide-react";
import "../styles/dashboard.css";

const Dashboard = () => {
  // Datos simulados
  const stats = {
    totalProducts: 128,
    totalUsers: 42,
    monthlyRevenue: 450000,
    monthlyOrders: 85,
  };

  const recentOrders = [
    { id: "#ORD-001", customer: "María García", total: 85000, status: "Pendiente", date: "2025-10-11" },
    { id: "#ORD-002", customer: "Juan Pérez", total: 125000, status: "Completado", date: "2025-10-11" },
    { id: "#ORD-003", customer: "Ana López", total: 67000, status: "Procesando", date: "2025-10-10" },
    { id: "#ORD-004", customer: "Carlos Silva", total: 95000, status: "Completado", date: "2025-10-10" },
    { id: "#ORD-005", customer: "Laura Ruiz", total: 156000, status: "Pendiente", date: "2025-10-09" },
  ];

  const topProducts = [
    { name: "Proteína de Soya Orgánica", sales: 45 },
    { name: "Alimento vegetal NotMilk", sales: 38 },
    { name: "Proteína deportiva de arvejas", sales: 32 },
  ];

  return (
    <div>
      <h2 className="mb-4">Panel Principal</h2>

      {/* Métricas Principales */}
      <Row className="mb-4">
        <Col lg={3} md={6}>
          <Card className="shadow-sm mb-3 border-0">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <Card.Title className="text-muted fs-6 mb-1">Total de Productos</Card.Title>
                  <Card.Text className="fs-3 fw-bold mb-0">{stats.totalProducts}</Card.Text>
                </div>
                <div className="bg-primary bg-opacity-10 p-3 rounded">
                  <Package className="text-primary" size={24} />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={3} md={6}>
          <Card className="shadow-sm mb-3 border-0">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <Card.Title className="text-muted fs-6 mb-1">Usuarios Registrados</Card.Title>
                  <Card.Text className="fs-3 fw-bold mb-0">{stats.totalUsers}</Card.Text>
                </div>
                <div className="bg-success bg-opacity-10 p-3 rounded">
                  <Users className="text-success" size={24} />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={3} md={6}>
          <Card className="shadow-sm mb-3 border-0">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <Card.Title className="text-muted fs-6 mb-1">Ingresos del Mes</Card.Title>
                  <Card.Text className="fs-3 fw-bold mb-0">${stats.monthlyRevenue.toLocaleString()}</Card.Text>
                </div>
                <div className="bg-info bg-opacity-10 p-3 rounded">
                  <DollarSign className="text-info" size={24} />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={3} md={6}>
          <Card className="shadow-sm mb-3 border-0">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <Card.Title className="text-muted fs-6 mb-1">Pedidos del Mes</Card.Title>
                  <Card.Text className="fs-3 fw-bold mb-0">{stats.monthlyOrders}</Card.Text>
                </div>
                <div className="bg-warning bg-opacity-10 p-3 rounded">
                  <ShoppingCart className="text-warning" size={24} />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Pedidos Recientes */}
      <Row>
        <Col lg={8}>
          <Card className="shadow-sm mb-4 border-0">
            <Card.Header className="bg-white">
              <Card.Title className="mb-0">Pedidos Recientes</Card.Title>
            </Card.Header>
            <Card.Body className="p-0">
              <Table responsive className="mb-0">
                <thead className="table-light">
                  <tr>
                    <th>ID Pedido</th>
                    <th>Cliente</th>
                    <th>Total</th>
                    <th>Estado</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order, index) => (
                    <tr key={index}>
                      <td className="fw-bold">{order.id}</td>
                      <td>{order.customer}</td>
                      <td>${order.total.toLocaleString()}</td>
                      <td>
                        <Badge bg={order.status === "Completado" ? "success" : order.status === "Pendiente" ? "warning" : "info"}>
                          {order.status}
                        </Badge>
                      </td>
                      <td>{new Date(order.date).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        {/* Productos Más Vendidos */}
        <Col lg={4}>
          <Card className="shadow-sm mb-4 border-0">
            <Card.Header className="bg-white">
              <Card.Title className="mb-0">Productos Más Vendidos</Card.Title>
            </Card.Header>
            <Card.Body>
              <ul className="list-unstyled mb-0">
                {topProducts.map((product, index) => (
                  <li key={index} className="mb-3">
                    <div className="d-flex justify-content-between">
                      <span>{product.name}</span>
                      <Badge bg="primary">{product.sales} ventas</Badge>
                    </div>
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
