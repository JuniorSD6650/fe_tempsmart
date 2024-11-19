import React, { useState, useEffect } from 'react';
import { Card, Typography, Divider, Grid, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { apiRequest } from '../../general/comun';

const Fijas = () => {
    const [publicaciones, setPublicaciones] = useState([]);

    useEffect(() => {
        apiRequest({ endpoint: '/publicaciones/' })
            .then(setPublicaciones)
            .catch((error) => console.error('Error al cargar publicaciones:', error));
    }, []);

    return (
        <div className="container">
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Publicaciones del Administrador</h1>
            <Divider className="mb-4" />

            <Grid container spacing={4} justifyContent="center">
                {publicaciones.map((publicacion) => (
                    <Grid item xs={12} sm={8} md={6} key={publicacion.id}>
                        <Card
                            sx={{
                                padding: 3,
                                boxShadow: 4,
                                backgroundColor: '#F3F4F6',
                                borderRadius: '12px',
                            }}
                        >
                            <Box>
                                <Typography
                                    variant="h5"
                                    gutterBottom
                                    sx={{ color: '#2C3E50', fontWeight: 'bold', marginBottom: '10px' }}
                                >
                                    {publicacion.titulo}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    sx={{ marginBottom: '15px', lineHeight: 1.6 }}
                                >
                                    {publicacion.contenido.slice(0, 100)}... {/* Resumen */}
                                </Typography>
                                <Divider sx={{ margin: '15px 0' }} />
                                <Button
                                    component={Link}
                                    to={`/publicaciones/${publicacion.id}`}
                                    variant="contained"
                                    size="small"
                                    sx={{ backgroundColor: '#2ECC71' }}
                                >
                                    Ver más
                                </Button>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Fijas;
