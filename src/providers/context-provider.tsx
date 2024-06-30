"use client";
import React, { createContext, useState } from "react";

interface ContextState {
  search: string;
  setSearch: (search: string) => void;
}

export const MyContext = createContext<ContextState>({
  search: "",
  setSearch: () => {},
});

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [search, setSearch] = useState<string>("");

  return (
    <MyContext.Provider value={{ search, setSearch }}>
      {children}
    </MyContext.Provider>
  );
};
