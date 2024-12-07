import Logo from './logo';
import AddressDialog from '@/app/(routes)/(public)/_components/sub-components/hero/address-dialog';
import SearchItem from '@/app/(routes)/(public)/_components/sub-components/hero/search-item';
import { UserNav } from './user-nav';

const user = {
  name: 'Suman Mandal',
  username: 'sumanmandal',
  email: "suman9732@gmail.com",
  image: "",
  role: "ADMIN"
}

const Navbar = () => {
  return (
    <div className='fixed right-0 left-0 top-0 w-full max-w-screen-2xl px-6 items-center border-b-[1px] border-gray-300 md:flex hidden backdrop-blur-md'>
      <div className="w-[10%] py-3 items-center flex border-r-[1px] border-gray-300">
        <Logo height={90} width={90}/>
      </div>
      <div className="w-[65%] items-center flex gap-10 px-5">
        <AddressDialog/>
        <SearchItem/>
      </div>
      <div className="w-[25%] items-center flex gap-10 px-5">
        <UserNav user={user}/>
      </div>
    </div>
  )
}

export default Navbar;
