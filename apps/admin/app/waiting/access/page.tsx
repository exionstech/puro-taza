import { LucideLoader } from "lucide-react";
import React from "react";

const Page = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <LucideLoader className="w-6 h-6 mr-2 animate-spin" />
      <p className="text-xl font-bold">Waiting for approval</p>
    </div>
  );
};

export default Page;
