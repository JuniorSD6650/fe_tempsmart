import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TarjetaCurso from './TarjetaCurso';
import { apiRequest, confirmarAccion } from '../general/comun';
import Swal from 'sweetalert2';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Autocomplete, TextField } from '@mui/material';

function Cursos() {
  const [cursos, setCursos] = useState([]);
  const [todosLosCursos, setTodosLosCursos] = useState([]);
  const [error, setError] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const navigate = useNavigate(); // Para la navegación

  const obtenerCursosUsuario = async () => {
    try {
      const data = await apiRequest({
        endpoint: '/cursos-usuario/',
        method: 'GET'
      });
      setCursos(data);
      setError(null);
    } catch (error) {
      setError('Error al cargar los cursos del usuario');
    }
  };

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

  const asignarCurso = async (cursoId) => {
    try {
      await apiRequest({
        endpoint: '/cursos-usuario/',
        method: 'POST',
        body: { curso_id: cursoId }
      });
      obtenerCursosUsuario();
      setMostrarModal(false);
      Swal.fire('Asignado!', 'El curso ha sido asignado exitosamente.', 'success');
    } catch (error) {
      setMostrarModal(false);
      Swal.fire('Error', 'Error al asignar el curso', 'error');
    }
  };

  const desasignarCurso = async (cursoUsuarioId) => {
    const confirmacion = await confirmarAccion(
      "¿Estás seguro de eliminar este curso?",
      "Esta acción no se puede deshacer y eliminará todas las tareas relacionadas con este curso."
    );
    if (!confirmacion) return;

    try {
      await apiRequest({
        endpoint: `/cursos-usuario/${cursoUsuarioId}/`,
        method: 'DELETE'
      });
      setCursos(prevCursos => prevCursos.filter(curso => curso.id !== cursoUsuarioId));
      Swal.fire('Eliminado!', 'El curso ha sido eliminado exitosamente.', 'success');
    } catch (error) {
      Swal.fire('Error', 'Error al eliminar el curso asignado', 'error');
    }
  };

  useEffect(() => {
    obtenerCursosUsuario();
  }, []);

  return (
    <div>
      <h1>Mis Cursos</h1>
      <Button variant="contained" color="primary" onClick={() => {
        obtenerTodosLosCursos();
        setMostrarModal(true);
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
            onEliminar={() => desasignarCurso(cursoUsuario.id)}
            onVerTareas={() => navigate(`/cursos/${cursoUsuario.curso.id}/tareas`)} // Navega a las tareas del curso
          />
        ))}
      </div>

      <Dialog open={mostrarModal} onClose={() => setMostrarModal(false)}>
        <DialogTitle>Asignar un Nuevo Curso</DialogTitle>
        <DialogContent>
          <Autocomplete
            options={todosLosCursos}
            getOptionLabel={(curso) => curso.nombre}
            renderInput={(params) => <TextField {...params} label="Selecciona un curso" variant="outlined" />}
            onChange={(event, selectedCurso) => {
              if (selectedCurso) asignarCurso(selectedCurso.id);
            }}
          />
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
