import React from 'react';
import { Card, Container, Typography, Divider, Grid, List, ListItem, ListItemText, Box } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';

const cursosData = [
    { nombre: 'Lenguaje I', descripcion: 'Curso general sobre habilidades de lenguaje.' },
    { nombre: 'Matemática Básica I', descripcion: 'Curso introductorio de matemáticas básicas.' },
    { nombre: 'Métodos y Técnicas de Estudio', descripcion: 'Curso sobre métodos y técnicas para mejorar el estudio.' },
    { nombre: 'Psicología General', descripcion: 'Curso introductorio a la psicología.' },
    { nombre: 'Introducción a la Ingeniería de Sistemas e Informática', descripcion: 'Curso introductorio a la ingeniería de sistemas.' },
    { nombre: 'Ética y Liderazgo', descripcion: 'Curso sobre principios éticos y liderazgo.' },
    { nombre: 'Lenguaje II', descripcion: 'Curso avanzado sobre habilidades de lenguaje.' },
    { nombre: 'Matemática Básica II', descripcion: 'Curso avanzado de matemáticas básicas.' },
    { nombre: 'Ecología y Protección del Medio Ambiente', descripcion: 'Curso sobre ecología y protección ambiental.' },
    { nombre: 'Sociología General', descripcion: 'Curso introductorio a la sociología.' },
];

const preguntasEjemplo = [
    '¿Cuáles son los principios básicos de este curso?',
    'Explica los conceptos clave y sus aplicaciones.',
    'Desarrolla un ejemplo práctico para aplicar lo aprendido.',
    'Describe la importancia de este tema en la vida cotidiana.',
    '¿Cómo se relaciona este tema con otras disciplinas?'
];

const Fijas = () => {
    return (
        <div className="container">
            <h1>Preguntas Fijas de Examen</h1>
            <Divider className="mb-4" />

            <Grid container spacing={4} justifyContent="center">
                {cursosData.map((curso, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card 
                            sx={{
                                height: '100%',
                                padding: 2,
                                boxShadow: 3,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                backgroundColor: '#F9F9F9',
                                borderRadius: '8px',
                            }}
                        >
                            <Box>
                                <Typography variant="h5" gutterBottom sx={{ color: '#34495E', fontWeight: 'medium' }}>
                                    {curso.nombre}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" gutterBottom>
                                    {curso.descripcion}
                                </Typography>
                                <Divider className="my-3" />
                                <List dense>
                                    {preguntasEjemplo.map((pregunta, idx) => (
                                        <ListItem key={idx} disableGutters>
                                            <ListItemText primary={`• ${pregunta}`} />
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Fijas;
