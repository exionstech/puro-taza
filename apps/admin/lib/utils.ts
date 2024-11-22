import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function todayDate() {
  const week = new Date().toLocaleString("default", { weekday: "long" });
  const month = new Date().toLocaleString("default", { month: "long" });
  return `${week}, ${month} ${new Date().getDate()}, ${new Date().getFullYear()}`;
}
