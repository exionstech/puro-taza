import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
  height: number;
  width: number;
}

const Logo = ({ className, height, width }: LogoProps) => {
  return (
    <Link href={"/"}>
      <Image
        src={"/logo/logo.svg"}
        alt="logo"
        height={height}
        width={width}
        className={cn("cursor-pointer shrink-0", className)}
      />
    </Link>
  );
};

export default Logo;
