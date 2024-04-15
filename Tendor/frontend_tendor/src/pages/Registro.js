import React, { useState, useEffect} from "react";
import Fondo from "../img/inicio_sesion_img/fondo_registro.jpg";
import Logo from "../img/Logo.png";
import Axios from "axios";
import { Link } from "react-router-dom";
import BTN_MODE_DARK from "../components/Btn_ModeDark";

export default function Registro() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [medida_lona, setMedida_lona] = useState("");
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
  
  const add = () => {
    Axios.post("http://localhost:3001/usuarios", {
      nombre: nombre,
      correo: correo,
      contraseña: contraseña,
      medida_lona: medida_lona,
    }).then(() => {
      alert("usuario registrado");
    });
  };
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
        <img src={Logo} alt="logo" className="h-24 mx-auto line-block" />
        <div className={`flex flex-col  mt-5 ${darkMode ? "dark" : ""}`}>
          <h2 className={`text-3xl montserrat text-center mb-5 ${
              darkMode ? "dark" : ""
            }`}>Registro</h2>
          <form className="ml-52">

          <p className={`textc ${darkMode ? "dark" : ""}`}>Nombre:</p>
            <input
              type="text"
              className="mt-2 w-[53%] rounded-md bg-gray-100 p-2"
              placeholder="Nombre"
              onChange={(e)=>{setNombre(e.target.value)}}
            ></input>

            <p className={`textc ${darkMode ? "dark" : ""}`}>Correo:</p>
            <input
              type="mail"
              className="mt-2 w-[53%] rounded-md bg-gray-100 p-2"
              placeholder="Correo electronico"
              onChange={(e)=>{setCorreo(e.target.value)}}
            ></input>
          
             
            <p className={`mt-3 textc ${darkMode ? "dark" : ""}`}>Ingresa contraseña:</p>
            <input
              type="password"
              className="mt-2 w-[53%] rounded-md bg-gray-100 p-2"
              placeholder="Contraseña"
              onChange={(e)=>{setContraseña(e.target.value)}}
            ></input>

            <p className={`mt-3 textc ${darkMode ? "dark" : ""}`}>medida de lona:</p>

            <input
              type="number"
              className="mt-2 w-[53%] rounded-md bg-gray-100 p-2"
              placeholder="En metros"
              onChange={(e)=>{setMedida_lona(e.target.value)}}
            ></input>
            <Link to={'/'}>
            <button className={`flex bg-[#4d4cfd] ml-10 text-white py-2 px-10 rounded-md mt-8 mx-auto ${
                darkMode ? "dark" : ""
              }`} onClick={add}>
              Ingresar
            </button>
            </Link>
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
    
  );
}
