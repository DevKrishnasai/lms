"use client";
import { Chapter, muxVideo } from "@prisma/client";
import ReactPlayer from "@mux/mux-player-react";
interface VideoPlayerProps {
  muxData: muxVideo;
  courseId: string;
}
const VideoPlayer = ({ muxData, courseId }: VideoPlayerProps) => {
  return (
    <ReactPlayer
      playbackId={muxData.playbackId}
      onEnded={(e) => {
        alert("Video ended");
      }}
    />
  );
};

export default VideoPlayer;
