import React, { useContext } from "react";
import { Col } from "react-bootstrap";
import { API } from "../API";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { medicoContex } from "../contex/medico";

const TurnosDisponiblesComponent = ({turno,updateData}) => {
  const { hora, id ,nombre} =turno
  console.log(id);
  //const {medico,setMedico} = useContext(medicoContex)
  const {medico}= useContext(medicoContex)
  const CallAPI = async () => {
    console.log(id);
    try {
      let datos = {nombre:"desde el front"};

      await API.post(`/api/reservaturno/${id}/${medico}`,datos);
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