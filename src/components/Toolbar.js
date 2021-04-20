// Imports
import { React } from "react";
import { Navbar, Nav} from 'react-bootstrap';
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
        alt="You choose Logo"
      />
    </Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="/">Home</Nav.Link>
    </Nav>
    <Nav className="ml-auto">
      <Nav.Link href="/help">Hilfe</Nav.Link>
    </Nav>
    
  </Navbar>
  </>
  );
};

export default Toolbar;
