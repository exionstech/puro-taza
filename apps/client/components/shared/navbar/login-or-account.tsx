"use client";

import { useAuth } from "@/hooks/use-auth";
import { UserNav } from "../user-nav";
import CartItem from "./cart-item";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import Link from "next/link";

const LoginOrAccount = () => {
  const { isLoggedIn } = useAuth();
  return (
    <div className="w-full items-center flex justify-end gap-8 px-5">
      {isLoggedIn ? (
        <>
          <UserNav />
          <CartItem />
        </>
      ) : (
        <>
          <Link href="/sign-in">
            <Button className="w-full">
              <LogIn />
              Sign In
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button className="w-full">
              <LogIn />
              Sign Up
            </Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default LoginOrAccount;
