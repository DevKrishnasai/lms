import {
  BookCheck,
  LayoutDashboard,
  PenTool,
  SearchSlash,
  Settings,
} from "lucide-react";
import { auth, currentUser } from "@clerk/nextjs/server";
import SidebarItem from "./SidebarItem";
import { prisma } from "@/lib/db";

const Sidebar = async () => {
  const studentRoutes: SideBarItemType[] = [
    {
      icon: <LayoutDashboard className="group-hover:animate-ping" />,
      label: "Home", //current cources                                 -----> course/:id
      link: "/home",
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
      icon: <BookCheck className="group-hover:animate-bounce" />,
      label: "Courses",
      link: "/courses", //-----> course/:id
    },
    {
      icon: <PenTool className="group-hover:animate-pulse" />,
      label: "Access",
      link: "/access",
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
    const authUser = await currentUser();
    if (!authUser?.emailAddresses[0]?.emailAddress) return <div>loading</div>;
    const user = await prisma.user.upsert({
      where: { email: authUser.emailAddresses[0].emailAddress },
      update: { id: authUser.id },
      create: {
        id: authUser.id,
        email: authUser.emailAddresses[0].emailAddress || "",
        name: authUser.fullName,
      },
    });
    console.log("new user---> ", user);
    if (user) {
      isTeacher = user.role === "TEACHER";
    }
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
