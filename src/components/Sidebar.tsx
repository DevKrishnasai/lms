import {
  BookCheck,
  Contact,
  GitPullRequestCreate,
  LayoutDashboard,
  LucideShieldQuestion,
  PenTool,
  Phone,
  SearchSlash,
  Settings,
} from "lucide-react";
import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import SidebarItem from "./SidebarItem";
import { ThemeSwitch } from "./ThemeSwitch";
import { Button } from "./ui/button";
import Link from "next/link";
import { IoLogoWindows } from "react-icons/io";
import { cn } from "@/lib/utils";
import {
  FaCertificate,
  FaCreativeCommonsShare,
  FaCreativeCommonsZero,
} from "react-icons/fa";

interface SideBarItemType {
  icon: React.ReactNode;
  label: string;
  link: string;
}

const Sidebar = async () => {
  const studentRoutes: SideBarItemType[] = [
    {
      icon: <LayoutDashboard className="group-hover:animate-ping" />,
      label: "Dashboard",
      link: "/dashboard",
    },
    {
      icon: <SearchSlash className="group-hover:animate-pulse" />,
      label: "Courses",
      link: "/courses",
    },
    {
      icon: <FaCertificate size={24} className="group-hover:animate-spin  " />,
      label: "Certificates",
      link: "/certificates",
    },
    {
      icon: <Settings className="group-hover:animate-spin" />,
      label: "Settings",
      link: "/settings",
    },
  ];

  const teacherRoutes: SideBarItemType[] = [
    {
      icon: <LayoutDashboard className="group-hover:animate-ping" />,
      label: "Dashboard",
      link: "/dashboard",
    },
    {
      icon: <BookCheck className="group-hover:animate-bounce" />,
      label: "Courses",
      link: "/courses",
    },
    {
      icon: <GitPullRequestCreate className="group-hover:animate-bounce" />,
      label: "Course Studio",
      link: "/course-studio",
    },
    // {
    //   icon: <PenTool className="group-hover:animate-pulse" />,
    //   label: "Access",
    //   link: "/access",
    // },
    // {
    //   icon: <LucideShieldQuestion className="group-hover:animate-pulse" />,
    //   label: "Queries",
    //   link: "/queries",
    // },
    {
      icon: <FaCertificate size={24} className="group-hover:animate-spin  " />,
      label: "Certificates",
      link: "/certificates",
    },

    {
      icon: <Settings className="group-hover:animate-spin" />,
      label: "Settings",
      link: "/settings",
    },
  ];

  const { userId } = auth();
  let isTeacher = false;
  let visitedUser = false;

  if (!userId) {
    visitedUser = true;
  } else {
    const currentuser = await currentUser();
    if (!currentuser) {
      visitedUser = true;
    } else {
      if (!currentuser.primaryEmailAddress) {
        return null;
      }
      const user = await prisma.user.upsert({
        where: {
          email: currentuser.primaryEmailAddress.emailAddress,
        },
        update: {
          authId: userId,
        },
        create: {
          authId: userId,
          email: currentuser.primaryEmailAddress.emailAddress,
          name: currentuser.fullName,
        },
      });
      if (user.role === "TEACHER") {
        isTeacher = true;
      }
    }
  }

  return (
    <div className="sidebar fixed top-0 left-0 h-full w-16 bg-primary-foreground  transition-all duration-300 hover:w-64 overflow-hidden z-50 lg:border-r flex flex-col justify-between ">
      <div className="p-3">
        <Link href="/">
          <div
            className={cn(
              "flex items-center p-2 rounded-lg cursor-pointer group"
            )}
          >
            <div className="mr-5 min-w-[24px]">
              <IoLogoWindows size={30} />
            </div>
            <span className="sidebar-label whitespace-nowrap opacity-0 transition-opacity duration-300 text-3xl font-bold">
              LMS
            </span>
          </div>
        </Link>

        <div className="flex flex-col mt-5">
          {!isTeacher
            ? studentRoutes.map((item) => (
                <SidebarItem key={item.label} item={item} />
              ))
            : teacherRoutes.map((item) => (
                <SidebarItem key={item.label} item={item} />
              ))}
        </div>
      </div>
      {/* <div className="sidebar-logo flex items-center justify-between p-3">
        <ThemeSwitch />
        <Link href="/contact">
          <Button size="icon" variant="outline">
            <Phone size={20} />
          </Button>
        </Link>
      </div> */}
    </div>
  );
};

export default Sidebar;
