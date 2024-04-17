import React from "react";
import Fondo from "../img/inicio_sesion_img/fondo_registro.jpg";
import Logo from "../img/Logo.png";
import BTN_MODE_DARK from "../components/Btn_ModeDark";
import { useEffect, useState } from "react";
import Axios from 'axios';

export default function Login() {
  const [darkMode, setDarkMode] = useState(getInitialMode());
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("")

  // Función para obtener el modo oscuro desde el almacenamiento local
  function getInitialMode() {
    const savedMode = JSON.parse(localStorage.getItem("darkMode"));
    return savedMode || false; // Devuelve false si no se encuentra en el almacenamiento local
  }

  useEffect(()=>{
    localStorage.clear();
  },[])

  // Efecto para aplicar el modo oscuro al cargar la página
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  const Login = async (e) => {
    e.preventDefault();
    const response = await Axios.post('http://localhost:3001/login', {
      correo: correo,
      contraseña: contraseña
    });
    if (response.data.status) {
      // Guardar el id_usuario en el localStorage
      const id_usuario = response.data.respuesta.id_usuario;
      localStorage.setItem('id_usuario', id_usuario);
      // Redirigir al dashboard
      window.location.href = `/dashboard/${id_usuario}`;
    } else {
      setCorreo("");
      setContraseña("");
      alert("Prueba con otro correo o contraseña");
    }
  }  
  
  return (
    <>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@1,226&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap')
      </style>
      <div
        className={`absolute h-full w-6/12 justify-center items-center ${
          darkMode ? "dark" : ""
        }`}
      >
        <BTN_MODE_DARK />
        <img
          src={Logo}
          alt="logo"
          className={`line-block mx-auto h-24  `}
        />
        <div className={`flex flex-col  mt-8 ${darkMode ? "dark" : ""}`}>
          <h2
            className={`text-3xl montserrat text-center mb-5 ${
              darkMode ? "dark" : ""
            }`}
          >
            Inicar sesión
          </h2>
          <form className="ml-52">
            <p className={`textc ${darkMode ? "dark" : ""}`}>Correo:</p>
            <input
              type="mail"
              className="mt-2 w-[53%] rounded-md border-3 border-[#3c3cffd7]  bg-gray-100 p-2"
              placeholder="Correo electronico"
              value={correo}
              onChange={(e)=>{setCorreo(e.target.value)}}
            />

            <p className={`mt-8 textc ${darkMode ? "dark" : ""}`}>
              Contraseña:
            </p>
            <input
              type="password"
              className="mt-2 w-[53%]  border-3 border-[#3c3cffd7] rounded-md bg-gray-100 p-2"
              placeholder="Contraseña"
              value={contraseña}
              onChange={(e)=>{setContraseña(e.target.value)}}
            />

            <p
              className={`mt-1 text-xs text-[#4D4CFD] ${
                darkMode ? "dark" : ""
              }`}
            >
              ¿Olvidaste tu contraseña?:
            </p>

            <p
              className={`text-xs mt-4 ml-14 ${
                darkMode ? "text-white" : "text-[#4D4CFD]"
              }`}
            >
              ¿Eres nuevo?{" "}
              <a
                className={`ml-1 ${darkMode ? "text-white" : "text-[#4D4CFD]"}`}
                href="/registro"
              >
                Registrate
              </a>
            </p>

            <button
              className={`bg-[#4d4cfd] ml-14 text-white py-2 px-10 rounded-md mt-8 mx-auto ${
                darkMode ? "dark" : ""
              }`}
              onClick={Login}
            >
              Iniciar
            </button>
          </form>
        </div>
      </div>
      <div
        className="flex ml-[50%] h-screen"
        style={{
          backgroundImage: `url(${Fondo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
    </>
  );
}