const express = require("express");
const morgan = require("morgan");
const database = require("./db");
const mysql = require("promise-mysql");
const bodyParser = require("body-parser");
const cors = require("cors"); // Importa el paquete cors

const app = express();

app.use(cors());
app.use(morgan("dev"));

//midel
app.use(express.json());

//turnos disposibles
app.get("/api/turnos/:medico", async (req, res) => {
  const medico = req.params.medico;
  const connection = await database.getConnection();
  try {
    //sensible a inyercion de sql
    const result = await connection.query(
      `SELECT * FROM ${medico} WHERE estado = 0;`
    ); //cambiar a estado cero
    res.status(200).json(result);
  } catch (error) {
    console.error("Error en la consulta:", error);
    await connection.end();
    res.status(500).json({ error: "Error en la consulta" });
  }
});

//reservar turno
app.post("/api/reservaturno/:id", async (req, res) => {
  const id = req.params.id;
  const connection = await database.getConnection();
  let { nombre, hora } = req.body;
  try {
    const result = await connection.query(
      `UPDATE abaduna SET nombre = ?, estado = 1 WHERE id=?;`,
      [nombre, id]
    );
    res.status(200).json({ message: "reservado con exito" });
  } catch (error) {
    console.error("Error en la consulta:", error);
    await connection.end();
    res.status(500).json({ error: "Error en el put" });
  }
});
app.post("/api/turnosagregados", async (req, res) => {
  const connection = await database.getConnection();
  let { hora } = req.body;
  try {
    const result = await connection.query(
      "INSERT INTO `abaduna` ( `hora`, `estado`) VALUES (?, ?);",
      [hora, 0]
    );
    res.status(200).json({ message: "agregando hora" });
  } catch (error) {
    console.error("Error en la consulta:", error);
    await connection.end();
    res.status(500).json({ error: "Error en el put" });
  }
});

//get de tabla de medicos
app.get("/api/medicos", async (req, res) => {
  const connection = await database.getConnection();
  try {
    const result = await connection.query("SELECT * FROM tabledemeidcos");
    res.status(200).json(result);
  } catch (error) {
    console.error("Error en la consulta:", error);
    await connection.end();
    res.status(500).json({ error: "Error en la consulta" });
  }
});

app.post("/api/cargarmedico", async (req, res) => {
  const connection = await database.getConnection();
  let { nameMedico } = req.body;
  const sanitizedMedicoName = nameMedico.replace(/[^a-zA-Z0-9_]/g, '_');
  try {
    const sentenciaSql = `CREATE TABLE ${sanitizedMedicoName} (id INT NOT NULL AUTO_INCREMENT, nombre VARCHAR(50) DEFAULT NULL,hora INT DEFAULT NULL,estado TINYINT DEFAULT 0,PRIMARY KEY ( id ));`;

    await connection.query(sentenciaSql);
    try {
      await connection.query(`INSERT INTO tabledemeidcos (medico) VALUES (?);`,[sanitizedMedicoName])
    } catch (error) {
      console.log(`error en la setencia de insert`);
      console.error(error);
    }

    res.status(200).json({ message: " medico agregando" });
  } catch (error) {
    console.error("Error en la consulta:", error);
    await connection.end();
    res.status(500).json({ error: "Error en el put" });
  }
});

app.listen(3001, () => {
  console.log(`corriendo por el puerto 3000`);
});
