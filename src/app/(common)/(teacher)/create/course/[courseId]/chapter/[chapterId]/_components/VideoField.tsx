"use client";
import React from "react";

import { z } from "zod";
import { videoSchema } from "@/schema/zod-schemes";

import { updateTheField } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Fileupload from "@/components/Fileupload";
import { VideoIcon } from "lucide-react";
import {
  Player,
  ControlBar,
  ReplayControl,
  ForwardControl,
  CurrentTimeDisplay,
  TimeDivider,
  PlaybackRateMenuButton,
  VolumeMenuButton,
} from "video-react";

interface VideoFieldProps {
  videoUrl: string;
  courseId: string;
  chapterId: string;

  title: string;
}

const VideoField = ({
  courseId,
  chapterId,
  videoUrl,
  title,
}: VideoFieldProps) => {
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof videoSchema>) {
    await updateTheField(
      values,
      `/api/teacher/update/${courseId}/chapter/${chapterId}`,
      "PATCH",
      true
    );
    setEdit((prev) => !prev);
    router.refresh();
  }
  const [edit, setEdit] = React.useState(false);
  return (
    <div className=" shadow-md border p-4 space-y-3">
      <div className="flex justify-between">
        <p className="font-bold text-xl">Video</p>
        <button onClick={() => setEdit(!edit)} className="hover:underline">
          {edit ? "Cancel" : "Add Video"}
        </button>
      </div>
      {edit ? (
        <div className="">
          <Fileupload
            endpoint="uploadChapterVideo"
            onChange={(url: string) => {
              onSubmit({ videoUrl: url });
            }}
          />
        </div>
      ) : videoUrl === "" ? (
        <div className="border-2 rounded-md border-dashed flex flex-col gap-3 justify-center items-center min-h-60">
          <VideoIcon size={40} />
          <p className="text-gray-500">No Video uploaded</p>
        </div>
      ) : (
        <div className="overflow-x-hidden">
          {/* <Video src={videoUrl} /> */}
          <Player src={videoUrl} videoId={videoUrl} />
          <p className="text-center mt-4">
            The video cant be played after immediate upload (refresh once to see
            video)
          </p>
        </div>
      )}
    </div>
  );
};

export default VideoField;
