"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { usePlayerStore } from "@/lib/store";
import { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function PerformCheck({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  const [gender, setGender] = useState<number | null>(null);
  const { name, set } = usePlayerStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!(window || show == false)) return;
    if (name) return;
    let user = JSON.parse(localStorage.getItem("user") || "{}");
    if (Object.entries(user).length === 0) return setShow(true);
    set({
      name: user.name,
      gender: user.gender,
    });
  });

  async function handleClick() {
    if (inputRef.current == null) return;

    if (inputRef.current.value.trim() == "" || gender == null) {
      setError("Enter valid username");
      return;
    }

    const user = {
      name: inputRef.current.value,
      gender,
    };

    localStorage.setItem("user", JSON.stringify(user));

    set(user);

    setShow(false);
  }

  return name ? (
    children
  ) : (
    <AlertDialog open={show}>
      <AlertDialogContent>
        <AlertDialogHeader className="space-y-6">
          <AlertDialogTitle>Select a Username</AlertDialogTitle>
          <AlertDialogDescription className="space-y-4">
            <Input ref={inputRef} type="name" placeholder="Username" />
            <Select onValueChange={(e) => setGender(parseInt(e))}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Male</SelectItem>
                <SelectItem value="1">Female</SelectItem>
              </SelectContent>
            </Select>
            {error && <span className="text-red-500">Error: {error}</span>}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleClick}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
