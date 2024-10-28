import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../../css/login_register.css';
import fondoTiempo from '../../images/fondo_tiempo.jpg';

const LoginRegister = () => {
    const [isFlipped, setIsFlipped] = useState(false); // Controla el estado de la imagen
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 767); // Controla si es mobile
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 767);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleFlip = () => {
        setIsFlipped(!isFlipped); // Cambia el estado del formulario a mostrar en pantallas pequeñas
    };

    const handleSubmitLogin = async (e) => {
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

    const handleSubmitRegister = async (e) => {
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
            localStorage.setItem('token', data.token);
            navigate('/');
        } catch (error) {
            setError('Error al registrar el usuario.');
        }
    };

    return (
        <Container className="login-register-container">
            <div className="form-side row">
                {!isMobile && (
                    <div className={`image-side ${isFlipped ? 'flipped' : ''}`} style={{ backgroundImage: `url(${fondoTiempo})` }}></div>
                )}
                {/* Formulario en pantallas pequeñas */}
                {isMobile && (
                    <div className="col-12 text-center mb-4">
                        {/* Botón para cambiar entre vistas, eliminando el texto azul */}
                        {/* Se elimina este botón ya que ya existe uno similar abajo */}
                    </div>
                )}

                {/* Registro */}
                <div className={`col-md-6 register ${isFlipped && isMobile ? 'd-block' : isMobile ? 'd-none' : ''}`}>
                    <h2 className='text_black'>Registrarse</h2>
                    {error && <p className="text-danger">{error}</p>}
                    <Form onSubmit={handleSubmitRegister}>
                        <Form.Group controlId="formBasicUsernameRegister">
                            <Form.Label className='text_black'>Nombre de usuario</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingresa tu nombre de usuario"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmailRegister" className="mt-3">
                            <Form.Label className='text_black'>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Ingresa tu email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicPasswordRegister" className="mt-3">
                            <Form.Label className='text_black'>Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Ingresa tu contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-4 btn_login">
                            Registrarse
                        </Button>
                        <div className="text-center mt-3">
                            <p className='text_black'>¿Ya tienes una cuenta? <span onClick={handleFlip} className="link-like">Inicia sesión aquí</span></p>
                        </div>
                    </Form>
                </div>

                {/* Login */}
                <div className={`col-md-6 login ${(!isFlipped || !isMobile) ? 'd-block' : 'd-none'}`}>
                    <h2>Iniciar Sesión</h2>
                    {error && <p className="text-danger">{error}</p>}
                    <Form onSubmit={handleSubmitLogin}>
                        <Form.Group controlId="formBasicUsernameLogin">
                            <Form.Label className='text_black'>Nombre de usuario</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingresa tu nombre de usuario"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicPasswordLogin" className="mt-3">
                            <Form.Label className='text_black'>Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Ingresa tu contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-4 btn_login">
                            Iniciar Sesión
                        </Button>
                        <div className="text-center mt-3">
                            <p className='text_black'>¿No tienes una cuenta? <span onClick={handleFlip} className="link-like">Regístrate aquí</span></p>
                        </div>
                    </Form>
                </div>
            </div>
        </Container>
    );
};

export default LoginRegister;
