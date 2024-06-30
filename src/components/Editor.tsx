"use client";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
interface EditorProps {
  content: string;
  onChange: (content: string) => void;
}
const Editor = ({ content, onChange }: EditorProps) => {
  return <ReactQuill theme="snow" value={content} onChange={onChange} />;
};

export default Editor;
