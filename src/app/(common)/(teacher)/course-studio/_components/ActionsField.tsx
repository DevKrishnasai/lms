"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { updateTheField } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { TeachersPublishedCoursesType } from "../actions";

interface ActionsFieldProps {
  chapter: TeachersPublishedCoursesType;
}
const ActionsField = ({ chapter }: ActionsFieldProps) => {
  const router = useRouter();

  const pushToEditScreen = (courseId: string) => {
    router.push(`/create/course/${courseId}`);
  };

  const pushToUsersScreen = (courseId: string) => {
    router.push(`course-studio/${courseId}/users`);
  };

  const deleteCourse = async (courseId: string) => {
    await updateTheField({}, `/api/teacher/update/${courseId}`, "DELETE");
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => pushToEditScreen(chapter.id)}>
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => pushToUsersScreen(chapter.id)}>
          Users
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => deleteCourse(chapter.id)}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionsField;
