"use client";
import { Button } from "@/components/ui/button";
import { cn, updateTheField } from "@/lib/utils";
import { Course, User } from "@prisma/client";
import { Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
interface PublishFieldProps {
  courseDeatils: Course;
  isCompleted: boolean;
  courseId: string;
  user: User;
}
const PublishField = ({
  courseDeatils,
  courseId,
  isCompleted,
  user,
}: PublishFieldProps) => {
  const router = useRouter();
  const onDelete = async () => {
    await updateTheField({}, `/api/teacher/update/${courseId}`, "DELETE");
    router.push(`/course-studio`);
  };
  const onPublish = async () => {
    if (!isCompleted) {
      toast.warning("Please complete all the fields", {
        duration: 1500,
      });
      return;
    }

    if (!user.signature || !user.bio) {
      toast.warning("complete your profile first", {
        duration: 1500,
        action: (
          <Button className="">
            <Link href="/settings">Go to settings</Link>
          </Button>
        ),
      });
      return;
    }

    await updateTheField(
      { isPublished: !courseDeatils.isPublished },
      `/api/teacher/update/${courseId}`,
      "PATCH"
    );
    if (courseDeatils.isPublished) {
      toast.success("Course unpublished", {
        duration: 1500,
      });
      router.refresh();
      return;
    }
    router.push(`/course-studio`);
  };
  return (
    <div className="flex items-center">
      <Button onClick={onDelete} className="">
        <Trash className="font-bold" />
      </Button>
      <Button
        className={cn("ml-2", !isCompleted && "cursor-not-allowed opacity-50")}
        onClick={onPublish}
      >
        {courseDeatils.isPublished ? "Unpublish" : "Publish"}
      </Button>
    </div>
  );
};

export default PublishField;
