import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignJustify } from "lucide-react";

const UserMobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger>
      <AlignJustify className="size-7 shrink-0 text-green" />
      </SheetTrigger>
      <SheetContent side={"left"} className="bg-white/90 backdrop-blur-3xl">
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default UserMobileNav;
