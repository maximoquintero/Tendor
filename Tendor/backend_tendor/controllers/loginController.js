const connection = require('../database')

function Login(request, response){
    const correo = request.body.correo;
    const contraseña = request.body.contraseña;

    connection.query(
        `SELECT*FROM usuarios WHERE correo=? AND contraseña=?`,
        [correo, contraseña], (error, result) =>{
            if(result.length == 0){
                response.status(200).json({
                    respuesta:"No se encontro el usuario",
                    length: result.length,
                    status: false,
                });
            }else{
                response.status(200).json({
                    respuesta: result,
                    length: result.length,
                    status: true,
                });
            }
        }
    )
}
module.exports = {
    Login
}