import React from 'react';
import MyNavbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cursos from './components/Cursos';
import Horarios from './components/Horarios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer';

function App() {
    return (
        <Router>
            <div className="App">
                <MyNavbar />
                <Routes>
                    <Route path="/cursos" element={<Cursos />} />
                    <Route path="/horarios" element={<Horarios />} />
                    <Route path="/" element={<h1>Página Principal</h1>} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
