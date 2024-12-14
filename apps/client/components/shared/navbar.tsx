import Logo from './logo';
import SearchItem from '@/components/shared/navbar/search-item';
import { UserNav } from './user-nav';
import CartItem from '@/components/shared/navbar/cart-item';
import UserMobileNav from './user-mobile-nav';
import AddressDropdown from './navbar/address-dropdown';

const user = {
  name: 'Suman Mandal',
  username: 'sumanmandal',
  email: "suman9732@gmail.com",
  image: "",
  role: "ADMIN",
  contact: "9876543210"
}

const Navbar = () => {
  return (
    <div className="fixed right-0 left-0 top-0 w-full shadow-md z-10 bg-white">
      <div className='w-full max-w-screen-2xl px-8 2xl:px-12 items-center md:flex hidden backdrop-blur-md mx-auto'>
      <div className="w-[10%] py-3 items-center flex border-r-[1px] border-gray-200">
        <Logo height={90} width={90}/>
      </div>
      <div className="w-[65%] items-center flex gap-10 px-5">
        <AddressDropdown/>
        <SearchItem/>
      </div>
      <div className="w-[25%] items-center lg:flex justify-end gap-8 px-5 hidden">
        <UserNav user={user}/>
        <CartItem/>
      </div>
      <div className="w-[25%] flex items-center justify-end lg:hidden">
        <UserMobileNav/>
      </div>
    </div>
    </div>
  )
}

export default Navbar;
