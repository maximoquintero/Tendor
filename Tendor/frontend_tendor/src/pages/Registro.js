import React from 'react'
import Fondo from "../img/inicio_sesion_img/fondo_registro.jpg";
import Logo from "../img/Logo.png";

export default function Registro() {
  return (

    <>
    <div className="absolute h-full w-6/12 right-0 border rounded-l-3xl bg-white justify-center items-center">
        <img src={Logo} alt="logo" className="line-block mx-auto mt-8 h-24" />
        <div className="flex flex-col mt-8">
          <h2 className="text-3xl text-center mb-5">Registro</h2>
          <form className="ml-52">

            <p>Correo:</p>
            <input
              className="mt-2 w-[53%] rounded-md bg-gray-100 p-2"
              placeholder="Correo electronico"
            ></input>
          
             
            <p className="mt-5">Ingresa contraseña:</p>
            <input
              className="mt-2 w-[53%] rounded-md bg-gray-100 p-2"
              placeholder="Contraseña"
            ></input>

            <p className="mt-5">Confirmar contraseña:</p>

            <input
              className="mt-2 w-[53%] rounded-md bg-gray-100 p-2"
              placeholder="Confirmar contraseña"
            ></input>

            
            {/* <p className="text-xs mt-4 ml-14">
              
            </p> */}
            <button className="flex bg-[#4d4cfd] ml-14 text-white py-2 px-10 rounded-md mt-8 mx-auto">
              Ingresar
            </button>
          </form>
        </div>
      </div>
      <div
        className="flex mr-[35%] h-screen"
        style={{
          backgroundImage:  `url(${Fondo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
    </>
    
  )
}