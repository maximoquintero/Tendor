import React, { useState } from "react";
import Fondo from "../img/inicio_sesion_img/fondo_registro.jpg";
import Logo from "../img/Logo.png"
import Axios from "axios";

export default function Login() {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  
  const Login = async(e) =>{
    e.preventDefault();
    const response = await Axios.post('http://localhost:3001/login',{
      correo: correo,
      contraseña: contraseña
    })
    if (response.data.status){
      window.location.href= "/dashboard"
    }else{
        setCorreo("");
        setContraseña("");
        alert("Prueba con otro correo o contraseña");
    }

  }
  
  return (
    <>
    <div className="absolute items-center justify-center w-6/12 h-full bg-white border rounded-r-3xl">
        <img src={Logo} alt="logo" className="h-24 mx-auto mt-8 line-block" />
        <div className="flex flex-col mt-8">
          <h2 className="mb-8 text-3xl text-center">Inicar sesión</h2>
          <form className="ml-52">
            <p>Correo:</p>
            <input
              type="mail"
              className="mt-2 w-[53%] rounded-md bg-gray-100 p-2"
              placeholder="Correo electronico"
              value={correo}
              onChange={(e)=>{setCorreo(e.target.value)}}
            ></input>
            <p className="mt-10">Contraseña:</p>
            <input
              type="password"
              className="mt-2 w-[53%] rounded-md bg-gray-100 p-2"
              placeholder="Contraseña"
              value={contraseña}
              onChange={(e)=>{setContraseña(e.target.value)}}
            ></input>
            <p className="mt-1 text-xs text-[#4D4CFD]">
              ¿Olvidaste tu contraseña?:
            </p>
            <p className="mt-4 text-xs ml-14">
              ¿Eres nuevo?
              <a className="text-[#4D4CFD] ml-1" href="/registro">
                Registrate
              </a>
            </p>
            <button className="bg-[#4d4cfd] ml-14 text-white py-2 px-10 rounded-md mt-8 mx-auto" onClick={Login}>
              Iniciar
            </button>
          </form>
        </div>
      </div>
      <div
        className="flex ml-[45%] h-screen"
        style={{
          backgroundImage: `url(${Fondo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
    </>
  );
}
