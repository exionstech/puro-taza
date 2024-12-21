import Logo from "./logo";
import SearchItem from "@/components/shared/navbar/search-item";
import AddressDropdown from "./navbar/address-dropdown";
import LoginOrAccount from "./navbar/login-or-account";

const Navbar = () => {
  return (
    <div className="fixed right-0 left-0 top-0 w-full shadow-md z-50 bg-white md:flex hidden">
      <div className="w-full max-w-screen-2xl px-8 2xl:px-12 items-center flex backdrop-blur-md mx-auto">
        <div className="w-[10%] py-3 items-center flex border-r-[1px] border-gray-200">
          <Logo height={90} width={90} />
        </div>
        <div className="w-[65%] items-center flex gap-10 px-5">
          <AddressDropdown />
          <SearchItem />
        </div>
        <div className="w-[25%] flex items-center">
          <LoginOrAccount/>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
