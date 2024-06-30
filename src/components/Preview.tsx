"use client";
import "react-quill/dist/quill.bubble.css";
import ReactQuill from "react-quill";
interface PreviewProps {
  content: string;
}
const Preview = ({ content }: PreviewProps) => {
  return <ReactQuill theme="bubble" value={content} readOnly />;
};

export default Preview;
