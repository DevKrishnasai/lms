"use client";
import { UserButton } from "@clerk/nextjs";
import React from "react";
import { ThemeSwitch } from "./ThemeSwitch";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";

const Navbar = () => {
  const { theme, systemTheme } = useTheme();
  const system = systemTheme === "dark" ? dark : undefined;

  return (
    <div className="w-full flex justify-between items-center shadow-lg px-3 py-2">
      <h1 className="text-3xl font-bold ml-2">Logo</h1>
      <div className="flex gap-2 items-center">
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            baseTheme:
              theme === "dark" ? dark : theme === "system" ? system : undefined,
          }}
        />
        <ThemeSwitch />
      </div>
    </div>
  );
};

export default Navbar;
