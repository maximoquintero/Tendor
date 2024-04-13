const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "mysql-maxquin.alwaysdata.net",
    user: "maxquin",
    password: "HolaMundo23",
    database: "maxquin_tendor",
});

connection.connect((error) => {
    if (error){
        console.error("Error al conectar la BD", error);
    }else{
        console.log("Conexion exitosa");
    }
});

module.exports = connection;