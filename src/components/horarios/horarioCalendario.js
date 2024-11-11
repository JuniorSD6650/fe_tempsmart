// HorariosCalendario.jsx
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../../css/HorariosCalendario.css';

function HorariosCalendario({ horariosData }) {
  moment.locale('es');
  const localizer = momentLocalizer(moment);

  const diasSemanaMap = {
    'Lunes': 1,
    'Martes': 2,
    'Miércoles': 3,
    'Jueves': 4,
    'Viernes': 5,
    'Sábado': 6,
    'Domingo': 7,
  };

  const startOfWeek = moment().startOf('isoWeek');

  const eventos = horariosData.map((clase) => {
    const diaNumero = diasSemanaMap[clase.dia];
    const fechaClase = startOfWeek.clone().add(diaNumero - 1, 'days');

    const [horaInicioHoras, horaInicioMinutos] = clase.horaInicio.split(':').map(Number);
    const [horaFinHoras, horaFinMinutos] = clase.horaFin.split(':').map(Number);

    const inicio = fechaClase.clone().set({
      hour: horaInicioHoras,
      minute: horaInicioMinutos,
      second: 0,
      millisecond: 0,
    }).toDate();

    const fin = fechaClase.clone().set({
      hour: horaFinHoras,
      minute: horaFinMinutos,
      second: 0,
      millisecond: 0,
    }).toDate();

    return {
      id: clase.id,
      title: `${clase.curso} (${clase.aula})`,
      start: inicio,
      end: fin,
      resource: clase,
    };
  });

  const messages = {
    allDay: 'Todo el día',
    previous: 'Anterior',
    next: 'Siguiente',
    today: 'Hoy',
    month: 'Mes',
    week: 'Semana',
    day: 'Día',
    agenda: 'Agenda',
    date: 'Fecha',
    time: 'Hora',
    event: 'Evento',
    noEventsInRange: 'No hay eventos en este rango.',
    showMore: (total) => `+ Ver más (${total})`,
  };

  return (
    <div className="calendario-contenedor">
      <Calendar
        localizer={localizer}
        events={eventos}
        startAccessor="start"
        endAccessor="end"
        defaultView="week"
        views={['week']}
        style={{ height: '80vh' }}
        messages={messages}
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: event.resource.color,
            color: '#000',
            borderRadius: '8px',
            padding: '4px',
            border: 'none',
            textAlign: 'center',
          },
        })}
        tooltipAccessor={(event) => `${event.resource.docente} - ${event.resource.aula}`}
        min={moment().set({ hour: 6, minute: 0 }).toDate()}
        max={moment().set({ hour: 22, minute: 0 }).toDate()}
        step={60}
        timeslots={1}
        culture="es"
        dayLayoutAlgorithm="no-overlap"
      />
    </div>
  );
}

export default HorariosCalendario;
