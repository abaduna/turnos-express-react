import React from "react";
import { Col } from "react-bootstrap";
import { API } from "../API";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const TurnosDisponiblesComponent = ({turno,updateData}) => {
  const { hora, id ,nombre} =turno
  console.log(id);
  const CallAPI = async () => {
    console.log(id);
    try {
      let datos = {
        hora,
        nombre:"generico2",
        estado:1
      };

      await API.post(`/api/turnos`,datos);
      console.log(`turno asignado con exito`);
      updateData()
    } catch (error) {
      console.log(`algo salio en en CallAPI de TurnosDisponiblesComponent`);
      console.error(error);
    }
  };
  return (
    <Col md={4} lg={6} sm={12}>
      <Card>
        <Card.Body>
          <Card.Title>Hora disponible</Card.Title>
          <Button variant="danger" onClick={CallAPI}>
           la hora es: {hora}
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};
export default TurnosDisponiblesComponent