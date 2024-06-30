"use client";
import { UserButton } from "@clerk/nextjs";
import React, { useContext } from "react";
import { ThemeSwitch } from "./ThemeSwitch";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";
import { usePathname, useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { MyContext } from "@/providers/context-provider";

const Navbar = () => {
  const path = usePathname();
  const router = useRouter();
  const { theme, systemTheme } = useTheme();
  const system = systemTheme === "dark" ? dark : undefined;
  console.log(path);
  const { search, setSearch } = useContext(MyContext);

  return (
    <div className="w-full flex justify-between items-center shadow-lg px-3 py-2">
      <div className="flex items-center">
        <h1 className="text-3xl font-bold ml-2 ">Logo</h1>
        {path === "/courses" ? (
          <Input
            type="text"
            className="p-2 rounded-md ml-44"
            placeholder="Search"
            value={search}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                router.push(`/courses?search=${search}`);
              }
            }}
            onChange={(e) => setSearch(e.target.value)}
          />
        ) : null}
      </div>
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
