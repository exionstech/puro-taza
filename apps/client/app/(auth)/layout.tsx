import { Toaster } from "@/components/ui/toaster";
import React from "react";

const AuthRouteLayout = ({ children }: AuthRouteLayoutProps) => {
  return (
    <main className="flex justify-center items-center h-screen bg-black/30">
      {children}
      <Toaster />
    </main>
  );
};

export default AuthRouteLayout;
