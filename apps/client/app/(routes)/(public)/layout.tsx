import MobileNav from "@/components/shared/mobile-nav";
import Navbar from "@/components/shared/navbar";
import React from "react";

const PublicRouteLayout = ({ children }: PublicRouteLayoutProps) => {
  return (
  <main className="scroll-smooth min-h-screen">
    <Navbar/>
    <MobileNav/>
    <div className="mt-14 pb-10">
    {children}
    </div>
  </main>
  );
};

export default PublicRouteLayout;
