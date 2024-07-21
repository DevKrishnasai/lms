"use client";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { ThemeSwitch } from "./ThemeSwitch";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";
import { usePathname, useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { searchSchema } from "@/schema/zod-schemes";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeftSquare, LogIn } from "lucide-react";
import { Button } from "./ui/button";

const Navbar = () => {
  const path = usePathname();
  const router = useRouter();
  const { theme, systemTheme } = useTheme();
  const system = systemTheme === "dark" ? dark : undefined;

  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: "",
    },
  });

  useEffect(() => {
    const setSearchCourse = () => {
      const search = form.watch("search");
      if (search) {
        router.push(`/courses?search=${search}`);
      } else {
        router.push(`/courses`);
      }
    };
    if (path === "/courses") setSearchCourse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch("search")]);

  const { user } = useUser();
  let visitedUser = true;

  if (user?.id) {
    visitedUser = false;
  }

  return (
    <>
      <div className="flex items-center">
        {path.includes("courses") ? (
          <Input
            type="text"
            className="p-2 rounded-md"
            placeholder="Search"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                router.push(`/courses?search=${form.watch("search")}`);
              }
            }}
            {...form.register("search")}
          />
        ) : path.includes("course") ? (
          !path.includes("chapter") && !path.includes("course-") ? (
            <Link href="/dashboard" className="flex gap-2 items-center">
              <ArrowLeftSquare /> <span>back</span>
            </Link>
          ) : null
        ) : null}
      </div>

      <div className="flex gap-2 items-center">
        {visitedUser ? (
          // <Link href="/auth/sign-in">
          <Button className="flex gap-2 items-center" variant={"outline"}>
            <LogIn />
            <SignInButton mode="modal" fallbackRedirectUrl={path} />
          </Button>
        ) : (
          // </Link>
          <UserButton
            afterSignOutUrl="/the-thank-you-page"
            appearance={{
              baseTheme:
                theme === "dark"
                  ? dark
                  : theme === "system"
                  ? system
                  : undefined,
            }}
          />
        )}

        <ThemeSwitch />
      </div>
    </>
  );
};

export default Navbar;
