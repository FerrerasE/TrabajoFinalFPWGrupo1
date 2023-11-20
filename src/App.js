import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './components/Styles.css';

import Inicio from './components/Inicio';
import ErrorPage from './components/ErrorPage';
import About from './components/About';
import Spaceships from './components/SpaceShips';

import Note from './components/Note';
import Animales from './Animales/InicioAnimales';
import Dude from './components/Dude';
import Comparador from './components/Comparador';
// import EstilosAnimales from '../src/Animales/stylesAnimales.css';



import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
//  import { Component } from 'react';
function App() {
    return (
        <Router>

            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">Grupo 1</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Inicio</Nav.Link>
                            <Nav.Link href="AboutUs">Sobre nosotros</Nav.Link>
                            {/* <Nav.Link href="*">ErrorPage</Nav.Link> */}
                            <NavDropdown title="Trabajos" id="basic-nav-dropdown">
                                <NavDropdown.Item href="Spaceships">Spaceships</NavDropdown.Item>
                                <NavDropdown.Item href="Note">Lista de Tareas</NavDropdown.Item> 
                                <NavDropdown.Item href="Animales">Juego de Animales</NavDropdown.Item> 
                                <NavDropdown.Item href="Dude">Juego de Dude</NavDropdown.Item> 
                                <NavDropdown.Item href="Comparador">Comparador de precios</NavDropdown.Item> 
                                {/* <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>  */}
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="Note" element={<Note />} />
                <Route path="Animales" element={<Animales />} /> 
                <Route path="spaceships" element={<Spaceships />} />
                <Route path="Dude" element={<Dude />} />
                <Route path="Comparador" element={<Comparador />} />
                {/*<Route path="otrojuego" element={<otrojuego />} />  */}
                <Route path="AboutUs" element={<About />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </Router>
    )
}

export default App;