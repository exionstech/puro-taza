"use client";
import Link from "next/link";
import {
  Cog,
  LayoutDashboard,
  LogIn,
  LogOut,
  LogOutIcon,
  ShoppingBasket,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
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

interface UserNavProps {
  user: any;
}

export function UserNav({ user }: UserNavProps) {
  const { logout, isLoggedIn } = useAuth();
  return (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild className="hidden lg:flex">
              <Button
                variant="ghost"
                className="relative h-12 w-12 rounded-full"
              >
                <Avatar className="h-12 w-12 border">
                  <AvatarImage
                    src={user?.image}
                    alt={`${user?.username}'s profile image`}
                  />
                  {user?.name && (
                    <AvatarFallback className="bg-transparent h-12 w-12 text-xl">
                      {user?.name[0]}
                    </AvatarFallback>
                  )}
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">Profile</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenuContent className="w-60" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none"> {user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
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
          <Button onClick={logout} variant={"outline"} className="w-full">
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
