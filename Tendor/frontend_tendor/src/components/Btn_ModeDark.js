import React from "react";
import { useEffect, useState } from "react";

function Btn_ModeDark() {
  const [darkMode, setDarkMode] = useState(getInitialMode());

  // Función para obtener el modo oscuro desde el almacenamiento local
  function getInitialMode() {
    const savedMode = JSON.parse(localStorage.getItem("darkMode"));
    return savedMode || false; // Devuelve false si no se encuentra en el almacenamiento local
  }

  // Función para cambiar entre el modo claro y oscuro
  function toggleDarkMode() {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", JSON.stringify(newMode));
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
    <button onClick={toggleDarkMode} className={` ml-10 mt-10 rounded-[100%] ${darkMode ? 'dark' : ''}`}>
          {darkMode ?  <box-icon name='sun' type='solid' color='#858585'></box-icon> : <box-icon name='moon' type='solid' color='#858585'></box-icon>}
    </button>
    </>
  )
}

export default Btn_ModeDark;
