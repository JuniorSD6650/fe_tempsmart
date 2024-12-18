import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import BookIcon from '@mui/icons-material/Book';
import ScheduleIcon from '@mui/icons-material/Schedule';
import TaskIcon from '@mui/icons-material/Task';
import MenuIcon from '@mui/icons-material/Menu';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import '../../css/MyNavbar.css'; 

function MyNavbar() {
  const navigate = useNavigate();

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('token');  // Eliminar el token
    navigate('/login');  // Redirigir al login
  };

  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand href="/" className="navbar-brand-custom">
          <HomeIcon /> TempSmart
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <MenuIcon style={{ color: 'white' }} /> 
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/cursos">
              <Nav.Link className="nav-link-custom"><BookIcon /> Cursos</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/horarios">
              <Nav.Link className="nav-link-custom"><ScheduleIcon /> Horarios</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/tareas">
              <Nav.Link className="nav-link-custom"><TaskIcon /> Tareas</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/fijas">
              <Nav.Link className="nav-link-custom"><GpsFixedIcon /> Fijas</Nav.Link>
            </LinkContainer>
            {/* Icono de Cerrar Sesión */}
            <Nav.Link onClick={handleLogout} className="nav-link-custom">
              <ExitToAppIcon style={{ color: 'white' }} /> {/* Icono de salir */}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
