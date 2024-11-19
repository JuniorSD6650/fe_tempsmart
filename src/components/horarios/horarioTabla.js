import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/HorariosTabla.css';

function HorariosTabla({ horariosData }) {
  const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  // Agrupar los horarios por día y ordenar por hora de inicio
  const horariosPorDia = diasSemana.map((dia) => ({
    dia,
    clases: horariosData
      .filter((clase) => clase.dia === dia)
      .sort((a, b) => parseInt(a.horaInicio.replace(':', ''), 10) - parseInt(b.horaInicio.replace(':', ''), 10)),
  }));

  return (
    <div className="tabla-contenedor">
      <table>
        <thead>
          <tr>
            {diasSemana.map((dia) => (
              <th key={dia}>{dia}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {horariosPorDia.map((dia) => (
              <td key={dia.dia} className="dia-column">
                {dia.clases.length > 0 ? (
                  dia.clases.map((clase, index) => (
                    <div
                      key={index}
                      className="clase-item"
                      style={{
                        backgroundColor: clase.color,
                        color: '#000',
                        margin: '5px',
                        padding: '10px',
                        borderRadius: '5px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '5px' // Añade un espacio uniforme entre los elementos
                      }}
                    >
                      <strong>{clase.curso}</strong>
                      <div>{clase.horaInicio} - {clase.horaFin}</div>
                      <div>
                        <Link to={`/horarios/${clase.aula}/croquis`} style={{ color: '#000', textDecoration: 'underline' }}>
                          {clase.aula}
                        </Link>
                      </div>
                      <div>{clase.docente}</div>
                    </div>
                  ))
                ) : (
                  <div style={{ color: '#888', textAlign: 'center' }}>No hay clases</div>
                )}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default HorariosTabla;
