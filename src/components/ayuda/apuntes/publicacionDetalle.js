import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Typography, Divider, Box, List, ListItem, ListItemText, TextField, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { apiRequest, getUsuarioActual, confirmarAccion } from '../../general/comun';
import Swal from 'sweetalert2';

const PublicacionDetalle = () => {
    const { id } = useParams();
    const [publicacion, setPublicacion] = useState(null);
    const [comentarios, setComentarios] = useState([]);
    const [nuevoComentario, setNuevoComentario] = useState('');
    const [usuarioId, setUsuarioId] = useState(null);

    useEffect(() => {
        // Cargar la publicación
        apiRequest({ endpoint: `/publicaciones/${id}/` })
            .then((data) => {
                setPublicacion(data);
            })
            .catch((error) => console.error('Error al cargar la publicación:', error));

        // Cargar los comentarios relacionados
        apiRequest({ endpoint: `/comentarios/?publicacion=${id}` })
            .then((data) => {
                setComentarios(data);
            })
            .catch((error) => console.error('Error al cargar los comentarios:', error));

        // Obtener el usuario actual
        getUsuarioActual()
            .then((user) => {
                if (user) setUsuarioId(user.id);
            })
            .catch((error) => console.error('Error al obtener el usuario:', error));
    }, [id]);

    const handleComentarioSubmit = () => {
        if (!nuevoComentario.trim()) {
            console.error("El comentario no puede estar vacío");
            return;
        }

        const comentario = {
            publicacion: id,
            contenido: nuevoComentario,
        };

        apiRequest({ endpoint: '/comentarios/', method: 'POST', body: comentario })
            .then((nuevo) => {
                setComentarios((prev) => [...prev, nuevo]);
                setNuevoComentario('');
            })
            .catch((error) => console.error('Error al enviar comentario:', error));
    };

    const handleComentarioDelete = async (comentarioId) => {
        const confirmar = await confirmarAccion(
            "¿Estás seguro?",
            "No podrás recuperar este comentario después de eliminarlo."
        );

        if (!confirmar) return;

        try {
            await apiRequest({ endpoint: `/comentarios/${comentarioId}/`, method: 'DELETE' });
            setComentarios((prev) => prev.filter((comentario) => comentario.id !== comentarioId));
            Swal.fire({
                title: "Eliminado",
                text: "El comentario se eliminó correctamente.",
                icon: "success",
            });
        } catch (error) {
            console.error('Error al eliminar comentario:', error);
            Swal.fire({
                title: "Error",
                text: "No se pudo eliminar el comentario. Inténtalo nuevamente.",
                icon: "error",
            });
        }
    };

    const renderContenido = (contenido) => {
        if (!contenido) return null;

        // Divide el contenido en secciones por saltos de línea o puntos
        const lines = contenido.split('\n');
        return lines.map((line, index) => {
            if (line.startsWith('**')) {
                // Títulos en negrita
                return (
                    <Typography key={index} variant="h6" sx={{ fontWeight: 'bold', marginTop: 2 }}>
                        {line.replace(/\*\*/g, '')}
                    </Typography>
                );
            } else if (line.startsWith('-') || line.startsWith('1.') || line.startsWith('2.')) {
                // Listas con guiones o numeradas
                return (
                    <Typography key={index} variant="body1" sx={{ marginLeft: 2, marginBottom: 1 }}>
                        {line}
                    </Typography>
                );
            }
            // Texto plano
            return (
                <Typography key={index} variant="body2" sx={{ marginBottom: 1 }}>
                    {line}
                </Typography>
            );
        });
    };

    if (!publicacion) {
        return <Typography>Cargando...</Typography>;
    }

    return (
        <div className="container">
            <Card
                sx={{
                    padding: 3,
                    marginTop: 3,
                    boxShadow: 4,
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                }}
            >
                <Box sx={{ padding: 2 }}>
                    <Typography
                        variant="h4"
                        gutterBottom
                        sx={{ color: '#2C3E50', fontWeight: 'bold', marginBottom: '10px' }}
                    >
                        {publicacion.titulo}
                    </Typography>
                    <Divider sx={{ margin: '15px 0' }} />
                    <Box>{renderContenido(publicacion.contenido)}</Box>
                    <Divider sx={{ margin: '15px 0' }} />

                    {/* Comentarios */}
                    <Typography variant="h6" sx={{ marginBottom: '10px' }}>
                        Comentarios:
                    </Typography>
                    <List dense>
                        {comentarios.map((comentario) => (
                            <ListItem key={comentario.id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <ListItemText
                                    primary={comentario.contenido}
                                    secondary={`Usuario: ${comentario.usuario_nombre || 'Anónimo'}`}
                                />
                                {comentario.usuario_id === usuarioId && (
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={() => handleComentarioDelete(comentario.id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                )}
                            </ListItem>
                        ))}
                    </List>
                    <TextField
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        size="small"
                        placeholder="Añadir un comentario"
                        value={nuevoComentario}
                        onChange={(e) => setNuevoComentario(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        size="small"
                        onClick={handleComentarioSubmit}
                        sx={{ marginTop: '10px', backgroundColor: '#2ECC71' }}
                    >
                        Comentar
                    </Button>
                </Box>
            </Card>
        </div>
    );
};

export default PublicacionDetalle;
