"use client";

import { Course } from "@prisma/client";
import { useEffect, useState } from "react";
import { Player } from "video-react";
import { getCourse } from "../action";
// import Video from 'next-video';

interface VideoPlayerProps {
  videoUrl: string;
  courseId: string;
}
const VideoPlayer = ({ videoUrl, courseId }: VideoPlayerProps) => {
  const [courseDetails, setCourseDetails] = useState<Course | null>(null);
  useEffect(() => {
    const getCourseDeatils = async () => {
      const course = await getCourse(courseId);
      setCourseDetails(course);
    };
    getCourseDeatils();
  }, [videoUrl]);
  const nextVideo = async () => {};
  return (
    <Player
      autoPlay={false}
      src={videoUrl}
      videoId={videoUrl}
      poster={courseDetails?.thumbnail || ""}
    />
    // <Video src={videoUrl} />
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
