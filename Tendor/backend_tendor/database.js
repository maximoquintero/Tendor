const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "5toCuatrimestre",
    database: "tendor",
});

connection.connect((error) => {
    if (error){
        console.error("Error al conectar la BD", error);
    }else{
        console.log("Conexion exitosa");
    }
});

module.exports = connection;