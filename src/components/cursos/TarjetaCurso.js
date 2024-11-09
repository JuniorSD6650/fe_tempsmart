import React from 'react';
import { Card, Button } from 'react-bootstrap';

const TarjetaCurso = ({ titulo, descripcion, onEliminar, onVerTareas }) => (
  <Card className="mb-3 shadow-sm h-100 d-flex flex-column">
    <Card.Body className="d-flex flex-column">
      <Card.Title>{titulo}</Card.Title>
      <Card.Text className="flex-grow-1">{descripcion}</Card.Text>
      <Button variant="primary" onClick={onVerTareas} className="mb-2">
        Ver Tareas
      </Button>
      <Button variant="danger" onClick={onEliminar} className="mt-auto bg-danger">
        Eliminar
      </Button>
    </Card.Body>
  </Card>
);

export default TarjetaCurso;
