// planos.js
import React from 'react';
import PlanosComponent from './planosComponent';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Planos = () => {
  return (
    <div>
      <h1>Planos</h1>
      <Link to="/">
        <Button variant="secondary" className="mx-2">Volver</Button>
      </Link>
      <PlanosComponent />
    </div>
  );
};

export default Planos;
