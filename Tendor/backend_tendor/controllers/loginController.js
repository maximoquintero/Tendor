const connection = require('../database');

function Login(request, response) {
    const correo = request.body.correo;
    const contraseña = request.body.contraseña;

    connection.query(
        `SELECT id_usuario FROM usuarios WHERE correo=? AND contraseña=?`,
        [correo, contraseña],
        (error, result) => {
            if (error) {
                response.status(500).json({
                    error: "Error en la consulta SQL"
                });
            } else {
                if (result.length === 0) {
                    response.status(200).json({
                        respuesta: "No se encontró el usuario",
                        length: result.length,
                        status: false,
                    });
                } else {
                    const id_usuario = result[0].id_usuario;
                    response.status(200).json({
                        respuesta: {
                            id_usuario: id_usuario,
                            data: result,
                        },
                        length: result.length,
                        status: true,
                    });
                }
            }
        }
    );
}

module.exports = {
    Login
};
