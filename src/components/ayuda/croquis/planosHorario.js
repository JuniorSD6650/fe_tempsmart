// PlanosHorario.js
import React from 'react';
import { useParams } from 'react-router-dom';
import PlanosComponent from './planosComponent';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PlanosHorario = () => {
  const { paSa } = useParams();

  return (
    <div>
      <h1>Planos Horario</h1>
      <Link to="/horarios">
        <Button variant="secondary" className="mx-2">Volver</Button>
      </Link>
      <PlanosComponent valor={paSa} />
    </div>
  );
};

export default PlanosHorario;
