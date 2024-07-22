import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { FaBars } from "react-icons/fa";
import LeftPart from "./LeftPart";

interface MobileLeftPartProps {
  courseId: string;
  isAccessable: boolean;
  visitedUser: boolean;
}

const MobileLeftPart = ({
  courseId,
  isAccessable,
  visitedUser,
}: MobileLeftPartProps) => {
  return (
    <Sheet>
      <SheetTrigger>
        <FaBars size={23} className="ml-2 cursor-pointer " />
      </SheetTrigger>
      <SheetContent className="w-1/2 h-full">
        <LeftPart
          courseId={courseId}
          isAccessable={isAccessable}
          visitedUser={visitedUser}
          isSidebar={true}
        />
      </SheetContent>
    </Sheet>
  );
};

export default MobileLeftPart;
