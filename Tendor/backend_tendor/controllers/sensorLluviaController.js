const { json, request, response } = require("express");
const connection = require("../database");

function verDatoLluvia(request, response) {
    connection.query(`SELECT * FROM ctrl_lluvia ORDER BY id_ctrl_lluvia DESC LIMIT 10`, (error, results) => {
      if (error) {
        console.error("Error al obtener los datos:", error);
        response.status(500).json({ error: "Error al obtener los datos" });
      } else {
        response.status(200).json(results);
      }
    });
  }
  
  function verDatoLluviaId(request, response) {
    const lectura = request.params.id;
  
    connection.query(
      `SELECT * FROM ctrl_lluvia WHERE id_ctrl_lluvia = ?;`,
      [lectura],
      (error, results) => {
        if (error) {
          console.error("Error al obtener el dato:", error);
          response.status(500).json({ error: "Error al obtener el dato:" });
        } else {
          response.status(200).json(results);
        }
      }
    );
  }

module.exports ={
    verDatoLluvia,
    verDatoLluviaId
}