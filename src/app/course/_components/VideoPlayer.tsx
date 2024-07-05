"use client";

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
import Video from "next-video";
interface VideoPlayerProps {
  videoUrl: string;
  courseId: string;
}
const VideoPlayer = ({ videoUrl, courseId }: VideoPlayerProps) => {
  return (
    <Video src={videoUrl} />
    // <ReactPlayer
    //   playbackId={muxData.playbackId}

    //   onEnded={(e) => {
    //     alert("Video ended");
    //   }}
    // />
    // <Player poster="/assets/poster.png" videoId={muxData.videoUrl} />
  );
};

export default VideoPlayer;
