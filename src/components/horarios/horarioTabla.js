// HorariosTabla.jsx
import React from 'react';
import '../../css/HorariosTabla.css';

function HorariosTabla({ horariosData }) {
  const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
  const horas = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00',
  ];

  const renderizado = {};

  const obtenerClase = (dia, hora) => {
    return horariosData.find((clase) => {
      if (clase.dia !== dia) return false;
      const horaInicioClase = parseInt(clase.horaInicio.replace(':', ''), 10);
      const horaFinClase = parseInt(clase.horaFin.replace(':', ''), 10);
      const horaActual = parseInt(hora.replace(':', ''), 10);
      return horaActual >= horaInicioClase && horaActual < horaFinClase;
    });
  };

  return (
    <div>
      <div className="tabla-contenedor">
        <table>
          <thead>
            <tr>
              <th>Hora</th>
              {diasSemana.map((dia) => (
                <th key={dia}>{dia}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {horas.map((hora) => (
              <tr key={hora}>
                <td>{hora}</td>
                {diasSemana.map((dia) => {
                  const clave = `${dia}-${hora}`;
                  if (renderizado[clave]) {
                    return null;
                  }

                  const clase = obtenerClase(dia, hora);
                  if (clase) {
                    const horaInicioClase = parseInt(clase.horaInicio.replace(':', ''), 10);
                    const horaFinClase = parseInt(clase.horaFin.replace(':', ''), 10);
                    const duracion = (horaFinClase - horaInicioClase) / 100;

                    for (let i = 0; i < duracion; i++) {
                      const horaRenderizada =
                        ('0' + (parseInt(hora.substring(0, 2), 10) + i)).slice(-2) + ':00';
                      const claveRenderizada = `${dia}-${horaRenderizada}`;
                      renderizado[claveRenderizada] = true;
                    }

                    return (
                      <td
                        key={`${hora}-${dia}`}
                        rowSpan={duracion}
                        style={{ backgroundColor: clase.color, color: '#fff' }}
                      >
                        <div>
                          <strong>{clase.curso}</strong>
                          <br />
                          <small>{clase.docente}</small>
                          <br />
                          <small>{clase.aula}</small>
                        </div>
                      </td>
                    );
                  } else {
                    renderizado[clave] = true;
                    return <td key={`${hora}-${dia}`}></td>;
                  }
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HorariosTabla;
