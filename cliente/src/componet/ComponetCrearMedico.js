import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { API } from "../API";
function ComponetCrearMedico() {
  const [medico, setMedico] = useState("");
  const uploadDoctor =async()=>{
    let datos = {
        "nameMedico":"probandonumero3"
        
        }
    try {
        await API.post(`api/cargarmedico`, datos);
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
        console.error("Error de red:", error.message);
      }
    
      
  }
  return (
    <>
      <p>Agregar un medico</p>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Agregar un nuevo medico"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          value={medico}
          onChange={(e) => setMedico(e.target.value)}
        />
        <Button 
        variant="outline-secondary" 
        id="button-addon2"
        onClick={uploadDoctor}>
          Button
        </Button>
      </InputGroup>
    </>
  );
}

export default ComponetCrearMedico;
