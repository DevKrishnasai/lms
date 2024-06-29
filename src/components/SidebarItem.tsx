"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SidebarItem = ({ item }: { item: SideBarItemType }) => {
  const current = usePathname();

  const isActive = current.includes(item.link);
  return (
    <Link href={item.link}>
      <div
        className={cn(
          "flex gap-2 items-center group mb-4 p-3 rounded-md ease-linear",
          isActive && "bg-black text-white font-bold"
        )}
      >
        {item.icon}
        <span className="  text-lg">{item.label}</span>
      </div>
    </Link>
  );
};

export default SidebarItem;
