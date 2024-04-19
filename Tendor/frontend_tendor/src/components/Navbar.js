import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../img/Logo.png';

function Navbar() { 
  const objetoString = localStorage.getItem('id_usuario');
  const objeto = JSON.parse(objetoString);

  const [darkMode, setDarkMode] = useState(getInitialMode());

  // Función para obtener el modo oscuro desde el almacenamiento local
  function getInitialMode() {
    const savedMode = JSON.parse(localStorage.getItem('darkMode'));
    return savedMode || false; // Devuelve false si no se encuentra en el almacenamiento local
  }

  // Función para cambiar entre el modo claro y oscuro
  function toggleDarkMode() {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
    window.location.reload();
  }

  // Efecto para aplicar el modo oscuro al cargar la página
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`bg border-[#838383] flex mx-20 gap-10 text-center mt-[2%] px-6 py-4 border rounded-2xl h-24 ${darkMode ? 'dark' : 'border-[#A5A5FD]'}`}>
      <div className='self-center ml-5 w-[80px]'>
        <Link to={`/dashboard/${objeto}`}>
          <img src={Logo} className='h-16 items-center -mt-1 ml-2' alt=''/>
        </Link>
      </div>
      <div className='flex gap-5 ml-0 text-center text-[#858585] pt-4 start-0 text-xl'>
        <Link to={`/dashboard/${objeto}`}>
          <h1 className={`hover:text-black ${darkMode ? 'hover:text-white' : ''}`}>Dashboard</h1>
        </Link>
        <Link to={`/historial/${objeto}`}>
          <h1 className={`hover:text-black w-[200px] ${darkMode ? 'hover:text-white' : ''}`}>Historial de carga</h1>
        </Link>
      </div>
      <div className='flex gap-4 ml-[50%] mr-0 pt-4 px-2'>
        <Link to='/'>
          <button className='items-center pt-1'>
            <box-icon name='exit' color='#858585'></box-icon>            
          </button> 
        </Link>       
        <button className='items-center -pt-1 -mt-2' onClick={toggleDarkMode}>
          {darkMode ?  <box-icon name='sun' type='solid' color='#858585'></box-icon> : <box-icon name='moon' type='solid' color='#858585'></box-icon>}
        </button>
      </div>
    </div>
  );
}

export default Navbar;
