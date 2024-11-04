// Horarios.jsx
import React, { useState } from 'react';
import HorariosTabla from './horarioTabla';
import HorariosLista from './horarioLista';
import HorariosCalendario from './horarioCalendario';
import '../../css/Horarios.css';

function Horarios() {
  const [vistaSeleccionada, setVistaSeleccionada] = useState('tabla');

  // Datos de horarios con información adicional
  const horariosData = [
    {
      id: 1,
      curso: 'Matemáticas',
      color: '#FF5733', // Color hexadecimal
      docente: 'Profesor García',
      dia: 'Lunes',
      horaInicio: '08:00',
      horaFin: '10:00',
      aula: 'Aula 101',
    },
    {
      id: 2,
      curso: 'Historia',
      color: '#33B5FF',
      docente: 'Profesora López',
      dia: 'Lunes',
      horaInicio: '10:00',
      horaFin: '12:00',
      aula: 'Aula 102',
    },
    {
      id: 3,
      curso: 'Biología',
      color: '#28A745',
      docente: 'Profesor Martínez',
      dia: 'Martes',
      horaInicio: '09:00',
      horaFin: '11:00',
      aula: 'Aula 103',
    },
    {
      id: 4,
      curso: 'Física',
      color: '#FFC107',
      docente: 'Profesora Sánchez',
      dia: 'Miércoles',
      horaInicio: '13:00',
      horaFin: '15:00',
      aula: 'Aula 104',
    },
    // Puedes agregar más clases con su información correspondiente
  ];

  const renderizarVista = () => {
    switch (vistaSeleccionada) {
      case 'tabla':
        return <HorariosTabla horariosData={horariosData} />;
      case 'lista':
        return <HorariosLista horariosData={horariosData} />;
      case 'calendario':
        return <HorariosCalendario horariosData={horariosData} />;
      default:
        return <HorariosTabla horariosData={horariosData} />;
    }
  };

  return (
    <div>
      <h1>Horarios</h1>
      <div className="button-container">
        <button onClick={() => setVistaSeleccionada('tabla')}>Vista en Tabla</button>
        <button onClick={() => setVistaSeleccionada('lista')}>Vista en Lista</button>
        <button onClick={() => setVistaSeleccionada('calendario')}>Vista en Calendario</button>
      </div>
      {renderizarVista()}
    </div>
  );
}

export default Horarios;
