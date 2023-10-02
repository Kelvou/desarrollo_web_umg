import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <Navbar className='navbar-custom' expand="lg">
      <Container>
        <Navbar.Brand>Consumiendo API pública (HT9) - Kelvin José Gómez Morales (9490-19-480)</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink
                to="/"
                className="nav-link rounded-pill btn btn-dark mx-2"
                activeClassName="active"
              >
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/pokemon"
                className="nav-link rounded-pill btn btn-dark mx-2"
                activeClassName="active"
              >
                Pokémon
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/info"
                className="nav-link rounded-pill btn btn-dark mx-2"
                activeClassName="active"
              >
                Información
              </NavLink>
            </li>
          </ul>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
