import React, { useState, useEffect, useContext } from 'react';
import { Row, Container, Button } from 'react-bootstrap';
import TurnosDisponiblesComponent from "./../componet/TurnosDisponiblesComponent"
import { useFetch } from '../hoocks/useFetch';
import AgregarTurno from '../componet/AgregarTurno';
import ComponetSelctmeido from '../componet/ComponetSelctmeido';
import ComponetCrearMedico from "../componet/ComponetCrearMedico"
import { medicoContex } from '../contex/medico';
function Turnos() {
  // const {medico} = useContext(medicoContex)
  const {medico,setMedico} = useContext(medicoContex)
  
  
  const [endpoint, setEndpoint] = useState(`/api/turnos/abaduna`);
  const { state, fetchData } = useFetch(endpoint);
  // console.log(endpoint);
  const { data, loading, error } = state
 console.log(medico);

  const updateData = () => {
    console.log(`updateData`);
    fetchData()
    
  };
  const serchMedic=async()=>{
      console.log(`click serchMedic`);
      await setEndpoint(`/api/turnos/${medico}`)
      console.log(endpoint);
      await fetchData();
      console.log(data); // Log the updated data after the fetch is completed
      console.log(`useEffect`);
    
  }
 
  
    


  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error...</h1>;

  return (
    <>
        <ComponetSelctmeido></ComponetSelctmeido>
        <AgregarTurno  updateData={updateData} ></AgregarTurno>
        <h3>Elegi el turno de <b>{medico}</b></h3>
        <Button onClick={serchMedic}>Buscar turnos medico👆</Button>
        {data.length >0 && data?.map((turno)=>(
          <TurnosDisponiblesComponent turno={turno} updateData={updateData}></TurnosDisponiblesComponent>
        ))}
        <ComponetCrearMedico  updateData={updateData} ></ComponetCrearMedico>
    </>
  )
}

export default Turnos