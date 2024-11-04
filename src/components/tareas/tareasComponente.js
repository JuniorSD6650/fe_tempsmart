import React, { useState, useEffect, useCallback } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid, Autocomplete } from '@mui/material';
import { apiRequest, getTodayDate } from '../general/comun';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import iconMapping from '../general/iconMapping';

const TareasComponent = ({ fixedCursoId }) => {
    const [tareas, setTareas] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [tareaSeleccionada, setTareaSeleccionada] = useState(null);
    const [nuevaTarea, setNuevaTarea] = useState({
        titulo: '',
        descripcion: '',
        fecha_vencimiento: getTodayDate(),
        curso: fixedCursoId ? fixedCursoId : null,
        icono: null
    });
    const [cursos, setCursos] = useState([]);
    const [iconos, setIconos] = useState([]);

    const obtenerTareas = useCallback(async () => {
        try {
            const endpoint = fixedCursoId ? `/tareas/curso/${fixedCursoId}/` : '/tareas/';
            const data = await apiRequest({ endpoint, method: 'GET' });
            setTareas(data);
        } catch (error) {
            console.error('Error al cargar tareas:', error);
        }
    }, [fixedCursoId]);

    const obtenerCursos = useCallback(async () => {
        if (fixedCursoId) return;
        try {
            const data = await apiRequest({ endpoint: '/cursos-usuario/', method: 'GET' });
            setCursos(data);
        } catch (error) {
            console.error('Error al cargar cursos:', error);
        }
    }, [fixedCursoId]);

    const obtenerIconos = useCallback(async () => {
        try {
            const data = await apiRequest({ endpoint: '/iconos/', method: 'GET' });
            setIconos(data);
        } catch (error) {
            console.error('Error al cargar iconos:', error);
        }
    }, []);

    useEffect(() => {
        obtenerTareas();
        obtenerIconos();
        if (!fixedCursoId) {
            obtenerCursos();
        }
    }, [fixedCursoId, obtenerTareas, obtenerCursos, obtenerIconos]);

    const abrirModalEdicion = (tarea = null) => {
        if (tarea) {
            const iconoSeleccionado = iconos.find((icono) => icono.id === tarea.icono) || null;
            let cursoSeleccionado = null;
            if (!fixedCursoId) {
                // Ajuste aquí: comparar curso.id con tarea.curso
                cursoSeleccionado = cursos.find((curso) => curso.id === tarea.curso) || null;
            }

            setTareaSeleccionada(tarea);
            setNuevaTarea({
                titulo: tarea.titulo,
                descripcion: tarea.descripcion,
                fecha_vencimiento: tarea.fecha_vencimiento,
                curso: cursoSeleccionado,
                icono: iconoSeleccionado,
            });
        } else {
            setNuevaTarea({
                titulo: '',
                descripcion: '',
                fecha_vencimiento: getTodayDate(),
                curso: fixedCursoId ? fixedCursoId : null,
                icono: null,
            });
        }
        setMostrarModal(true);
    };

    const cerrarModal = () => {
        setMostrarModal(false);
        setTareaSeleccionada(null);
        setNuevaTarea({
            titulo: '',
            descripcion: '',
            fecha_vencimiento: getTodayDate(),
            curso: fixedCursoId ? fixedCursoId : null,
            icono: null
        });
    };

    const guardarTarea = async () => {
        const today = getTodayDate();
        if (nuevaTarea.fecha_vencimiento < today) {
            cerrarModal();
            Swal.fire('Error', 'La fecha de vencimiento no puede ser anterior a la fecha actual.', 'error');
            return;
        }

        if (!fixedCursoId && !nuevaTarea.curso) {
            Swal.fire('Error', 'Debes seleccionar un curso.', 'error');
            return;
        }

        try {
            const tareaParaGuardar = {
                ...nuevaTarea,
                curso: fixedCursoId ? fixedCursoId : (nuevaTarea.curso ? nuevaTarea.curso.id : null),
                icono: nuevaTarea.icono ? nuevaTarea.icono.id : null,
            };

            if (tareaSeleccionada) {
                await apiRequest({
                    endpoint: `/tareas/${tareaSeleccionada.id}/`,
                    method: 'PUT',
                    body: tareaParaGuardar,
                });
                Swal.fire('Actualizada', 'La tarea ha sido actualizada correctamente.', 'success');
            } else {
                await apiRequest({
                    endpoint: '/tareas/',
                    method: 'POST',
                    body: tareaParaGuardar,
                });
                Swal.fire('Asignada', 'La tarea ha sido asignada correctamente.', 'success');
            }
            cerrarModal();
            obtenerTareas();
        } catch (error) {
            cerrarModal();
            Swal.fire('Error', 'Hubo un error al guardar la tarea.', 'error');
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
            <h1>{fixedCursoId ? 'Tareas del Curso' : 'Mis Tareas'}</h1>
            <Button variant="contained" color="primary" onClick={() => abrirModalEdicion()} className="mb-4">
                Asignar Nueva Tarea
            </Button>

            <div className="tareas-container row">
                {tareas.map((tarea) => {
                    const IconComponent = iconMapping[tarea.icono_imagen];

                    return (
                        <div key={tarea.id} className="col-md-4 mb-4">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title" style={{ alignItems: 'center' }}>
                                        {IconComponent && (
                                            <IconComponent style={{ marginRight: 8 }} />
                                        )}
                                        {tarea.titulo}
                                    </h5>
                                    <p className="card-text">{tarea.descripcion}</p>
                                    {!fixedCursoId && (
                                        <p className="text-muted" style={{ fontSize: '0.9rem', color: '#6c757d' }}>
                                            Curso: {tarea.curso_nombre}
                                        </p>
                                    )}
                                    <p className="text-muted">Fecha de vencimiento: {tarea.fecha_vencimiento}</p>
                                    <Button variant="outlined" className="me-2" onClick={() => abrirModalEdicion(tarea)}>
                                        Editar
                                    </Button>
                                    <Button variant="contained" color="secondary" onClick={() => eliminarTarea(tarea.id)}>
                                        Eliminar
                                    </Button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <Dialog open={mostrarModal} onClose={cerrarModal} fullWidth maxWidth="sm">
                <DialogTitle className="text-center">{tareaSeleccionada ? 'Editar Tarea' : 'Asignar Nueva Tarea'}</DialogTitle>
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
                                inputProps={{ min: getTodayDate() }}
                            />
                        </Grid>
                        {!fixedCursoId && (
                            <Grid item xs={12}>
                                <Autocomplete
                                    options={cursos}
                                    getOptionLabel={(curso) => curso.curso.nombre}
                                    renderInput={(params) => <TextField {...params} label="Selecciona un curso" variant="outlined" />}
                                    onChange={(event, selectedCurso) => setNuevaTarea({ ...nuevaTarea, curso: selectedCurso || null })}
                                    value={nuevaTarea.curso || null}
                                />
                            </Grid>
                        )}
                        <Grid item xs={12}>
                            <Autocomplete
                                options={iconos}
                                getOptionLabel={(icono) => icono.nombre}
                                renderOption={(props, option) => (
                                    <li {...props} style={{ display: 'flex', alignItems: 'center' }}>
                                        {iconMapping[option.imagen] && React.createElement(iconMapping[option.imagen], { fontSize: 'small', style: { marginRight: 8 } })}
                                        {option.nombre}
                                    </li>
                                )}
                                renderInput={(params) => <TextField {...params} label="Selecciona un icono" variant="outlined" />}
                                onChange={(event, selectedIcono) => setNuevaTarea({ ...nuevaTarea, icono: selectedIcono || null })}
                                value={nuevaTarea.icono || null}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={cerrarModal} color="secondary">
                        Cancelar
                    </Button>
                    <Button onClick={guardarTarea} color="primary" variant="contained">
                        {tareaSeleccionada ? 'Actualizar' : 'Asignar'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default TareasComponent;