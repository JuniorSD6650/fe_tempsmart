import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import MyNavbar from './components/Navbar';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import BannerBackground from './components/BannerBackground'; // Importar el fondo

function HomePage() {
  return (
    <BannerBackground> {/* Usar el componente de fondo */}
      <Container fluid className="main-content"> {/* Asegúrate de que sea fluid para evitar márgenes */}
        <Row className="mb-5">
          <Col md={12} className="text-center">
            <h1>TempSmart - Generador y Gestor de Horarios</h1>
            <p className="lead">
              Plataforma inteligente para la gestión de horarios y tareas académicas
            </p>
            <Button variant="primary" className="mx-2">Ver Cursos</Button>
            <Button variant="secondary" className="mx-2">Gestionar Horarios</Button>
          </Col>
        </Row>

        {/* Sección de características destacadas */}
        <Row className="mb-5">
          <Col md={12}>
            <h2>Características Destacadas</h2>
          </Col>
          <Col md={4}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Carga y Procesamiento de PDFs</Card.Title>
                <Card.Text>
                  Utiliza técnicas de OCR para extraer datos de los PDFs y genera horarios automáticamente.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Gestión por Voz</Card.Title>
                <Card.Text>
                  Interactúa con la plataforma mediante comandos de voz para gestionar tus actividades.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Notificaciones Inteligentes</Card.Title>
                <Card.Text>
                  Recibe notificaciones y recordatorios personalizados sobre tus actividades y tareas.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Información del Proyecto */}
        <Row>
          <Col md={12}>
            <h2>Acerca del Proyecto</h2>
            <p>
              Este proyecto ha sido desarrollado como parte del curso de Tesis II en la Universidad de Huánuco,
              bajo la supervisión del docente Aldo Enrique Ramirez Chaupis y el estudiante Edwin Junior Saavedra Dominguez.
            </p>
          </Col>
        </Row>
      </Container>
    </BannerBackground>
  );
}

export default HomePage;
