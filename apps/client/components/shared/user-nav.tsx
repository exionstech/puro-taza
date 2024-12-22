"use client";
import Link from "next/link";
import {
  Heart,
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
import { FiShoppingCart } from "react-icons/fi";

export function UserNav() {
  const { logout, isLoggedIn } = useAuth();
  const { user } = useAuth();

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
          <DropdownIcon size={3} className="ml-1" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-60" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none"> {user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.phone}
            </p>
          </div>
        </DropdownMenuLabel>
        {user ? <DropdownMenuSeparator /> : null}
        <DropdownMenuGroup>
          <DropdownMenuItem className="hover:cursor-pointer" asChild>
            <Link href="/category" className="flex items-center">
              <FiShoppingCart className="w-4 h-4 mr-3 text-muted-foreground" />
              Categories
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="hover:cursor-pointer" asChild>
            <Link href="/wishlist" className="flex items-center">
              <Heart className="w-4 h-4 mr-3 text-muted-foreground" />
              Wishlist
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
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
            <LogOutIcon />
            Log Out
          </Button>
        ) : (
          <Link href="/sign-in">
            <Button variant={"outline"} className="w-full">
              <LogIn />
              Sign In
            </Button>
          </Link>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
