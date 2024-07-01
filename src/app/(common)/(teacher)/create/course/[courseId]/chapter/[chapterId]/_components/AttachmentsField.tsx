"use client";
import Fileupload from "@/components/Fileupload";
import { updateTheField } from "@/lib/utils";
import { attachment } from "@prisma/client";
import { ImageIcon, StoreIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface AttachmentsFieldProps {
  attachments: attachment[];
  courseId: string;
  chapterId: string;
}
const AttachmentsField = ({
  attachments,
  chapterId,
  courseId,
}: AttachmentsFieldProps) => {
  const [edit, setEdit] = useState(false);

  const router = useRouter();

  async function onSubmit(values: { url: string; all: any }) {
    await updateTheField(
      values,
      `/api/teacher/update/${courseId}/chapter/${chapterId}`,
      "POST",
      true
    );
    setEdit((prev) => !prev);
    router.refresh();
  }

  async function onDelete(values: { id: string }) {
    await updateTheField(
      values,
      `/api/teacher/update/${courseId}/chapter/${chapterId}`,
      "PUT",
      true
    );
    setEdit((prev) => !prev);
    router.refresh();
  }

  return (
    <div className=" shadow-md border p-4 space-y-3">
      <div className="flex justify-between">
        <p className="font-bold text-xl">Attachments</p>
        <button onClick={() => setEdit(!edit)} className="hover:underline">
          {edit ? "Cancel" : "Add Attachments"}
        </button>
      </div>
      {edit ? (
        <div className="">
          <Fileupload
            endpoint="uploadChapterAttachement"
            onChange={(url: string, res) => {
              onSubmit({ url, all: res });
            }}
          />
        </div>
      ) : attachments.length === 0 ? (
        <div className="border-2 rounded-md border-dashed flex flex-col gap-3 justify-center items-center min-h-60">
          <StoreIcon size={40} />
          <p className="text-sm">No attachments added</p>
        </div>
      ) : (
        attachments.map((attachment) => (
          <div
            key={attachment.id}
            className="flex justify-between items-center"
          >
            <Link
              href={attachment.url}
              className="hover:underline hover:text-blue-500"
              target="_blank"
            >
              <p>{attachment.name}</p>
            </Link>
            <button
              className="hover:underline"
              onClick={() => onDelete({ id: attachment.id })}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default AttachmentsField;
