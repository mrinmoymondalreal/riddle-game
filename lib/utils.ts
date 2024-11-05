import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { usePlayerStore } from "./store";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;


export const checkAnswer = (question: string | number, option: string | number) => {
  return Math.random() > 0.5;
}


