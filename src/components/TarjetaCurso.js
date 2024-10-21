import React from 'react';

function TarjetaCurso({ titulo, descripcion }) {
  return (
    <div className="card">
      <h2 className="card-title">{titulo}</h2>
      <p className="card-body">{descripcion}</p>
      <button className="btn-primary">Ver más</button>
    </div>
  );
}

export default TarjetaCurso;
