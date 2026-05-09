const express = require("express")
const mysql = require("mysql2")

const app = express()

app.use(express.json())

const conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "prueba"
})

conexion.connect((err) => {
    err
    ? console.log("Error de conexion a base de datos!")
    : console.log("Coneccion exitosa a base de datos!")
})

app.get("/usuarios", async (req, res) => {
    
    const query = `SELECT * FROM usuarios`

    try {
        const [results] = await conexion.promise().query(query)
        res.json(results)
    } catch (err) {
        res.json({err: err})
    }
})

app.get("/usuarios/:id", async(req, res) => {
    const id = req.params.id

    const query = `SELECT * FROM usuarios
                   WHERE id = ?`

    try {
        const [results] = await conexion.promise().query(query, [id])
        res.json(results)
    } catch (err) {
        res.json({err: err})
    }
})

app.post("/usuarios", async(req, res) => {
    const {nombre, edad, estado} = req.body

    const query = `INSERT INTO usuarios(nombre, edad, estado)
                   VALUES(?, ?, ?)`

    try {
        const [results] = await conexion.promise().query(query, [nombre, edad, estado])
        res.json({mensaje: "Usuario Creado!"})
    } catch (err) {
        res.json({err: err})
    }
})

app.put("/usuarios/:id", async(req, res) => {
    const id = req.params.id

    const {nombre, edad, estado} = req.body

    const query = `UPDATE usuarios
                   SET nombre = ?, edad = ?, estado = ?
                   WHERE id = ?`

    try {
        const [results] = await conexion.promise().query(query, [nombre, edad, estado, id])
        res.json({mensaje: "Usuario actualizado!"})
    } catch (err) {
        res.json({err: err})
    }
})

app.patch("/usuarios/:id", async(req, res) => {
    const id = req.params.id
    const campos = req.body

    const keys = Object.keys(campos)

    const query = `UPDATE usuarios
                   SET ${keys.map(key => `${key} = ?`).join(", ")}
                   WHERE id = ?`

    const values = Object.values(campos)

    console.log(query)

    try {
        const [results] = await conexion.promise().query(query, [...values, id])
        res.json({mensaje: "Usuario actualizado!"})
    } catch (err) {
        res.json({err: err})
    }
})

app.delete("/usuarios/:id", async(req, res) => {
    const id = req.params.id

    const query = `DELETE FROM usuarios
                   WHERE id = ?`

    try {
        const [results] = await conexion.promise().query(query, [id])
        res.json({mensaje: "Usuario eliminado!"})
    } catch (err) {
        res.json({err: err})
    }
})

app.listen(3000, () => {
    console.log("Servidor corriendo!")
})