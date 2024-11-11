// PlanosHorario.js
import React from 'react';
import { useParams } from 'react-router-dom';
import PlanosComponent from './planosComponent';

const PlanosHorario = () => {
  const { paSa } = useParams(); // Captura el parámetro de la URL

  return (
    <div>
      <h1>Planos Horario</h1>
      <PlanosComponent valor={paSa} /> {/* Pasa el parámetro como valor a PlanosComponent */}
    </div>
  );
};

export default PlanosHorario;
