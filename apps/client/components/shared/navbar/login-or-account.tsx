"use client";

import { useAuth } from "@/hooks/use-auth";
import { UserNav } from "../user-nav";
import CartItem from "./cart-item";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

const LoginOrAccount = () => {
  const { isLoggedIn } = useAuth();

    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 200);
  
      return () => clearTimeout(timer);
    }, []);

  if (isLoading) return (
    <div className="w-full items-center flex justify-end gap-5 px-1">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
    </div>
  );

  return (
    <div className="w-full items-center flex justify-end gap-5 px-1">
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
