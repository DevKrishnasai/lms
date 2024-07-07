import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import Sidebar from "./Sidebar";

const MobileSideBar = () => {
  // useEffect(() => {
  //   setOpen(false);
  // }, [path]);

  return (
    <Sheet modal>
      <SheetTrigger className="lg:hidden">
        <MenuIcon />
      </SheetTrigger>
      <SheetContent side="left">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSideBar;
