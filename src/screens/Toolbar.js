// Imports
import { React } from "react";
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";


const Toolbar = () => {
  return (
    <>
    <Navbar bg="primary" variant="dark" sticky="top" >
    <Navbar.Brand href="/">
      <img
        src='../img/YouChooseLogo1.png'
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
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-light">Search</Button>
    </Form>
  </Navbar>
  </>
  );
};

export default Toolbar;
