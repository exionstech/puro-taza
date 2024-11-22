"use client";

import { todayDate } from "@/lib/utils";
import { UserButton, useUser } from "@clerk/nextjs";
import React from "react";

const Header = () => {
  const { user } = useUser();
  const date = todayDate();

  if (!user) return null;

  return (
    <div className="flex justify-between border-b border-gray-300 px-5 py-3">
      <div>
        <h1 className="text-xl font-semibold">Hey, {user.firstName}!</h1>
        <p className="text-sm font-normal text-gray-500">{date}</p>
      </div>
      <UserButton />
    </div>
  );
};

export default Header;
