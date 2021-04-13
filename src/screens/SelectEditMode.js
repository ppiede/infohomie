import { React } from "react";
import ModeSelection from "../components/ModeSelection";
import { Card, CardGroup, Col, Container } from 'react-bootstrap';
import Logo from '../img/YouChooseLogo.png';
import Footer from "../components/Footer.js";
import './SelectEditMode.css';

const SelectEditMode = () => {


    let page = [];

    const body = (
        <div
            style={{
                display: "flex",
                height: "90vh",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
                <div class="row-md-4" style={{marginTop: '8em'}}>
                    <img
                    src={Logo}
                    height="150"
                    className="d-inline-block align-top"
                    alt="You choose Logo"
                    />
                </div>
                <div class="row-md-4">
                    Willkommen auf unserer Seite. 
                    <br/>
                    Wählen Sie bitte die Option, mit welcher Sie einen Entscheidungsbaum erstellen wollen.
                    <br/>
                    &nbsp;
                    
                </div>
                <div class="row-md-4">
                    <CardGroup>
                        <div class="col-md-4">
                            <a href="/select-tree-dataset" style={{ color: '#000', textDecoration: 'none'}}>
                            <Card border="primary" style={{ width: '18rem', minHeight: '470px' }}>
                                <Card.Body>
                                    <Card.Title style={{ textDecorationLine: 'underline' }}>Entscheidungsbaum erstellen</Card.Title>
                                    <Card.Img variant="top" src="holder.js/100px160" />
                                    <Card.Text>
                                        Einen Entscheidungsbaum aus einem gelabelten Bildersatz erstellen
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            </a>
                        </div>
                        <div class="col-md-4">
                            <a href="/select-edit-dataset" style={{ color: '#000', textDecoration: 'none'}}>
                            <Card border="primary" style={{ width: '18rem', minHeight: '470px' }}>
                                <Card.Body>
                                    <Card.Title style={{ textDecorationLine: 'underline' }}>Bestehenden Bildersatz labeln</Card.Title>
                                    <Card.Img variant="top" src="holder.js/100px160" />
                                    <Card.Text>
                                        Einen vorhandenen Bildersatz nutzen
                                    </Card.Text>
                                    <Card.Text>
                                        Kritierien editieren und Bilder klassifizieren
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            </a>
                        </div>
                        <div class="col-md-4">
                            <a href="/upload-pictures" style={{ color: '#000', textDecoration: 'none'}}>
                            <Card border="primary" style={{ width: '18rem', minHeight: '470px' }} route={"/upload-pictures"}>
                                <Card.Body>
                                    <Card.Title style={{ textDecorationLine: 'underline' }}>Eigenen Bildersatz hochladen und labeln</Card.Title>
                                    <Card.Img variant="top" src="holder.js/100px160" />
                                    <Card.Text>
                                        Bilder selber hochladen
                                    </Card.Text>
                                    <Card.Text>
                                        Kritierien aussuchen und Bilder klassifizieren
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            </a>
                        </div>
                    </CardGroup>
                </div>
            <br/>
            <Footer />
        </div>
        
    );

    page.push(body);

    return page;
}

export default SelectEditMode;