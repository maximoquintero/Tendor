import React from 'react'
import Fondo from "../img/inicio_sesion_img/fondo_registro.jpg";
import Logo from "../img/Logo.png";
import BTN_MODE_DARK from "../components/Btn_ModeDark";
import { useEffect, useState } from "react";

export default function Registro() {
  const [darkMode, setDarkMode] = useState(getInitialMode());

  // Función para obtener el modo oscuro desde el almacenamiento local
  function getInitialMode() {
    const savedMode = JSON.parse(localStorage.getItem("darkMode"));
    return savedMode || false; // Devuelve false si no se encuentra en el almacenamiento local
  }

  // Efecto para aplicar el modo oscuro al cargar la página
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);
  return (
    <>
    <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@1,226&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap')
      </style>
    <div className={`absolute h-full w-6/12 right-0 justify-center items-center ${
          darkMode ? "dark" : ""
        }`}>
          <BTN_MODE_DARK />
        <img src={Logo} alt="logo" className="line-block mx-auto h-24" />
        <div className={`flex flex-col  mt-5 ${darkMode ? "dark" : ""}`}>
          <h2 className={`text-3xl montserrat text-center mb-5 ${
              darkMode ? "dark" : ""
            }`}>Registro</h2>
          <form className="ml-52">

            <p className={`textc ${darkMode ? "dark" : ""}`}>Correo:</p>
            <input
              className="mt-2 w-[53%] rounded-md bg-gray-100 p-2"
              placeholder="Correo electronico"
            ></input>
          
             
            <p className={`mt-3 textc ${darkMode ? "dark" : ""}`}>Ingresa contraseña:</p>
            <input
              className="mt-2 w-[53%] rounded-md bg-gray-100 p-2"
              placeholder="Contraseña"
            ></input>

            <p className={`mt-3 textc ${darkMode ? "dark" : ""}`}>Confirmar contraseña:</p>

            <input
              className="mt-2 w-[53%] rounded-md bg-gray-100 p-2"
              placeholder="Confirmar contraseña"
            ></input>
            <button className={`flex bg-[#4d4cfd] ml-10 text-white py-2 px-10 rounded-md mt-8 mx-auto ${
                darkMode ? "dark" : ""
              }`}>
              Ingresar
            </button>
          </form>
        </div>
      </div>
      <div
        className="flex mr-[50%] h-screen"
        style={{
          backgroundImage:  `url(${Fondo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
    </>
    
  )
}