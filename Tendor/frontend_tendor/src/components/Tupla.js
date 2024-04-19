import React from 'react';

function Tupla({ nombre_tupla, dato, value, onChange, descripcion, darkMode }) {
  return (
    <>
      <div className='pb-4'>
        <label className={`font-bold ${!darkMode ? 'textc' : ''} ml-1 flex`} htmlFor={nombre_tupla}>
          {nombre_tupla}
        </label>
        <input
          id={nombre_tupla}
          type={dato}
          value={value}
          onChange={onChange}
          className={`mt-2 h-8 block w-full  rounded-xl p-3 ${!darkMode ? 'textc border-[#A5A5FD] border-2' : 'bg-[#1F1F1F] border-[#838383] '}`}
          placeholder={descripcion}
          name={nombre_tupla}
          style={{ backgroundColor: darkMode ? '#000 border border-[#838383] ' : 'transparent  ' }}
        />
        
      </div>
    </>
  );
}

export default Tupla;
