"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Heart,
  LogIn,
  LogOut,
  ShoppingBasket,
  User,
  AlignJustify,
  ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { FiShoppingCart } from "react-icons/fi";
import { Separator } from "@/components/ui/separator";

const staticNavs = [
  {
    title: "Categories",
    icon: <FiShoppingCart className="w-5 h-5" />,
    href: "/category",
  },
  {
    title: "Wishlist",
    icon: <Heart className="w-5 h-5" />,
    href: "/wishlist",
  },
  {
    title: "Track Orders",
    icon: <ShoppingBasket className="w-5 h-5" />,
    href: "/orders",
  },
  {
    title: "Profile",
    icon: <User className="w-5 h-5" />,
    href: "/profile",
  },
];

const UserMobileNav = () => {
  const { logout, isLoggedIn, user } = useAuth();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  return (
    <Sheet>
      <SheetTrigger>
        <AlignJustify className="h-7 w-7 shrink-0" />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="px-5 py-10 bg-white/95 backdrop-blur-xl"
      >
        <SheetHeader>
          <SheetTitle className="text-2xl font-semibold">
            {isLoggedIn ? `Welcome, ${user?.name}` : "Menu"}
          </SheetTitle>
          {isLoggedIn && user?.phone && (
            <p className="text-lg text-muted-foreground">{user.phone}</p>
          )}
        </SheetHeader>

        <nav className="mt-8 flex flex-col gap-4">
          {staticNavs.map((nav) => (
            <Link
              key={nav.title}
              href={nav.href}
              className={`flex items-center gap-3 px-4 py-2 text-lg text-violet font-medium rounded-md transition-colors border border-violet/10
                ${pathname === nav.href ? "bg-violet/5" : "hover:bg-accent hover:text-accent-foreground"}`}
            >
              {nav.icon}
              {nav.title}
            </Link>
          ))}

          {isLoggedIn && (
            <Link
              href="/cart"
              className={`flex items-center gap-3 px-4 py-2 text-lg text-violet font-medium rounded-md transition-colors border border-violet/10
                ${pathname === "/cart" ? "bg-violet/5" : "hover:bg-accent hover:text-accent-foreground"}`}
            >
              <ShoppingCart className="h-4 w-4" />
              Manage Cart
            </Link>
          )}

          <Separator className="my-4 bg-violet" />

          {isLoggedIn ? (
            <Button
              onClick={handleLogout}
              className="w-full justify-start gap-2 text-lg"
            >
              <LogOut className="h-4 w-4" />
              Log Out
            </Button>
          ) : (
            <Link href="/sign-in" className="w-full">
              <Button
                className={`w-full justify-start gap-2 text-lg ${pathname === "/sign-in" ? "bg-violet/5" : ""}`}
              >
                <LogIn className="h-4 w-4" />
                Sign In
              </Button>
            </Link>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default UserMobileNav;
