import React, { useState, useEffect, useCallback } from 'react';
import HorariosTabla from './horarioTabla';
import HorariosLista from './horarioLista';
import HorariosCalendario from './horarioCalendario';
import '../../css/Horarios.css';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { apiRequest } from '../general/comun';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function Horarios() {
  const [vistaSeleccionada, setVistaSeleccionada] = useState('tabla');
  const [horariosData, setHorariosData] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const userId = 7; // Reemplaza con el ID del usuario autenticado
  const [nuevoHorario, setNuevoHorario] = useState({
    curso_id: '',
    dia_de_la_semana: '',
    hora_inicio: '',
    hora_fin: '',
    aula: '',
    usuario: userId,
    tipo: 1,
  });
  const [pabellon, setPabellon] = useState('');
  const [salon, setSalon] = useState('');

  const obtenerHorarios = useCallback(async () => {
    try {
      const data = await apiRequest({ endpoint: '/horarios/' });
      setHorariosData(data);
    } catch (error) {
      console.error('Error al obtener los horarios:', error);
    }
  }, []);

  const obtenerCursos = useCallback(async () => {
    try {
      const data = await apiRequest({ endpoint: '/cursos-usuario/' });
      setCursos(data);
    } catch (error) {
      console.error('Error al cargar los cursos:', error);
    }
  }, []);

  useEffect(() => {
    obtenerHorarios();
    obtenerCursos();
  }, [obtenerHorarios, obtenerCursos]);

  const abrirModal = () => {
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
    setNuevoHorario({
      curso_id: '',
      dia_de_la_semana: '',
      hora_inicio: '',
      hora_fin: '',
      aula: '',
      usuario: userId,
      tipo: 1,
    });
    setPabellon('');
    setSalon('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoHorario((prevState) => ({
      ...prevState,
      [name]: value || '',
    }));
  };

  const handlePabellonChange = (event) => {
    const selectedPabellon = event.target.value;
    setPabellon(selectedPabellon);
    setNuevoHorario((prevState) => ({
      ...prevState,
      aula: `P${selectedPabellon}-${salon}`,
    }));
  };

  const handleSalonChange = (event) => {
    const selectedSalon = event.target.value;
    setSalon(selectedSalon);
    setNuevoHorario((prevState) => ({
      ...prevState,
      aula: `P${pabellon}-${selectedSalon}`,
    }));
  };

  const guardarHorario = async () => {
    try {
      await apiRequest({
        endpoint: '/horarios/',
        method: 'POST',
        body: nuevoHorario,
      });
      obtenerHorarios();
      cerrarModal();
    } catch (error) {
      cerrarModal();
      console.error('Error al guardar el horario:', error);
    }
  };

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
      <div className="d-flex">
        <h1 className='me-3'>Horarios</h1>
        <Button variant="contained" color="primary" onClick={abrirModal} className="btn btn-primary rounded-circle">
          <AddCircleOutlineIcon />
        </Button>
      </div>
      <p id='tx_vista'>VISTAS</p>
      <div className="button-container">
        <Button variant="contained" onClick={() => setVistaSeleccionada('tabla')}>Tabla</Button>
        <Button variant="contained" onClick={() => setVistaSeleccionada('lista')}>Lista</Button>
        <Button variant="contained" onClick={() => setVistaSeleccionada('calendario')}>Calendario</Button>
      </div>

      <div className="horarios-container">
        {renderizarVista()}
      </div>

      <Dialog open={modalVisible} onClose={cerrarModal} fullWidth maxWidth="sm">
        <DialogTitle>Agregar Nuevo Horario</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Curso</InputLabel>
                <Select
                  name="curso_id"
                  value={nuevoHorario.curso_id || ''}
                  onChange={handleInputChange}
                  label="Curso"
                >
                  {cursos.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.curso.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Día de la Semana</InputLabel>
                <Select
                  name="dia_de_la_semana"
                  value={nuevoHorario.dia_de_la_semana || ''}
                  onChange={handleInputChange}
                  label="Día de la Semana"
                >
                  <MenuItem value={1}>Lunes</MenuItem>
                  <MenuItem value={2}>Martes</MenuItem>
                  <MenuItem value={3}>Miércoles</MenuItem>
                  <MenuItem value={4}>Jueves</MenuItem>
                  <MenuItem value={5}>Viernes</MenuItem>
                  <MenuItem value={6}>Sábado</MenuItem>
                  <MenuItem value={7}>Domingo</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField label="Hora de Inicio" type="time" fullWidth name="hora_inicio" value={nuevoHorario.hora_inicio} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Hora de Fin" type="time" fullWidth name="hora_fin" value={nuevoHorario.hora_fin} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Pabellón</InputLabel>
                <Select
                  value={pabellon || ''}
                  onChange={handlePabellonChange}
                  label="Pabellón"
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <MenuItem key={num} value={num}>
                      {`P${num}`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Salón</InputLabel>
                <Select
                  value={salon || ''}
                  onChange={handleSalonChange}
                  label="Salón"
                >
                  {[101, 102, 103, 104, 105, 106, 107,
                    201, 202, 203, 204, 205, 206, 207,
                    301, 302, 303, 304, 305, 306, 307,
                    401, 402, 403, 404, 405, 406, 407,
                    501, 502, 503, 504, 505, 506, 507,
                    601, 602, 603, 604, 605, 606, 607].map((room) => (
                      <MenuItem key={room} value={room}>
                        {room}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField label="Aula" fullWidth name="aula" value={nuevoHorario.aula} onChange={handleInputChange} disabled />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={cerrarModal} color="secondary">Cancelar</Button>
          <Button onClick={guardarHorario} color="primary" variant="contained">Guardar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Horarios;
