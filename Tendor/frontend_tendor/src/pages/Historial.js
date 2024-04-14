import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Tupla from '../components/Tupla';

export default function Historial() {
  const [darkMode] = useState(getInitialMode());

  // Función para obtener el modo oscuro desde el almacenamiento local
  function getInitialMode() {
    const savedMode = JSON.parse(localStorage.getItem('darkMode'));
    return savedMode || false; // Devuelve false si no se encuentra en el almacenamiento local
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
    <div className={`h-full w-full bottom-0`}>
      <Navbar />
      <div className='h-full flex gap-28 mx-20 my-14'>
        <div className={`border p-6 ${darkMode ? 'bg-black text-white border-[#858585]' : 'bg-white text-black border-[#A5A5FD]'}   text-center rounded-xl w-[35%] h-full shadow-xl`}>
          <Tupla
            nombre_tupla='Ingresa el tipo de carga'
            descripcion='ej. Color, Blanca, Ropa Interior'
          />
          <Tupla
            nombre_tupla='Ingresa a que hora lo tendiste'
            dato='time'
            descripcion=''
          />
          <button className={`border-[2px] rounded-2xl w-[50%] h-4 py-4 ${darkMode ? 'border-[#858585] bg-gray-50 dark:bg-[#1F1F1F] dark:border-[#858585] dark:text-white' : 'border-[#A5A5FD] bg-gray-50 text-black'}`}>
            <div className='-mt-[13.5px]'>Agregar</div>
          </button>
        </div>
        <div className={`border p-6 ${darkMode ? 'bg-black text-white' : 'bg-white text-black'} dark:border-[#858585] text-center rounded-xl w-[60%] h-full right-0 shadow-xl`}>
          <h1 className='p-2 pt-0 font-semibold'>Historial de cargas</h1>
          <table className={`w-full table-auto bg-[#A5A5FD] border-[#A5A5FD] dark:border-[#858585] dark:bg-[#1F1F1F] text-black dark:text-white rounded-t-lg ${darkMode ? 'dark:bg-[#1F1F1F] dark:text-white' : ''}`}>
            <thead className="text-center text-white">
              <tr>
                <th className="p-2">ID</th>
                <th className="p-2">Carga</th>
                <th className="p-2">Hora de inicio</th>
                <th className="p-2">Terminado</th>
              </tr>
            </thead>
            <tbody className={`text-center overflow-auto rounded-xl ${darkMode ? 'bg-[#858585]' : 'bg-white'}`}>
              <tr key='carga.id'>
                <td className='py-4'> 1 </td>
                <td> Carga Blanca </td>
                <td> 10:00 </td>
                <td> 14:00 </td>
              </tr>
              {/* Aquí van más filas de datos */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
