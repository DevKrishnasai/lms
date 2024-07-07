"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
interface SideBarItemType {
  icon: React.ReactNode;
  label: string;
  link: string;
}

interface SidebarItemProps {
  item: SideBarItemType;
}

const SidebarItem = ({ item }: { item: SideBarItemType }) => {
  const current = usePathname();

  const isActive = current.includes(item.link);
  return (
    <Link href={item.link} className="block mb-3">
      <div
        className={cn(
          "flex items-center p-2 rounded-lg cursor-pointer group",
          isActive &&
            "bg-black text-white font-bold dark:bg-white dark:text-black dark:font-bold",
          !isActive &&
            "hover:bg-gray-100 dark:hover:bg-gray-800/30 dark:hover:text-white dark:hover:bg-opacity-50"
        )}
      >
        <div className="mr-2 min-w-[24px]">{item.icon}</div>
        <span className="sidebar-label whitespace-nowrap opacity-0 transition-opacity duration-300">
          {item.label}
        </span>
      </div>
    </Link>
  );
};

export default SidebarItem;

// <Link href={item.link}>
//   <div
//     className={cn(
//       "flex gap-2 items-center group mb-4 p-3 rounded-md ease-linear",
//       isActive &&
//         "bg-black text-white font-bold dark:bg-white dark:text-black dark:font-bold",
//       !isActive &&
//         "hover:bg-gray-100 dark:hover:bg-gray-800/30 dark:hover:text-white dark:hover:bg-opacity-50"
//     )}
//   >
//     {item.icon}
//     <span className="text-lg">{item.label}</span>
//   </div>
// </Link>
