"use client";
import React, { useState } from "react";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import { BookCheck, GitPullRequestCreate, Phone } from "lucide-react";
import { FaCertificate } from "react-icons/fa";
import { ThemeSwitch } from "./ThemeSwitch";
import { Button } from "./ui/button";
import { UserButton } from "@clerk/nextjs";
import GroupButtons from "./GroupButtons";

function SidebarWraper({
  children,
  visitedUser,
  isTeacher,
}: {
  children: React.ReactNode;
  visitedUser: boolean;
  isTeacher: boolean;
}) {
  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <IconBrandTabler className=" h-7 w-7 flex-shrink-0" />,
    },
    {
      label: "Courses",
      href: "/courses",
      icon: <BookCheck className="h-7 w-7 flex-shrink-0" />,
    },
    {
      label: "Profile",
      href: "/profile",
      icon: <IconUserBolt className="h-7 w-7 flex-shrink-0" />,
    },
    {
      icon: <FaCertificate size={24} className="h-7 w-7 flex-shrink-0" />,
      label: "Certificates",
      href: "/certificates",
    },
    {
      label: "Settings",
      href: "/settings",
      icon: <IconSettings className="h-7 w-7 flex-shrink-0" />,
    },
  ];
  const teachersLinks = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <IconBrandTabler className="h-7 w-7 " />,
    },
    {
      label: "Courses",
      href: "/courses",
      icon: <BookCheck className="h-7 w-7 " />,
    },
    {
      icon: <GitPullRequestCreate className="h-7 w-7 " />,
      label: "Course Studio",
      href: "/course-studio",
    },
    {
      label: "Profile",
      href: "/profile",
      icon: <IconUserBolt className="h-7 w-7 " />,
    },
    {
      icon: <FaCertificate size={24} className="h-7 w-7    " />,
      label: "Certificates",
      href: "/certificates",
    },
    {
      label: "Settings",
      href: "/settings",
      icon: <IconSettings className="h-7 w-7  hover:animate-spin  " />,
    },
  ];

  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row  w-full flex-1 mx-auto border   overflow-hidden",
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 ">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col ">
              {isTeacher
                ? teachersLinks.map((link, idx) => (
                    <SidebarLink key={idx} link={link} />
                  ))
                : links.map((link, idx) => (
                    <SidebarLink key={idx} link={link} />
                  ))}
            </div>
          </div>
          <GroupButtons open={open} />
        </SidebarBody>
      </Sidebar>
      {/* <Dashboard /> */}
      {children}
    </div>
  );
}
export const Logo = () => {
  return (
    <Link
      href="/"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-bold text-black dark:text-white whitespace-pre"
      >
        YourLMS
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="/"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};

// Dummy dashboard component with content
const Dashboard = () => {
  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        <div className="flex gap-2">
          {[...new Array(4)].map((i) => (
            <div
              key={"first-array" + i}
              className="h-20 w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
            ></div>
          ))}
        </div>
        <div className="flex gap-2 flex-1">
          {[...new Array(2)].map((i) => (
            <div
              key={"second-array" + i}
              className="h-full w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SidebarWraper;
