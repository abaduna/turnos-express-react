import React, { createContext, useContext, useState } from 'react'

export const medicoContex = createContext()

const {Provider} = medicoContex

export const MedicoProvider =({children})=>{
    const [medico,setMedico] = useState("abaduna")
    console.log(`medico del contexto`);
    console.log(medico);
    return(
        <Provider value={{setMedico,medico}}>
            {children}
        </Provider>
    )
}


