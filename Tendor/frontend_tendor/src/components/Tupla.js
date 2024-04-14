import React from 'react';

function Tupla({ nombre_tupla, dato, value, change, descripcion, darkMode }) {
  return (
    <>
      <div className='pb-4'>
        <label className={`font-bold ${darkMode ? 'text-white' : 'text-black'} ml-1 flex`} htmlFor={nombre_tupla}>
          {nombre_tupla}
        </label>
        <input
          id={nombre_tupla}
          type={dato}
          value={value}
          onChange={change}
          className={`mt-2 h-8 block w-full border-[2px] rounded-2xl border-${darkMode ? '[#858585]' : '[#A5A5FD]'} dark:border-[#858585] p-3 ${darkMode ? 'bg-[#858585] text-white' : 'bg-gray-50 text-black'}`}
          placeholder={descripcion}
          name={nombre_tupla}
          style={{ backgroundColor: darkMode ? '#000' : 'transparent' }}
        />
      </div>
    </>
  );
}

export default Tupla;
