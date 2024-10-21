import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap'; // Usamos react-bootstrap para el diseño
import { Link } from 'react-router-dom'; // Enlace para redirigir al login

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/api/auth/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });
            if (!response.ok) {
                throw new Error('Error en el registro');
            }
            const data = await response.json();
            localStorage.setItem('token', data.token);  // Guardar el token
            navigate('/cursos');  // Redirigir a la página de cursos
        } catch (error) {
            setError('Error al registrar el usuario.');
        }
    };    

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    <div className="register-form p-4 mt-5">
                        <h2 className="text-center mb-4">Registrarse</h2>
                        {error && <p className="text-danger">{error}</p>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formBasicUsername">
                                <Form.Label>Nombre de usuario</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingresa tu nombre de usuario"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail" className="mt-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Ingresa tu email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword" className="mt-3">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Ingresa tu contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit" className="mt-4 w-100">
                                Registrarse
                            </Button>
                        </Form>
                        <div className="text-center mt-3">
                            <p>¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;
