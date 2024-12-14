import { Toaster } from "@/components/ui/toaster";
import { AuthRouteLayoutProps } from "@/types";
import React from "react";

const AuthRouteLayout = ({ children }: AuthRouteLayoutProps) => {
  return (
    <main className="flex justify-center items-center min-h-screen">
      {children}
      <Toaster />
    </main>
  );
};

export default AuthRouteLayout;
