const { json, request, response } = require("express");
const connection = require("../database");

function crearDatoHumedad(request, response) {
  const { sensor_temperatura, sensor_humedad, usuario_id} = request.body;
  connection.query(
    'INSERT INTO ctrl_sensor (sensor_temperatura, sensor_humedad, usuario_id) VALUES (?, ?, ?)',
    [sensor_temperatura, sensor_humedad, usuario_id],
    (error, results) => {
      if (error) {
        console.error("Error al agregar datos", error);
        response.status(500).json({ error: "Error al agregar datos" });
      } else {
        response.json({ message: "datos agregados" });
      }
    }
  );
}

function verDatoHumedad(request, response) {
  connection.query(`SELECT * FROM ctrl_sensor ORDER BY id_ctrl_sensor DESC LIMIT 10`, (error, results) => {
    if (error) {
      console.error("Error al obtener los datos:", error);
      response.status(500).json({ error: "Error al obtener los datos" });
    } else {
      response.status(200).json(results);
    }
  });
}

function verDatoHumedadId(request, response) {
  const lectura = request.params.id;

  connection.query(
    `SELECT * FROM ctrl_sensor WHERE id_ctrl_sensor = ?;`,
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

const editarDatoHumedadId = (req, res) => {
  const id = req.params.id_lectura_sensor;
  const { sensor_temperatura, sensor_humedad, usuario_id } = req.body;

  connection.query(
    'UPDATE ctrl_sensor SET sensor_temperatura = ?, sensor_humedad = ?, usuario_id = ?  WHERE id_ctrl_sensor = ?',
    [sensor_temperatura, sensor_humedad, usuario_id, id],
    (error, results) => {
      if (error) {
        res.status(500).json({ error: "Ocurrio un error al actualizar la flor" });
      } else {
        res.status(200).json({ message: "La flor fue actualizado correctamente" });
      }
    }
  );
};

const eliminarDatoHumedad = (req,res) => {
  const lectura_sensor = req.params.id;

  connection.query('DELETE FROM ctrl_sensor WHERE id_ctrl_sensor = ?',[lectura_sensor],(error) => {
      console.error("Error".error);
      if (error){
          console.error("Error al eliminar el dato",error);
          res.status(500).json({error :"Ocurrio un error al eliminar el dato"});
      }else{
          res.json({message:"El dato fue elimanado correctamente"});
      }
  });
}




module.exports = {
  crearDatoHumedad,
  verDatoHumedad,
  verDatoHumedadId,
  editarDatoHumedadId,
  eliminarDatoHumedad
};