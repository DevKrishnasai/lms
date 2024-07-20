import React, { useEffect, useCallback, useState } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { useUploadThing } from "@/lib/uploadthing";
import { toast } from "sonner";

interface EditorProps {
  content: string;
  onChange: (content: string) => void;
}

const Editor: React.FC<EditorProps> = ({ content, onChange }) => {
  const { quill, quillRef } = useQuill();
  const [isInitialized, setIsInitialized] = useState(false);

  const { startUpload } = useUploadThing("uploadThumbnail", {
    skipPolling: true,
    onUploadBegin: () => {
      toast.loading("uploading...", {
        id: "uploading-image",
      });
    },
    onClientUploadComplete: (res) => {
      toast.success("uploaded successfully", {
        id: "uploading-image",
      });
    },
    onUploadProgress(p) {
      toast.loading(`uploading ${p}%`, {
        id: "uploading-image",
      });
    },
    onUploadError: (error: Error) => {
      toast.error(error.message, {
        id: "uploading-image",
      });
    },
  });

  const insertToEditor = useCallback(
    (url: string) => {
      const range = quill?.getSelection();
      if (range && quill) {
        quill.insertEmbed(range.index, "image", url);
      }
    },
    [quill]
  );

  const saveToServer = useCallback(
    async (file: File) => {
      try {
        const data = await startUpload([file]);
        if (data && data[0]) {
          insertToEditor(data[0].url);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    },
    [startUpload, insertToEditor]
  );

  const selectLocalImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = () => {
      const file = input.files?.[0];
      if (file) {
        saveToServer(file);
      }
    };
  }, [saveToServer]);

  useEffect(() => {
    if (quill && !isInitialized) {
      quill.root.innerHTML = content;
      setIsInitialized(true);

      quill.on("text-change", () => {
        onChange(quill.root.innerHTML);
      });
      //@ts-ignore
      quill.getModule("toolbar").addHandler("image", selectLocalImage);
    }
  }, [quill, content, onChange, selectLocalImage, isInitialized]);

  // Update content when it changes externally
  useEffect(() => {
    if (quill && isInitialized && content !== quill.root.innerHTML) {
      quill.root.innerHTML = content;
    }
  }, [quill, content, isInitialized]);

  return (
    <div className="w-full">
      <div ref={quillRef} />
    </div>
  );
};

export default Editor;
