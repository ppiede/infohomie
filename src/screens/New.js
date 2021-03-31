import { React } from "react";
import ModeSelection from "../components/ModeSelection";
import { Card, CardGroup, Col, Container } from 'react-bootstrap';
import Logo from '../img/YouChooseLogo.png';

const New = () => {
  return (
    <div
      style={{
        height: "90vh",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      
      <p style={{ fontSize: 24, fontWeight: "900", marginBottom: 64 }}>
        Welche Modus der Website möchtest du nutzen?
      </p>
      
      <Container>
      <CardGroup>
        <Col>
        <Card border="info" style={{ width: '18rem'}}>
          <Card.Body>
            <Card.Title style={{textDecorationLine: 'underline'}}>Alles vorgegeben</Card.Title>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Text>
              Vollständiger Datensatz vorgegeben
            </Card.Text>
            <Card.Text>
              Kritierien zur Klassifikation bereits eingetragen
            </Card.Text>
            <Card.Text>
              Sofort einen Entscheidungsbaum erstellen
            </Card.Text>
          </Card.Body>
        </Card>
        </Col>
        <Col>
        <Card border="info" style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title style={{textDecorationLine: 'underline'}}>Daten vorgegeben</Card.Title>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Text>
              Vollständiger Datensatz vorgegeben
            </Card.Text>
            <Card.Text>
              Kritierien selber aussuchen und klassifizieren
            </Card.Text>
            <Card.Text>
              Sofort einen Entscheidungsbaum erstellen
            </Card.Text>
          </Card.Body>
        </Card>
        </Col>
        <Col>
        <Card border="info" style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title style={{textDecorationLine: 'underline'}}>Ganz von vorne</Card.Title>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Text>
              Datensatz komplett selber erstellen
            </Card.Text>
            <Card.Text>
              Kritierien selber aussuchen und klassifizieren
            </Card.Text>
            <Card.Text>
              Sofort einen Entscheidungsbaum erstellen
            </Card.Text>
          </Card.Body>
        </Card>
        </Col>
      </CardGroup>
      </Container>
    </div>
  );
};

export default New;
