"use client";
import React from "react";
import { ThemeSwitch } from "./ThemeSwitch";
import { UserButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";

const GroupButtons = ({ open }: { open: boolean }) => {
  const { theme } = useTheme();
  return (
    <div
      className={cn(
        " flex flex-col items-center justify-between gap-4",
        open && "flex-row"
      )}
    >
      <UserButton
        userProfileMode="modal"
        appearance={{
          baseTheme: theme === "dark" ? dark : undefined,
        }}
      />
      <ThemeSwitch />
    </div>
  );
};

export default GroupButtons;
