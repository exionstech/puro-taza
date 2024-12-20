import React from 'react'
import Logo from './logo'
import UserMobileNav from './user-mobile-nav'

const MobileNav = () => {
  return (
    <nav className='fixed right-0 left-0 top-0 w-full mx-auto flex items-center justify-between shadow-sm z-50 bg-white px-5 md:hidden'>
        <div className="border-r-[1px] border-gray-200 py-3">
        <Logo height={90} width={90}/>
        </div>
        <div className="">
            <UserMobileNav/>
        </div>
    </nav>
  )
}

export default MobileNav
