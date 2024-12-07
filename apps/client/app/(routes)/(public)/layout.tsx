import Navbar from "@/components/shared/navbar";
import React from "react";

const PublicRouteLayout = ({ children }: PublicRouteLayoutProps) => {
  return (
  <main className="flex flex-col items-center scroll-smooth min-h-screen">
    <Navbar/>
    <div className="mt-14">
    {children}
    </div>
  </main>
  );
};

export default PublicRouteLayout;
