import React from 'react'
import Navbar from '../components/Navbar'
import Tupla from '../components/Tupla'

export default function Historial() {
  return (
    
    <div className='bg-[#EEF1F9] dark:bg-[#1F1F1F] h-full w-full p-1 bottom-0'>
      <div children='h-full'>
      <Navbar/>
      <div className='h-full flex gap-28  mx-20 my-14 '>
      <div className='border p-6 bg-[#ffffff] border-[#A5A5FD] dark:border-[#858585] dark:bg-black text-black text-center dark:text-white rounded-xl w-[35%] h-full shadow-xl'>
     <Tupla
     nombre_tupla='Ingresa el tipo de carga'
     descripcion='ej. Color, Blanca, Ropa Interior'/>
     <Tupla
     nombre_tupla='Ingresa a que hora lo tendiste'
     dato='time'
     descripcion=''/>
     <button className='border-[2px] rounded-2xl border-[#A5A5FD] w-[50%] h-4 py-4 bg-gray-50 dark:bg-[#1F1F1F] dark:border-[#858585]'>
      <div className='-mt-[13.5px]'>Agregar</div>
     </button>
      </div>
      <div className='border p-6 bg-[#ffffff] border-[#A5A5FD] dark:border-[#858585] dark:bg-black text-black dark:text-white text-center rounded-xl w-[60%] h-full right-0 shadow-xl'>
      <h1 className='p-2 pt-0 font-semibold'> Historial de cargas </h1>
      <table className="w-full table-auto bg-[#A5A5FD] border-[#A5A5FD] dark:border-[#858585] dark:bg-[#1F1F1F] text-black dark:text-white rounded-t-lg">
          <thead className="text-center text-white   ">
            <tr>
              <th className="p-2">ID</th>
              <th className="p-2">Carga</th>
              <th className="p-2">Hora de inicio</th>
              <th className="p-2">Terminado</th>
            </tr>
          </thead>
          <tbody className="text-center overflow-auto rounded-xl bg-white  dark:bg-[#858585]">
              <tr key='carga.id'>
                <td className='py-4'> 1 </td>
                <td> Carga Blanca </td>
                <td> 10:00 </td>
                <td>  14:00 </td>
              </tr>
              <tr key='carga.id'>
                <td className='py-4'> 2 </td>
                <td> Carga negra de abajo </td>
                <td> 12:00 </td>
                <td>  13:00 </td>
              </tr>
              <tr key='carga.id'>
                <td className='py-4'> 3 </td>
                <td> Carga Ropa Interior </td>
                <td> 10:00 </td>
                <td>  No </td>
              </tr>
              <tr key='carga.id'>
                <td className='py-4'>  4 </td>
                <td> Carga Cobijas </td>
                <td> 5:00 </td>
                <td>  8:00 </td>
              </tr>
              <tr key='carga.id'>
                <td className='py-4'> 5 </td>
                <td> Carga Color </td>
                <td> 17:00 </td>
                <td>  20:00 </td>
              </tr>
              <tr key='carga.id'>
                <td className='py-4'> 6 </td>
                <td> Carga Blanca </td>
                <td> 4:00 </td>
                <td>  No </td>
              </tr>
              <tr key='carga.id'>
                <td className='py-4'> 7 </td>
                <td> Carga Ropa </td>
                <td> 4:00 </td>
                <td>  6:00 </td>
              </tr>
          </tbody>
        </table></div>
      </div>
      </div>
    </div>
    
  )
}
