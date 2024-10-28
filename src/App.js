import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import MyNavbar from './components/general/Navbar';
import Footer from './components/general/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import HomePage from './HomePage';
import Cursos from './components/cursos/Cursos';
import Horarios from './components/horarios/Horarios';
import Login from './components/usuario/LoginRegister';
import PrivateRoute from './components/usuario/PrivateRoute';

function App() {
    const location = useLocation();

    const hideMenuFooter = location.pathname === '/login' || location.pathname === '/register';

    return (
        <div className={`App ${hideMenuFooter ? 'no-background' : ''}`}>
            {!hideMenuFooter && <MyNavbar />}
            <div className="main-content">
                <Routes>
                    <Route path="/login" element={<Login />} />

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
