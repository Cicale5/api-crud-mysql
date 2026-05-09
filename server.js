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
    : console.log("Conexion exitosa a base de datos!")
})

app.get("/usuarios", (req, res) => {
    const query = "SELECT * FROM usuarios"

    conexion.query(query, (err, results) => {
        err
        ? res.json({err: err})
        : res.json(results)
    })
})

app.get("/usuarios/:id", (req, res) => {
    const id = req.params.id

    const query = "SELECT * FROM usuarios WHERE id = ?"

    conexion.query(query, [id], (err, results) => {
        err
        ? res.json({err: err})
        : res.json(results)
    })
})

app.post("/usuarios", (req, res) => {
    const { nombre, edad, estado} = req.body

    const query = `INSERT INTO usuarios(nombre, edad, estado)
                   VALUES(?, ?, ?)`

    conexion.query(query, [nombre, edad, estado], (err, results) => {
        err
        ? res.json({err: err})
        : res.json({
            mensaje: "Usuario Creado!",
            results
        })
    })
})

app.put("/usuarios/:id", (req, res) => {
    const id = req.params.id

    const {nombre, edad, estado} = req.body

    const query = `UPDATE usuarios
                   SET nombre = ?, edad = ?, estado = ?
                   WHERE id = ?`

    conexion.query(query, [nombre, edad, estado, id], (err, results) => {
        err
        ? res.json({err: err})
        : res.json({
            mensaje: "Usuario actualizado!"
        })
    })
})

app.patch("/usuarios/:id", (req, res) => {
    const id = req.params.id

    const campos = req.body

    const keys = Object.keys(campos)

    const query = `UPDATE usuarios
                   SET ${keys.map(key => `${key} = ?`).join(", ")}
                   WHERE id = ?`
    
    const values = Object.values(campos)

    conexion.query(query, [...values, id], (err, results) => {
        err
        ? res.json({err: err})
        : res.json({
            mensaje: "Usuario actualizado!"
        })
    })
})

app.delete("/usuarios/:id", (req, res) => {
    const id = req.params.id

    const query = `DELETE FROM usuarios
                   WHERE id = ?`

    conexion.query(query, [id], (err, results) => {
        err
        ? res.json({err: err})
        : res.json({
            mensaje: "Usuario eliminado"
        })
    })
})

app.listen(3000, () => {
    console.log("Servidor corriendo")
})