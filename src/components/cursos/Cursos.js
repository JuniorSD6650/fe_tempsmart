import React, { useState, useEffect } from 'react';
import TarjetaCurso from './TarjetaCurso';
import { apiRequest } from '../general/comun';
import Swal from 'sweetalert2';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

function Cursos() {
  const [cursos, setCursos] = useState([]);            // Cursos asignados al usuario
  const [todosLosCursos, setTodosLosCursos] = useState([]); // Lista de todos los cursos generales
  const [error, setError] = useState(null);            // Estado para manejar errores
  const [mostrarModal, setMostrarModal] = useState(false);  // Estado para mostrar el modal

  // Obtener los cursos del usuario
  const obtenerCursosUsuario = async () => {
    try {
      const data = await apiRequest({
        endpoint: '/cursousuario/',
        method: 'GET'
      });
      setCursos(data);
      setError(null);
    } catch (error) {
      setError('Error al cargar los cursos del usuario');
    }
  };

  // Obtener todos los cursos generales para mostrar en el modal
  const obtenerTodosLosCursos = async () => {
    try {
      const data = await apiRequest({
        endpoint: '/cursos/',
        method: 'GET'
      });
      setTodosLosCursos(data);
      setError(null);
    } catch (error) {
      setError('Error al cargar la lista de todos los cursos');
    }
  };

  // Asignar un curso al usuario
  const asignarCurso = async (cursoId) => {
    try {
      await apiRequest({
        endpoint: '/cursousuario/',
        method: 'POST',
        body: { curso_id: cursoId }
      });
      obtenerCursosUsuario(); // Actualiza los cursos asignados
      setMostrarModal(false);
      Swal.fire('Asignado!', 'El curso ha sido asignado exitosamente.', 'success');
    } catch (error) {
      Swal.fire('Error', 'Error al asignar el curso', 'error');
    }
  };

  // Desasignar un curso del usuario
  const desasignarCurso = async (cursoUsuarioId) => {
    try {
      await apiRequest({
        endpoint: `/cursousuario/${cursoUsuarioId}/`,
        method: 'DELETE'
      });
      obtenerCursosUsuario(); // Actualiza los cursos asignados
      Swal.fire('Eliminado!', 'El curso ha sido eliminado exitosamente.', 'success');
    } catch (error) {
      Swal.fire('Error', 'Error al eliminar el curso asignado', 'error');
    }
  };

  useEffect(() => {
    obtenerCursosUsuario(); // Cargar los cursos del usuario al montar el componente
  }, []);

  return (
    <div>
      <h1>Mis Cursos</h1>
      <Button variant="contained" color="primary" onClick={() => {
        obtenerTodosLosCursos();
        setMostrarModal(true); // Abre el modal para asignar cursos
      }}>
        Asignar Nuevo Curso
      </Button>

      {error && <Typography color="error">{error}</Typography>}

      <div className="cursos-container">
        {cursos.map((cursoUsuario) => (
          <TarjetaCurso
            key={cursoUsuario.id}
            titulo={cursoUsuario.curso.nombre}
            descripcion={cursoUsuario.curso.descripcion || 'No hay descripción disponible'}
            onEliminar={() => desasignarCurso(cursoUsuario.id)} // Botón para eliminar curso
          />
        ))}
      </div>

      {/* Modal para mostrar todos los cursos generales */}
      <Dialog open={mostrarModal} onClose={() => setMostrarModal(false)}>
        <DialogTitle>Asignar un Nuevo Curso</DialogTitle>
        <DialogContent>
          {todosLosCursos.map((curso) => (
            <div key={curso.id} className="curso-item">
              <Typography variant="body1">{curso.nombre}</Typography>
              <Button variant="contained" color="secondary" onClick={() => asignarCurso(curso.id)}>
                Asignarme
              </Button>
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMostrarModal(false)} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Cursos;
