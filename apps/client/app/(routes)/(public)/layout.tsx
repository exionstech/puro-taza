import MobileNav from "@/components/shared/mobile-nav";
import Navbar from "@/components/shared/navbar";
import React from "react";
import FooterSection from "./_components/footer";
import Copyright from "./_components/copy-right";
import { PublicRouteLayoutProps } from "@/types";
import { Toaster } from "@/components/ui/toaster";

const PublicRouteLayout = ({ children }: PublicRouteLayoutProps) => {
  return (
  <main className="scroll-smooth min-h-screen">
    <Toaster />
    <Navbar/>
    <MobileNav/>
    <div className="mt-14 pb-5">
    {children}
    <FooterSection/>
    <Copyright/>
    </div>
  </main>
  );
};

export default PublicRouteLayout;
