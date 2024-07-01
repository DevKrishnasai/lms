"use client";

import { ourFileRouter } from "@/app/api/uploadthing/core";
import { UploadButton, UploadDropzone } from "@/lib/uploadthing";
import { toast } from "sonner";
import { ClientUploadedFileData } from "uploadthing/types";
interface FileuploadProps {
  endpoint: keyof typeof ourFileRouter;
  onChange: (url: string, res?: ClientUploadedFileData<null>[]) => void;
}
export default function Fileupload({ endpoint, onChange }: FileuploadProps) {
  return (
    <UploadDropzone
      onUploadBegin={() => {
        toast.loading("uploading...", {
          id: "uploading",
        });
      }}
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res[0].url, res);
        toast.success("uploaded successfully", {
          id: "uploading",
        });
      }}
      onUploadError={(error: Error) => {
        toast.error(error.message, {
          id: "uploading",
        });
      }}
    />
  );
}
