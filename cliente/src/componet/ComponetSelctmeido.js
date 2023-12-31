import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { API } from "../API";
import { useFetch } from "../hoocks/useFetch";
import { Button } from "react-bootstrap";
import { medicoContex } from "../contex/medico";
import { useContext } from "react";
///api/medicos
const ComponetSelctmeido = ({ getDoctor }) => {
  const [medicoSeleccionado, setMedicoSeleccionado] = useState('')
  const [endpoint, setEndpoint] = useState("api/medicos");
  const { state, fetchData } = useFetch(endpoint);
  const { data, loading, error } = state;
  console.log(data);
  const { setMedico } = useContext(medicoContex);


  const handleMedicoChange = (event) => {
    const nuevoMedicoSeleccionado = event.target.value;
    
     setMedico(nuevoMedicoSeleccionado)
     console.log(nuevoMedicoSeleccionado);
  };
  return (
    <>
      <Form.Select
        size="sm"
        onChange={handleMedicoChange}
        value={medicoSeleccionado}
      >
        {data &&
          Array.isArray(data) &&
          data.map((medico) => (
            <option key={medico.id} value={medico.medico}>
              {medico.medico}
            </option>
          ))}
        {data && data.length === 0 && <option>...cargando</option>}
      </Form.Select>
      
    </>
  );
};

export default ComponetSelctmeido;
