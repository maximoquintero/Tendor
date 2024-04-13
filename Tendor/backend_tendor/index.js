// ! dependencias
const express = require("express");
const cors = require("cors");

const usuariosRouter = require('./router/usuariosRouter');
const registrosRouter = require('./router/registrosRouter');


//* app va a tener todos los atributos y metodos de express
const app = express();

app.use(cors());
app.use(express.json());

// Ruta al router"
app.use("/usuarios", usuariosRouter);
app.use("/registros", registrosRouter);

app.get("/",(req,res) => {
    res.send("<h1> Hola mundo </h1>");
});



app.listen(3001,() => {
    console.log("Api escuchando por el puerto 3001");
});