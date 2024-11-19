import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import BannerBackground from './components/general/BannerBackground';

function HomePage() {
  return (
    <BannerBackground>
      <Container fluid className="main-content">
        <Row className="mb-5">
          <Col md={12} className="text-center">
            <h1>TempSmart - Generador y Gestor de Horarios</h1>
            <p className="lead">
              Plataforma inteligente para la gestión de horarios y tareas académicas
            </p>
            <Link to="/cursos">
              <Button variant="primary" className="mx-2">Ver Cursos</Button>
            </Link>
            <Link to="/horarios">
              <Button variant="secondary" className="mx-2">Gestionar Horarios</Button>
            </Link>
            <Link to="/croquis">
              <Button variant="secondary" className="mx-2">Encontrar mi clase</Button>
            </Link>
          </Col>
        </Row>

        {/* Sección de características destacadas */}
        <Row className="mb-5">
          <Col md={12}>
            <h2 >Características Destacadas</h2>
          </Col>
          <Col md={4}>
            <Card className="mb-3 h-100">
              <Card.Body>
                <Card.Title>Ubicación de Salones</Card.Title>
                <Card.Text>
                  Encuentra la ubicación exacta de tus salones en el mapa de pabellones y salones del campus, incluyendo información sobre el piso y salón.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-3 h-100">
              <Card.Body>
                <Card.Title>Gestión por Voz</Card.Title>
                <Card.Text>
                  Interactúa con la plataforma mediante comandos de voz para gestionar tus actividades.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-3 h-100">
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
            <h2 className="text_white">Acerca del Proyecto</h2>
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
