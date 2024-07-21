"use client";
import React from "react";

import { z } from "zod";
import { thumbnailSchema } from "@/schema/zod-schemes";

import { updateTheField } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Fileupload from "@/components/Fileupload";
import { ImageIcon } from "lucide-react";

interface ThumbnailFieldProps {
  thumbnail: string;
  courseId: string;
}

const ThumbnailField = ({ courseId, thumbnail }: ThumbnailFieldProps) => {
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof thumbnailSchema>) {
    await updateTheField(values, `/api/teacher/update/${courseId}`);
    setEdit((prev) => !prev);
    router.refresh();
  }
  const [edit, setEdit] = React.useState(false);
  return (
    <div className=" shadow-md border p-4 space-y-3">
      <div className="flex justify-between">
        <p className="font-bold text-xl">
          Thumbnail <span className="text-red-600">*</span>
        </p>
        <button onClick={() => setEdit(!edit)} className="hover:underline">
          {edit ? "Cancel" : "Edit"}
        </button>
      </div>
      {edit ? (
        <div className="">
          <Fileupload
            endpoint="uploadThumbnail"
            onChange={(url: string) => {
              onSubmit({ thumbnail: url });
            }}
          />
        </div>
      ) : thumbnail === "" ? (
        <div className="border-2 rounded-md border-dashed flex flex-col gap-3 justify-center items-center min-h-60">
          <ImageIcon size={40} />
          <p className="text-gray-500">No thumbnail uploaded</p>
        </div>
      ) : (
        <img
          src={thumbnail}
          alt="thumbnail"
          className="object-cover w-full max-h-90 rounded-md"
        />
      )}
    </div>
  );
};

export default ThumbnailField;
