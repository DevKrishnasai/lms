"use client";

import { Input } from "@/components/ui/input";
import { searchSchema } from "@/schema/zod-schemes";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { debounce } from "lodash";

const SearchInput = () => {
  const path = usePathname();
  const router = useRouter();

  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: "",
    },
  });

  const debouncedSearch = useMemo(
    () =>
      debounce((search: string) => {
        if (path === "/courses") {
          if (search) {
            router.push(`/courses?search=${encodeURIComponent(search)}`);
          } else {
            router.push(`/courses`);
          }
        }
      }, 300),
    [path, router]
  );

  const handleSearch = useCallback(
    (search: string) => {
      debouncedSearch(search);
    },
    [debouncedSearch]
  );

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "search") {
        handleSearch(value.search as string);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, handleSearch]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const search = form.getValues("search");
      router.push(`/courses?search=${encodeURIComponent(search)}`);
    }
  };

  return (
    <Input
      type="text"
      className="p-2 rounded-md mb-3 lg:mb-0 w-full md:w-[400px]"
      placeholder="search courses here by name or category or author"
      onKeyDown={handleKeyDown}
      {...form.register("search")}
    />
  );
};

export default SearchInput;
