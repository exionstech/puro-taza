import { cn } from "@/lib/utils";
import Image from "next/image"

interface DropdownIconProps {
    className?: string;
    size?: number;
}

const DropdownIcon = ({
    className,
    size = 1,
}: DropdownIconProps) => {
  return <Image src={"/icons/dropdown.svg"} alt="dropdown.svg" height={size * 5} width={size * 5} className={cn("shrink-0", className)}/>
}

export default DropdownIcon;
