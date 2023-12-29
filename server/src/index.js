const express = require("express")
const morgan = require("morgan")
const database = require("./db")
const mysql = require("promise-mysql")
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa el paquete cors

const app = express()

app.use(cors())
app.use(morgan("dev"))

//midel
app.use(express.json());

//turnos disposibles
app.get("/api/turnos",async(req,res)=>{
    const connection = await database.getConnection();
    try {
        const result = await connection.query("SELECT * FROM abaduna WHERE estado = 0");//cambiar a estado cero
        res.status(200).json(result);
    } catch (error) {
        console.error("Error en la consulta:", error);
        await connection.end();
        res.status(500).json({ error: "Error en la consulta" });
    }
})

//reservar turno
app.post("/api/reservaturno",async(req,res)=>{
    const connection = await database.getConnection();
    let {nombre,hora} = req.body
    try {
        const result = await connection.query("INSERT INTO `abaduna` (`nombre`, `hora`, `estado`) VALUES (?, ?, ?);",[nombre,hora,1])
        res.status(200).json({ message: "reservado con exito" });
    } catch (error) {
        console.error("Error en la consulta:", error);
        await connection.end();
        res.status(500).json({ error: "Error en el put" });
    }
})
app.post("/api/turnosagregados",async(req,res)=>{
    const connection = await database.getConnection();
    let {hora} = req.body
    try {
        const result = await connection.query("INSERT INTO `abaduna` ( `hora`, `estado`) VALUES (?, ?);",[hora,0])
        res.status(200).json({ message: "agregando hora" });
    } catch (error) {
        console.error("Error en la consulta:", error);
        await connection.end();
        res.status(500).json({ error: "Error en el put" });
    }
})
app.listen(3001,()=>{
    console.log(`corriendo por el puerto 3000`);
})