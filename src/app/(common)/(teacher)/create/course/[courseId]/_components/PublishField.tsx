"use client";
import { Button } from "@/components/ui/button";
import { cn, updateTheField } from "@/lib/utils";
import { Course } from "@prisma/client";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
interface PublishFieldProps {
  courseDeatils: Course;
  isCompleted: boolean;
  courseId: string;
}
const PublishField = ({
  courseDeatils,
  courseId,
  isCompleted,
}: PublishFieldProps) => {
  const router = useRouter();
  const onDelete = async () => {
    await updateTheField({}, `/api/teacher/update/${courseId}`, "DELETE");
    router.push(`/dashboard`);
  };
  const onPublish = async () => {
    if (!isCompleted) {
      toast.warning("Please complete all the fields", {
        duration: 1500,
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
    router.push(`/dashboard`);
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
