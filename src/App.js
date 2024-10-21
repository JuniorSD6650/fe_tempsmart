import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import MyNavbar from './components/Navbar';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import HomePage from './HomePage';
import Cursos from './components/Cursos';
import Horarios from './components/Horarios';
import Register from './components/Register';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';

function App() {
    const location = useLocation();

    const hideMenuFooter = location.pathname === '/login' || location.pathname === '/register';

    return (
        <div className={`App ${hideMenuFooter ? 'no-background' : ''}`}>
            {!hideMenuFooter && <MyNavbar />}
            <div className="main-content">
                <Routes>
                    {/* Páginas de acceso público */}
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />

                    {/* Rutas protegidas */}
                    <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
                    <Route path="/cursos" element={<PrivateRoute><Cursos /></PrivateRoute>} />
                    <Route path="/horarios" element={<PrivateRoute><Horarios /></PrivateRoute>} />
                </Routes>
            </div>
            {!hideMenuFooter && <Footer />}
        </div>
    );
}

// Asegúrate de exportar el componente por defecto
export default function AppWithRouter() {
    return (
        <Router>
            <App />
        </Router>
    );
}
