import React from "react";
import ProfileBox from "./ProfileBox";
import { Separator } from "./ui/separator";
import MenuBar from "./MenuBar";

const Sidebar = () => {
  return (
    <div className="sticky top-0 flex flex-col items-center h-[calc(100vh)] max-w-[320px] min-w-[320px] py-10 px-5">
      <ProfileBox />
      <Separator />
      <MenuBar />
    </div>
  );
};

export default Sidebar;
