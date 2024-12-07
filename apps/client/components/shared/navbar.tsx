import React from 'react'
import Logo from './logo';

const Navbar = () => {
  return (
    <div className='fixed right-0 left-0 top-0 w-full max-w-screen-2xl px-6 items-center border-b-[1px] border-gray-300 md:flex hidden backdrop-blur-md'>
      <div className="w-[10%] py-3 items-center flex border-r-[1px] border-gray-300">
        <Logo height={90} width={90}/>
      </div>
      <div className="w-[70%] items-center flex">

      </div>
      <div className="w-[20%] items-center flex"></div>
    </div>
  )
}

export default Navbar;
