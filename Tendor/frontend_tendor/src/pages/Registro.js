import React, { useState } from "react";
import Fondo from "../img/inicio_sesion_img/fondo_registro.jpg";
import Logo from "../img/Logo.png";
import Axios from "axios";
import { Link } from "react-router-dom";

export default function Registro() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [medida_lona, setMedida_lona] = useState("");

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
      <div className="absolute right-0 items-center justify-center w-6/12 h-full bg-white border rounded-l-3xl">
        <img src={Logo} alt="logo" className="h-24 mx-auto mt-8 line-block" />
        <div className="flex flex-col mt-8">
          <h2 className="mb-5 text-3xl text-center">Registro</h2>
          <form className="ml-52">
            <p>Nombre:</p>
            <input
              className="mt-2 w-[53%] rounded-md bg-gray-100 p-2"
              placeholder="Nombre"
              type="text"
              onChange={(event) => {
                setNombre(event.target.value);
              }}
            ></input>

            <p className="mt-5">Correo:</p>
            <input
              className="mt-2 w-[53%] rounded-md bg-gray-100 p-2"
              placeholder="Correo"
              type="email"
              onChange={(event) => {
                setCorreo(event.target.value);
              }}
            ></input>

            <p className="mt-5">Contraseña:</p>

            <input
              className="mt-2 w-[53%] rounded-md bg-gray-100 p-2"
              placeholder="Contraseña"
              type="password"
              onChange={(event) => {
                setContraseña(event.target.value);
              }}
            ></input>

            <p className="mt-5">Mdida de lona:</p>

            <input
              className="mt-2 w-[53%] rounded-md bg-gray-100 p-2"
              placeholder="En metros"
              type="number"
              onChange={(event) => {
                setMedida_lona(event.target.value);
              }}
            ></input>

            {/* <p className="mt-4 text-xs ml-14">
              
            </p> */}
            <Link to={"/"}>
              <button
                className="flex bg-[#4d4cfd] ml-14 text-white py-2 px-10 rounded-md mt-8 mx-auto"
                onClick={add}
              >
                Ingresar
              </button>
            </Link>
          </form>
        </div>
      </div>
      <div
        className="flex mr-[35%] h-screen"
        style={{
          backgroundImage: `url(${Fondo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
    </>
  );
}
