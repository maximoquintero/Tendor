import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link desde 'react-router-dom'
import Logo from '../img/Logo.png';

function Navbar() { // Corrige el nombre del componente a iniciar con mayúscula
    
  return (
    <>
      <div className='bg-white flex border-[#A5A5FD] dark:border-[#858585] mx-20 gap-10 text-center px-6 py-4 dark:bg-black  text-black dark:text-white border-2 rounded-2xl h-24'>
        <div>
          <Link to= "/dashboard">
            <img src={Logo} className='h-16 items-center -mt-1 ml-2' alt=''/>
          </Link>
        </div>
        <div className='flex gap-5 text-center text-[#858585] pt-4 start-0 text-xl '>
          <Link to='/dashboard'>
          <h1 className='hover:text-black dark:hover:text-white'>Dashboard</h1>
          </Link>
          <Link to='/historial'>
          <h1 className='hover:text-black dark:hover:text-white'>Historial de carga</h1>
          </Link>
        </div>
        <div className='flex gap-4 ml-[50%] pt-4 px-2 '>
          <box-icon  name='user-circle' color='#858585' ></box-icon>
          <box-icon name='cog' color='#858585' ></box-icon>
          <box-icon name='exit' color='#858585' ></box-icon>
        </div>
      </div>
    </>
  );
}

export default Navbar;
