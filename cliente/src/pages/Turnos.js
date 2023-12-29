import React, { useState, useEffect } from 'react';
import { Row, Container } from 'react-bootstrap';
import TurnosDisponiblesComponent from "./../componet/TurnosDisponiblesComponent"
import { useFetch } from '../hoocks/useFetch';
import AgregarTurno from '../componet/AgregarTurno';
function Turnos() {
  const [endpoint, setEndpoint] = useState('api/turnos');
  const { state, fetchData } = useFetch(endpoint);
  const { data, loading, error } = state
  console.log(data);

  const updateData = () => {
    console.log(updateData);
    setEndpoint("api/turnos")
    fetchData();
  };
  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error...</h1>;

  return (
    <>
        <AgregarTurno  updateData={updateData} ></AgregarTurno>
        <h3>Elegi el turno</h3>
        {data?.map((turno)=>(
          <TurnosDisponiblesComponent turno={turno} updateData={updateData}></TurnosDisponiblesComponent>
        ))}
    </>
  )
}

export default Turnos