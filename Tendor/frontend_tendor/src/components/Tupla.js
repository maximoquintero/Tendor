import React from 'react'

function Tupla({nombre_tupla, dato, value,change,descripcion}) {
  return (
    <>
      <div className='pb-4'>
      <label className="text-black font-bold dark:text-white ml-1 flex" htmlFor="nombre">
            {nombre_tupla}
          </label>
          <input
            id={nombre_tupla}
            type={dato}
            value={value}
            onChange={change}
            className="mt-2 h-8 block w-full border-[2px] rounded-2xl border-[#A5A5FD] dark:border-[#858585] p-3 bg-gray-50 dark:bg-[#1F1F1F]"
            placeholder={descripcion}
            name={nombre_tupla}
          />
      </div>
    </>
  )
}

export default Tupla;
