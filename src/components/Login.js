import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap'; 
import { Link } from 'react-router-dom'; 

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/api/auth/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            if (!response.ok) {
                throw new Error('Error en la autenticación');
            }
            const data = await response.json();
            localStorage.setItem('token', data.token); 
            navigate('/');
        } catch (error) {
            setError('Error al iniciar sesión. Verifique sus credenciales.');
        }
    };    

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    <div className="login-form p-4 mt-5">
                        <h2 className="text-center mb-4">Iniciar Sesión</h2>
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
                                Iniciar Sesión
                            </Button>
                        </Form>
                        <div className="text-center mt-3">
                            <p>¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link></p>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
