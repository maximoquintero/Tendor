const { json } = require("express");
const connection = require("../database");

// Funciones para usuarios
const obtenerUsuarios = (req,res) => {
    connection.query("SELECT * FROM usuarios",(error,results) => {
        if (error){
            console.error("Error al obtener los usuarios",error);
            res.status(500).json({
                error: "Error al obtener usuarios",
            })
        }else {
            res.json(results);
        }
    });
};

const obtenerUsuariosPorId = (req,res) => {
    const id = req.params.id_usuario;

    connection.query('SELECT * FROM usuarios WHERE id_usuario = ?',[id],(error,results) => {
        if (error){
            console.error("Error al obtener el usuario",error);
            res.status(500).json({error :"Ocurrio un error al obtener el usuario"});
        }else if(results.length === 0){
            res.status(500).json({error: "El usuario no fue encontranda"});
        }else{
            res.json(results[0]);
        }
    });
}

const crearUsuarios = (req, res) => {
    const { nombre, correo, contraseña } = req.body;
    connection.query("INSERT INTO usuarios (nombre, correo, contraseña) VALUES (?,?,?)",
        [nombre, correo, contraseña], (error, results) => {
            if (error) {
                console.error("Error al agregar el usuario", error);
                res.status(500).json({ error: "Error al agregar usuario" });
            } else {
                res.json({ message: "Usuario agregado" });
            }
        });
};

const actualizarUsuariosPorId = (req, res) => {
    const id = req.params.id_usuario;
    const { nombre, correo, contrasena, medida_lona } = req.body;
    connection.query('UPDATE usuarios SET nombre = ?, correo = ?, contrasena = ?, medida_lona = ? WHERE id_usuario = ?',
        [nombre, correo, contrasena, medida_lona, id], (error, results) => {
            console.error("Error al actualizar el usuario", error); // Movido dentro de la condición if
            if (error) {
                res.status(500).json({ error: "Ocurrió un error al actualizar el usuario" });
            } else {
                res.json({ message: "El usuario fue actualizado correctamente" });
            }
        });
};

const eliminarUsuariosPorId = (req, res) => {
    const id = req.params.id_usuario;

    connection.query('DELETE FROM usuarios WHERE id_usuario = ?', [id], (error, results) => {
        console.error("Error al eliminar el usuario", error); // Movido dentro de la condición if
        if (error) {
            res.status(500).json({ error: "Ocurrió un error al eliminar el usuario" });
        } else {
            res.json({ message: "El usuario fue eliminado correctamente" });
        }
    });
};

module.exports = {
    obtenerUsuarios,
    obtenerUsuariosPorId,
    crearUsuarios,
    eliminarUsuariosPorId,
    actualizarUsuariosPorId,
};
