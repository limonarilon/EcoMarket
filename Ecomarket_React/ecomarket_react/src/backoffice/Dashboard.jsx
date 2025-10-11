import React from "react";
import { Card, Row, Col, Table, Badge, ProgressBar } from "react-bootstrap";
import { 
  ShoppingCart, 
  DollarSign, 
  Users, 
  Package, 
  TrendingUp, 
  TrendingDown,
  Eye,
  AlertTriangle
} from "lucide-react";
import "../styles/dashboard.css";

const Dashboard = () => {
  // Datos simulados 
  const stats = {
    totalProducts: 128,
    totalUsers: 42,
    totalSales: 1250000,
    monthlyOrders: 85,
    pendingOrders: 12,
    lowStockProducts: 8,
    monthlyRevenue: 450000,
    conversionRate: 3.2
  };

  const recentOrders = [
    { id: "#ORD-001", customer: "María García", total: 85000, status: "pending", date: "2025-10-11" },
    { id: "#ORD-002", customer: "Juan Pérez", total: 125000, status: "completed", date: "2025-10-11" },
    { id: "#ORD-003", customer: "Ana López", total: 67000, status: "processing", date: "2025-10-10" },
    { id: "#ORD-004", customer: "Carlos Silva", total: 95000, status: "completed", date: "2025-10-10" },
    { id: "#ORD-005", customer: "Laura Ruiz", total: 156000, status: "pending", date: "2025-10-09" }
  ];

  const topProducts = [
    { name: "Proteína de Soya Orgánica", sales: 45, revenue: 675000 },
    { name: "Alimento vegetal NotMilk", sales: 38, revenue: 380000 },
    { name: "Proteína deportiva de arvejas", sales: 32, revenue: 480000 },
    { name: "Maqui antioxidante en polvo", sales: 28, revenue: 420000 }
  ];

  const getStatusBadge = (status) => {
    const variants = {
      pending: 'warning',
      completed: 'success',
      processing: 'info',
      cancelled: 'danger'
    };
    const labels = {
      pending: 'Pendiente',
      completed: 'Completado',
      processing: 'Procesando',
      cancelled: 'Cancelado'
    };
    return <Badge bg={variants[status]}>{labels[status]}</Badge>;
  };

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

      {/* Alertas y Estado */}
      <Row className="mb-4">
        <Col lg={4} md={6}>
          <Card className="shadow-sm mb-3 border-0">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <Card.Title className="text-muted fs-6 mb-1">Pedidos Pendientes</Card.Title>
                  <Card.Text className="fs-4 fw-bold text-primary mb-0">{stats.pendingOrders}</Card.Text>
                </div>
                <AlertTriangle className="text-warning" size={20} />
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={4} md={6}>
          <Card className="shadow-sm mb-3 border-0">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <Card.Title className="text-muted fs-6 mb-1">Stock Bajo</Card.Title>
                  <Card.Text className="fs-4 fw-bold text-primary mb-0">{stats.lowStockProducts}</Card.Text>
                </div>
                <Package className="text-danger" size={20} />
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={4} md={6}>
          <Card className="shadow-sm mb-3 border-0">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <Card.Title className="text-muted fs-6 mb-1">Tasa Conversión</Card.Title>
                  <Card.Text className="fs-4 fw-bold text-success mb-0">{stats.conversionRate}%</Card.Text>
                </div>
                <TrendingUp className="text-success" size={20} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        {/* Pedidos Recientes */}
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
                      <td>{getStatusBadge(order.status)}</td>
                      <td>{new Date(order.date).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        {/* Productos Top */}
        <Col lg={4}>
          <Card className="shadow-sm mb-4 border-0">
            <Card.Header className="bg-white">
              <Card.Title className="mb-0">Productos Más Vendidos</Card.Title>
            </Card.Header>
            <Card.Body>
              {topProducts.map((product, index) => (
                <div key={index} className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="fw-medium">{product.name}</span>
                    <Badge bg="primary">{product.sales}</Badge>
                  </div>
                  <div className="text-muted small mb-2">${product.revenue.toLocaleString()}</div>
                  <ProgressBar 
                    now={(product.sales / 50) * 100} 
                    style={{ height: '6px' }} 
                    className="mb-2"
                  />
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
