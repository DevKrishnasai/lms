import {
  BookCheck,
  LayoutDashboard,
  SearchSlash,
  Settings,
} from "lucide-react";
import { auth, currentUser } from "@clerk/nextjs/server";
import SidebarItem from "./SidebarItem";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

const Sidebar = async () => {
  const studentRoutes: SideBarItemType[] = [
    {
      icon: <LayoutDashboard className="group-hover:animate-ping" />,
      label: "Dashboard", //current cources                                 -----> course/:id
      link: "/dashboard",
    },
    {
      icon: <SearchSlash className="group-hover:animate-pulse" />,
      label: "Courses",
      link: "/courses", //search for a course                              -----> course/:id
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
      icon: <BookCheck className="group-hover:animate-in" />,
      label: "Courses",
      link: "/courses", //-----> course/:id
    },

    {
      icon: <Settings className="group-hover:animate-spin" />,
      label: "Settings",
      link: "/settings",
    },
  ];

  const user = await currentUser();
  let isTeacher = false;
  if (user && user.id && user.primaryEmailAddress) {
    const data = await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: {
        id: user.id,
        name: user.fullName,
        role: "STUDENT",
        email: user.primaryEmailAddress.emailAddress,
      },
    });
    if (data.role === "TEACHER") isTeacher = true;
  } else {
    redirect("/");
  }

  return (
    <div className="min-w-64 min-h-screen lg:p-3 lg:border-r">
      <h1 className="text-3xl font-bold ml-2 ">Logo</h1>
      <div className="flex flex-col mt-5">
        {!isTeacher
          ? studentRoutes.map((item) => {
              return <SidebarItem key={item.label} item={item} />;
            })
          : teacherRoutes.map((item) => {
              return <SidebarItem key={item.label} item={item} />;
            })}
      </div>
    </div>
  );
};

export default Sidebar;
