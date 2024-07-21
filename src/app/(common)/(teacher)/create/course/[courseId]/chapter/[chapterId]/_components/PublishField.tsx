"use client";
import { Button } from "@/components/ui/button";
import { cn, updateTheField } from "@/lib/utils";
import { Chapter } from "@prisma/client";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
interface PublishFieldProps {
  chapterDeatils: Chapter;
  isCompleted: boolean;
  courseId: string;
  chapterId: string;
}
const PublishField = ({
  chapterDeatils,
  isCompleted,
  chapterId,
  courseId,
}: PublishFieldProps) => {
  const router = useRouter();
  const onDelete = async () => {
    await updateTheField(
      {},
      `/api/teacher/update/${courseId}/chapter/${chapterId}/checking`,
      "DELETE",
      true
    );
  };
  const onPublish = async () => {
    if (!isCompleted) {
      toast.warning("Please complete all the fields", {
        duration: 1500,
      });
      return;
    }

    await updateTheField(
      { isPublished: !chapterDeatils.isPublished },
      `/api/teacher/update/${courseId}/chapter/${chapterId}/checking`,
      "PUT",
      true
    );

    if (chapterDeatils.isPublished) {
      toast.success("Chapter unpublished", {
        duration: 1500,
      });
      router.refresh();
      return;
    }
    toast.loading("making chapter publish", {
      id: "making-chapter-live",
    });
    router.push(`/create/course/${courseId}`);
    toast.success("chapter published", {
      id: "making-chapter-live",
    });
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
        {chapterDeatils.isPublished ? "Unpublish" : "Publish"}
      </Button>
    </div>
  );
};

export default PublishField;
