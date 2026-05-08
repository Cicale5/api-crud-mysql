CREATE DATABASE prueba;

USE prueba;

CREATE TABLE usuarios(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    edad INT,
    estado BOOLEAN
);