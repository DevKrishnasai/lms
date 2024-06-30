"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface BackFieldProps {
  courseId: string;
}

const BackField = ({ courseId }: BackFieldProps) => {
  const router = useRouter();
  return (
    <div
      className="flex items-center gap-2 mt-3 hover:cursor-pointer"
      onClick={() => router.push(`/create/course/${courseId}`)}
    >
      <ArrowLeft />
      <p className="font-bold text-lg">back</p>
    </div>
  );
};

export default BackField;
