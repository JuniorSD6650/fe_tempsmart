import React from 'react';
import '../../css/HorariosLista.css';
import { Link } from 'react-router-dom';

function HorariosLista({ horariosData }) {
  const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  return (
    <div>
      <div className="grid-container">
        {diasSemana.map((dia) => (
          <div key={dia} className="dia-column">
            <h3>{dia}</h3>
            <ul className="lista-clases">
              {horariosData
                .filter((clase) => clase.dia === dia)
                .sort((a, b) => a.horaInicio.localeCompare(b.horaInicio))
                .map((clase) => (
                  <li key={clase.id} className="clase-item">
                    <div
                      className="color-indicador"
                      style={{ backgroundColor: clase.color }}
                    ></div>
                    <div className="clase-detalle">
                      <strong>
                        {clase.horaInicio} - {clase.horaFin}: {clase.curso}
                      </strong>
                      <br />
                      <small>{clase.docente}</small>
                      <br />
                      <small>
                        <Link to={`/horarios/${clase.aula}/croquis`}>
                          {clase.aula}
                        </Link>
                      </small>
                    </div>
                  </li>
                ))}
              {horariosData.filter((clase) => clase.dia === dia).length === 0 && (
                <p>No hay clases este día.</p>
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HorariosLista;
