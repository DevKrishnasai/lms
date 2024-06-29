"use client";
import { useTheme } from "next-themes";
import React from "react";
import { Toaster } from "sonner";

const ToastProvider = () => {
  const { theme, systemTheme } = useTheme();
  const system = theme === "dark" ? "dark" : theme ? "light" : systemTheme;
  return <Toaster theme={system} />;
};

export default ToastProvider;
