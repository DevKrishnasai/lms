import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const funAuth = async () => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }
  return { userId };
};

export const ourFileRouter = {
  uploadThumbnail: f({ image: { maxFileCount: 1 } })
    .middleware(() => funAuth())
    .onUploadComplete(() => {}),
  uploadChapterVideo: f({ video: { maxFileCount: 1, maxFileSize: "8GB" } })
    .middleware(() => funAuth())
    .onUploadComplete(() => {}),
  uploadChapterAttachement: f(["video", "text", "pdf", "image/png"])
    .middleware(() => funAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
