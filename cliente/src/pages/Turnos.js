import React, { useState, useEffect } from 'react';
import { Row, Container } from 'react-bootstrap';
import TurnosDisponiblesComponent from "./../componet/TurnosDisponiblesComponent"
import { useFetch } from '../hoocks/useFetch';
import AgregarTurno from '../componet/AgregarTurno';
import ComponetSelctmeido from '../componet/ComponetSelctmeido';
import ComponetCrearMedico from "../componet/ComponetCrearMedico"
function Turnos() {
  const [endpoint, setEndpoint] = useState('/api/turnos/abaduna');
  const [medico,setMedico]= useState("")
  const { state, fetchData } = useFetch(endpoint);
  const { data, loading, error } = state
  console.log(data);

  const updateData = () => {
    console.log(`updateData`);
    
    fetchData();
  };
  const getDoctor=(medico)=>{
    console.log(medico);
    console.log(`del componet padre`);
    setEndpoint(`/api/turnos/${medico}`)
  }
  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error...</h1>;

  return (
    <>
        <ComponetSelctmeido getDoctor={getDoctor}></ComponetSelctmeido>
        <AgregarTurno  updateData={updateData} ></AgregarTurno>
        <h3>Elegi el turno</h3>
        {data?.map((turno)=>(
          <TurnosDisponiblesComponent turno={turno} updateData={updateData}></TurnosDisponiblesComponent>
        ))}
        <ComponetCrearMedico  updateData={updateData} ></ComponetCrearMedico>
    </>
  )
}

export default Turnos