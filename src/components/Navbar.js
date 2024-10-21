import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import HomeIcon from '@mui/icons-material/Home';
import BookIcon from '@mui/icons-material/Book';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import MenuIcon from '@mui/icons-material/Menu'; // Importa el ícono de hamburguesa de MUI
import '../css/MyNavbar.css';  // Importa el archivo CSS

function MyNavbar() {
  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand href="/" className="navbar-brand-custom">
          <HomeIcon /> Generador de Horarios
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          {/* Reemplaza el ícono predeterminado con el de MUI */}
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
            <LinkContainer to="/contacto">
              <Nav.Link className="nav-link-custom"><ContactMailIcon /> Contacto</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
