import React, { useState } from 'react';
import TarjetaCurso from './TarjetaCurso'; // Importa el componente de tarjeta

function Cursos() {
  const [cursos, setCursos] = useState([]);
  const [error, setError] = useState(null);  // Estado para manejar errores

  // Función Obtener
  function Obtener() {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    fetch("http://127.0.0.1:8000/api/cursos/", requestOptions)  // Asegúrate de que la URL tenga la barra diagonal final
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener los cursos');
        }
        return response.json();
      })
      .then((result) => {
        setCursos(result);  // Actualizar el estado con los cursos obtenidos
        setError(null);  // Limpiar errores si la solicitud es exitosa
      })
      .catch((error) => {
        console.error(error);
        setError('Error al cargar los cursos');
      });
  }

  // Llamada a la función Obtener al hacer clic en el botón
  return (
    <div>
      <h1>Cursos Disponibles</h1>
      <button className="btn-primary" onClick={Obtener}>Cargar Cursos</button> {/* Botón para cargar cursos */}

      {error && <div>{error}</div>} {/* Mostrar error si ocurre */}

      <div className="cursos-container">
        {cursos.map((curso) => (
          <TarjetaCurso
            key={curso.id}
            titulo={curso.nombre}  // Asignar el nombre del curso como título
            descripcion={curso.descripcion || 'No hay descripción disponible'}  // Descripción opcional
          />
        ))}
      </div>
    </div>
  );
}

export default Cursos;
