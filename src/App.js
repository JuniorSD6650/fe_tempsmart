import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import MyNavbar from './components/general/Navbar';
import Footer from './components/general/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import HomePage from './HomePage';
import Cursos from './components/cursos/Cursos';
import Horarios from './components/horarios/horario';
import Tareas from './components/tareas/tareas';
import TareasCurso  from './components/tareas/tareasCurso';
import Login from './components/usuario/LoginRegister';
import PrivateRoute from './components/usuario/PrivateRoute';
import Fijas from './components/ayuda//apuntes/fijas';
import Planos from './components/ayuda//croquis/planos';
import PlanosHorario from './components/ayuda//croquis/planosHorario';
import PublicacionDetalle from './components/ayuda/apuntes/publicacionDetalle';

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
                    <Route path="/tareas" element={<PrivateRoute><Tareas /></PrivateRoute>} />
                    <Route path="/fijas" element={<PrivateRoute><Fijas /></PrivateRoute>} />
                    <Route path="/publicaciones/:id" element={<PublicacionDetalle />} />
                    <Route path="/croquis" element={<PrivateRoute><Planos /></PrivateRoute>} />
                    <Route path="/cursos/:cursoId/tareas" element={<TareasCurso />} />
                    <Route path="/horarios/:paSa/croquis" element={<PlanosHorario />} />
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
