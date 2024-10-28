import React from 'react';
import { Card, Button } from 'react-bootstrap';

const TarjetaCurso = ({ titulo, descripcion, onEliminar }) => (
  <Card className="mb-3 shadow-sm h-100 d-flex flex-column">
    <Card.Body className="d-flex flex-column">
      <Card.Title>{titulo}</Card.Title>
      <Card.Text className="flex-grow-1">{descripcion}</Card.Text>
      <Button variant="danger" onClick={onEliminar} className="mt-auto">
        Eliminar
      </Button>
    </Card.Body>
  </Card>
);

export default TarjetaCurso;
