import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid, Autocomplete } from '@mui/material';
import { apiRequest } from '../general/comun';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Icons from '@mui/icons-material';

const Tareas = () => {
    const [tareas, setTareas] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [nuevaTarea, setNuevaTarea] = useState({ titulo: '', descripcion: '', fecha_vencimiento: '', curso: null, icono: null });
    const [cursos, setCursos] = useState([]);
    const [iconos, setIconos] = useState([]);

    useEffect(() => {
        obtenerTareas();
        obtenerCursos();
        obtenerIconos();
    }, []);

    const obtenerTareas = async () => {
        try {
            const data = await apiRequest({ endpoint: '/tareas/', method: 'GET' });
            setTareas(data);
        } catch (error) {
            console.error('Error al cargar tareas:', error);
        }
    };

    const obtenerCursos = async () => {
        try {
            const data = await apiRequest({ endpoint: '/cursos-usuario/', method: 'GET' });
            setCursos(data);
        } catch (error) {
            console.error('Error al cargar cursos:', error);
        }
    };

    const obtenerIconos = async () => {
        try {
            const data = await apiRequest({ endpoint: '/iconos/', method: 'GET' });
            setIconos(data);
        } catch (error) {
            console.error('Error al cargar iconos:', error);
        }
    };

    const asignarTarea = async () => {
        try {
            await apiRequest({
                endpoint: '/tareas/',
                method: 'POST',
                body: nuevaTarea,
            });
            setMostrarModal(false);
            obtenerTareas();
            Swal.fire('Asignada', 'La tarea ha sido asignada correctamente.', 'success');
        } catch (error) {
            Swal.fire('Error', 'Hubo un error al asignar la tarea.', 'error');
        }
    };

    const eliminarTarea = async (tareaId) => {
        try {
            await apiRequest({
                endpoint: `/tareas/${tareaId}/`,
                method: 'DELETE'
            });
            setTareas(prevTareas => prevTareas.filter(tarea => tarea.id !== tareaId));
            Swal.fire('Eliminada', 'La tarea ha sido eliminada correctamente.', 'success');
        } catch (error) {
            Swal.fire('Error', 'Hubo un error al eliminar la tarea.', 'error');
        }
    };

    return (
        <div className="container">
            <h1>Mis Tareas</h1>
            <Button variant="contained" color="primary" onClick={() => setMostrarModal(true)} className="mb-4">
                Asignar Nueva Tarea
            </Button>

            <div className="tareas-container row">
                {tareas.map((tarea) => (
                    <div key={tarea.id} className="col-md-4 mb-4">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">{tarea.titulo}</h5>
                                <p className="card-text">{tarea.descripcion}</p>
                                <p className="text-muted">Fecha de vencimiento: {tarea.fecha_vencimiento}</p>
                                {tarea.icono && Icons[tarea.icono] && React.createElement(Icons[tarea.icono], { fontSize: 'large' })}
                                <Button variant="outlined" className="me-2" onClick={() => setMostrarModal(true)}>
                                    Editar
                                </Button>
                                <Button variant="contained" color="secondary" onClick={() => eliminarTarea(tarea.id)}>
                                    Eliminar
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Dialog open={mostrarModal} onClose={() => setMostrarModal(false)} fullWidth maxWidth="sm">
                <DialogTitle className="text-center">Asignar Nueva Tarea</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} className="mt-2">
                        <Grid item xs={12}>
                            <TextField
                                label="Título"
                                fullWidth
                                value={nuevaTarea.titulo}
                                onChange={(e) => setNuevaTarea({ ...nuevaTarea, titulo: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Descripción"
                                fullWidth
                                multiline
                                rows={3}
                                value={nuevaTarea.descripcion}
                                onChange={(e) => setNuevaTarea({ ...nuevaTarea, descripcion: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Fecha de Vencimiento"
                                type="date"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                value={nuevaTarea.fecha_vencimiento}
                                onChange={(e) => setNuevaTarea({ ...nuevaTarea, fecha_vencimiento: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Autocomplete
                                options={cursos}
                                getOptionLabel={(curso) => curso.curso.nombre}
                                renderInput={(params) => <TextField {...params} label="Selecciona un curso" variant="outlined" />}
                                onChange={(event, selectedCurso) => setNuevaTarea({ ...nuevaTarea, curso: selectedCurso?.id })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Autocomplete
                                options={iconos}
                                getOptionLabel={(icono) => icono.nombre}
                                renderOption={(props, option) => (
                                    <li {...props} style={{ display: 'flex', alignItems: 'center' }}>
                                        {Icons[option.imagen] && React.createElement(Icons[option.imagen], { fontSize: 'small', style: { marginRight: 8 } })}
                                        {option.nombre}
                                    </li>
                                )}
                                renderInput={(params) => <TextField {...params} label="Selecciona un icono" variant="outlined" />}
                                onChange={(event, selectedIcono) => {
                                    setNuevaTarea({ ...nuevaTarea, icono: selectedIcono?.id }); // Envía el ID del icono en lugar del nombre
                                }}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setMostrarModal(false)} color="secondary">
                        Cancelar
                    </Button>
                    <Button onClick={() => asignarTarea()} color="primary" variant="contained">
                        Asignar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Tareas;
