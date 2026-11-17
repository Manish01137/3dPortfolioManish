import clsx, { type ClassValue } from "clsx";
export const cn = (...i: ClassValue[]) => clsx(i);
export const pad = (n: number) => String(n).padStart(2, "0");
