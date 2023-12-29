import React, { useState } from 'react'
import { API } from '../API';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';

function AgregarTurno({updateData}) {
    const [hora,setHora] = useState(null)
    //ojo solo agregar numero enteros
    const addTime = async () => {
       
        try {
          let datos = {
            hora,
            estado:0
          };
    
          await API.post(`/api/turnosagregados`,datos);
          console.log(`nueva hora`);
          updateData()
          setHora()
        } catch (error) {
          console.log(`algo salio en en CallAPI de TurnosDisponiblesComponent`);
          console.error(error);
        }
      };
  return (
    <>
    <h3>Agregar turno</h3>
    <Form.Control
          placeholder=""
          aria-label=""
          aria-describedby="basic-addon2"
          value={hora}
          onChange={(e)=>setHora(e.target.value)}
        />
        <Button onClick={addTime}>Agregar hora</Button>
    </>
  )
}

export default AgregarTurno