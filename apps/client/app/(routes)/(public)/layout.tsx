import Navbar from "@/components/shared/navbar";
import React from "react";

const PublicRouteLayout = ({ children }: PublicRouteLayoutProps) => {
  return (
  <main className="flex flex-col items-center scroll-smooth min-h-screen">
    <div className="">
    <Navbar/>
    </div>
    {children}
  </main>
  );
};

export default PublicRouteLayout;
