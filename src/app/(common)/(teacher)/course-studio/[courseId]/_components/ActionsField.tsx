"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { updateTheField } from "@/lib/utils";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { StudentsForCourseType } from "../actions";

interface ActionsFieldProps {
  student: StudentsForCourseType;
}
const ActionsField = ({ student }: ActionsFieldProps) => {
  const router = useRouter();

  const removeUserFromCourse = async () => {
    await updateTheField(
      {
        id: student.userId,
      },
      `/api/teacher/update/${student.courseId}/users`,
      "PUT"
    );
    router.refresh();
  };

  return (
    <Button variant={"destructive"} onClick={removeUserFromCourse}>
      <Trash2 size={20} />
    </Button>
  );
};

export default ActionsField;
