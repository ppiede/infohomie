// Imports
import { React } from "react";
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Logo from '../img/YouChooseLogo1.png';

const Toolbar = () => {
  return (
    <>
    <Navbar bg="primary" variant="dark" sticky="top" >
    <Navbar.Brand href="/">
      <img
        src={Logo}
        height="30"
        className="d-inline-block align-top"
        alt="React Bootstrap logo"
      />
    </Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="/new">Neuer Entscheidungsbaum</Nav.Link>
      <Nav.Link href="/data">Datensatz bearbeiten</Nav.Link>
      <Nav.Link href="/help">Hilfe</Nav.Link>
    </Nav>
    
  </Navbar>
  </>
  );
};

export default Toolbar;
