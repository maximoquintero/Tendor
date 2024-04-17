import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Tupla from "../components/Tupla";
import axios from "axios";

export default function Historial() {
  const [registros, setRegistros] = useState("");
  const objetoString = localStorage.getItem("id_usuario");
  const objeto = JSON.parse(objetoString);
  const [comentario, setComentario] = useState("");
  const [darkMode] = useState(getInitialMode());
  const [hora_inicio, setHora_inicio] = useState("");

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

  const crearRegistro = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/registros", {
        usuario_id: objeto,
        comentario: comentario,
        hora_inicio: hora_inicio,
      });
      if (response.data) {
        window.location.href = `/historial/:objeto`;
        console.log(objeto);
        alert("Carga de ropa registrada correctamente");
      } else {
        console.log("Fallo al agregar la carga de ropa");
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  useEffect(() => {
    async function fetchRegistros() {
      try {
        const response = await axios.get(
          `http://localhost:3001/registros`
        );
        setRegistros(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    }
    fetchRegistros();
  }, []);

  return (
    <div className={`h-full w-full bottom-0`}>
      <Navbar />
      <div className="h-full flex gap-28 mx-20 my-14">
        {/* AGREGAR CARGA */}
        <div
          className={`border p-6 ${
            darkMode
              ? "bg-black text-white border-[#858585]"
              : "bg-white text-black border-[#A5A5FD]"
          }   text-center rounded-xl w-[35%] h-full shadow-xl`}
        >
          <Tupla
            nombre_tupla="Ingresa el tipo de carga"
            dato="text"
            descripcion="ej. Color, Blanca, Ropa Interior"
            value={comentario}
            onChange={(e) => {
              setComentario(e.target.value);
            }}
          />
          <Tupla
            nombre_tupla="Ingresa a que hora lo tendiste"
            dato="time"
            descripcion="La hora en la que la tendiste"
            value={hora_inicio}
            onChange={(e) => {
              setHora_inicio(e.target.value);
            }}
          />

          <button
            className={`border-[2px] rounded-2xl w-[50%] h-4 py-4 
          ${
            darkMode
              ? "border-[#858585] bg-[#1F1F1F] dark:border-[#858585] dark:text-white dark:bg-[#1F1F1F]"
              : "border-[#A5A5FD] bg-gray-50 text-black"
          }`}
            onClick={crearRegistro}
            type="submit"
          >
            <div className="-mt-[13.5px]">Agregar</div>
          </button>
        </div>
        <div
          className={`border p-6 ${
            darkMode
              ? "bg-black text-white border-[#858585]"
              : "bg-white text-black border-[#A5A5FD]"
          }  text-center rounded-xl w-[60%] h-full right-0 shadow-xl`}
        >
          <h1 className="p-2 pt-0 font-semibold">Historial de cargas</h1>
          <table
            className={`w-full table-auto ${
              !darkMode ? "bg-[#A5A5FD] " : "bg-[#565353]"
            }  dark:border-[#858585]  text-black dark:text-white rounded-t-lg ${
              darkMode ? "dark:bg-[#1F1F1F] dark:text-white" : ""
            }`}
          >
            <thead className="text-center text-white">
              <tr>
                <th className="p-2">ID</th>
                <th className="p-2">Carga</th>
                <th className="p-2">Hora de inicio</th>
                <th className="p-2">Terminado</th>
              </tr>
            </thead>
            <tbody
              className={`text-center overflow-auto  border rounded-b-xl ${
                !darkMode
                  ? "bg-[#EEF1F9] border-[#A5A5FD]"
                  : "bg-[#858585] border-[#555353] text-white"
              }`}
            >
              {Array.isArray(registros) &&
                registros.map((registro) => (
                  <tr key={registro.id}>
                    <td className="py-4">{registro.id}</td>
                    <td>{registro.comentario}</td>
                    <td>{registro.hora_inicio}</td>
                    <td>{registro.hora_final}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
