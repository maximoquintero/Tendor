const { json } = require("express");
const connection = require("../database");

// Funciones para registros
const obtenerRegistros = (req,res) => {
    connection.query("SELECT * FROM registros",(error,results) => {
        if (error){
            console.error("Error al obtener los registros",error);
            res.status(500).json({
                error: "Error al obtener registros",
            })
        }else {
            res.json(results);
        }
    });
};

const obtenerRegistrosPorId = (req,res) => {
    const id = req.params.objeto;

    connection.query('SELECT * FROM registros WHERE id_registro = ?',[id],(error,results) => {
        if (error){
            console.error("Error al obtener el registro",error);
            res.status(500).json({error :"Ocurrio un error al obtener el registro"});
        }else if(results.length === 0){
            res.status(500).json({error: "El usuario no fue encontranda"});
        }else{
            res.json(results[0]);
        }
    });
}

const crearRegistros = (req, res) => {
    const { comentario, hora_inicio, hora_final, usuario_id } = req.body;
    connection.query("INSERT INTO registros (comentario, hora_inicio, hora_final, usuario_id) VALUES (?,?,?,?)",
        [comentario, hora_inicio, hora_final, usuario_id], (error, results) => {
            if (error) {
                console.error("Error al agregar el registro", error);
                res.status(500).json({ error: "Error al agregar el registro" });
            } else {
                res.json({ message: "Registro agregado" });
            }
        });
};

const actualizarRegistrosPorId = (req, res) => {
    const id = req.params.id_registro;
    const { comentario, hora_inicio, hora_final, usuario_id } = req.body;
    connection.query('UPDATE usuarios SET comentario = ?, hora_inicio = ?, hora_final = ? WHERE id_registro = ?',
        [comentario, hora_inicio, hora_final,  id], (error, results) => {
            console.error("Error al actualizar el usuario", error); // Movido dentro de la condición if
            if (error) {
                res.status(500).json({ error: "Ocurrió un error al actualizar el usuario" });
            } else {
                res.json({ message: "El usuario fue actualizado correctamente" });
            }
        });
};

const actualizarHoraPorId = (req, res) => {
    const id = req.params.id_registro; // Obtener el id_registro de los parámetros de la solicitud
    connection.query('CALL actualizar_hora(?)', [id], (error, results) => {
        if (error) {
            console.error("Error al actualizar el usuario", error); // Registrar el error en caso de que ocurra
            res.status(500).json({ error: "Ocurrió un error al actualizar la hora" }); // Responder con un error 500 si hay un error
        } else {
            res.json({ message: "La hora fue actualizado correctamente" }); // Responder con un mensaje de éxito si la actualización fue exitosa
        }
    });
};


// const eliminarRegistrosPorId = (req, res) => {
//     const id = req.params.id_usuario;

//     connection.query('DELETE FROM usuarios WHERE id_usuario = ?', [id], (error, results) => {
//         console.error("Error al eliminar el usuario", error); // Movido dentro de la condición if
//         if (error) {
//             res.status(500).json({ error: "Ocurrió un error al eliminar el usuario" });
//         } else {
//             res.json({ message: "El usuario fue eliminado correctamente" });
//         }
//     });
// };

module.exports = {
    obtenerRegistros,
    obtenerRegistrosPorId,
    crearRegistros,
    // eliminarRegistrosPorId,
    actualizarRegistrosPorId,
    actualizarHoraPorId,
};
