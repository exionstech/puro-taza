"use client";
import Link from "next/link";
import {
  Cog,
  LayoutDashboard,
  LogIn,
  LogOutIcon,
  ShoppingBasket,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/use-auth";
import DropdownIcon from "./dropdown-icon";

interface UserNavProps {
  user: any;
}

export function UserNav({ user }: UserNavProps) {
  const { logout, isLoggedIn } = useAuth();
  const handleLogout = () => {
    logout();
    window.location.reload();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="border-none font-normal text-lg flex items-center dropdown-button"
        >
          Account
          <DropdownIcon size={3} className="ml-1"/>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-60" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none"> {user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.contact}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {user?.role === "ADMIN" && (
            <>
              <DropdownMenuItem className="hover:cursor-pointer" asChild>
                <Link href="" className="flex items-center">
                  <Cog className="w-4 h-4 mr-3 text-muted-foreground" />
                  Admin Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}
          {user?.role === "ADMIN" && (
            <>
              <DropdownMenuItem className="hover:cursor-pointer" asChild>
                <Link href="" target="_blank" className="flex items-center">
                  <LayoutDashboard className="w-4 h-4 mr-3 text-muted-foreground" />
                  Manage Store
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}

          <DropdownMenuItem className="hover:cursor-pointer" asChild>
            <Link href="/orders" className="flex items-center">
              <ShoppingBasket className="w-4 h-4 mr-3 text-muted-foreground" />
              Track Orders
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="hover:cursor-pointer" asChild>
            <Link href="/profile" className="flex items-center">
              <User className="w-4 h-4 mr-3 text-muted-foreground" />
              Profile
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {isLoggedIn ? (
          <Button onClick={handleLogout} variant={"outline"} className="w-full">
            <LogOutIcon/>
            Log Out
            </Button>
        ) : (
          <Link href="/sign-in">
            <Button variant={"outline"} className="w-full">
                <LogIn/>
                Sign In
                </Button>
          </Link>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
