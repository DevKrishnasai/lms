"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { titleSchema } from "@/schema/zod-schemes";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateTheField } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Chapter } from "@prisma/client";
import ChaptersArea from "./ChaptersArea";
import { toast } from "sonner";

interface ChaptersFieldProps {
  chapters: Chapter[];
  courseId: string;
}

const ChaptersField = ({ courseId, chapters }: ChaptersFieldProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof titleSchema>>({
    resolver: zodResolver(titleSchema),
    defaultValues: {
      title: "",
    },
  });
  const {
    formState: { isSubmitting },
    reset,
  } = form;

  async function onSubmit(values: z.infer<typeof titleSchema>) {
    await updateTheField(
      values,
      `/api/teacher/update/${courseId}/chapter`,
      "POST"
    );
    setEdit((prev) => !prev);
    reset({
      title: "",
    });
    router.refresh();
  }
  const [edit, setEdit] = React.useState(false);

  const onReorder = async (partialData: { id: string; order: number }[]) => {
    await updateTheField(
      partialData,
      `/api/teacher/update/${courseId}/chapter`,
      "PUT",
      true
    );
    router.refresh();
  };

  const onEdit = (id: string) => {
    toast.loading("Loading chapter environment...", {
      id: "chapter",
    });
    router.push(`/create/course/${courseId}/chapter/${id}`);
    toast.success("Loading chapter editing environment...", {
      id: "chapter",
    });
  };

  return (
    <div className=" shadow-md border p-4 space-y-3">
      <div className="flex justify-between">
        <p className="font-bold text-xl">
          Chapters <span className="text-red-600">*</span>
        </p>
        <button onClick={() => setEdit(!edit)} className="hover:underline">
          {edit ? "Cancel" : "Add"}
        </button>
      </div>

      {edit ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormControl>
                    <Input
                      placeholder="e.g. Chapter 1: Introduction..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Add a chapter to your course. You can add as many chapters
                    as you want.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end items-center">
              <Button type="submit" disabled={isSubmitting}>
                save
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <div>
          {chapters.length > 0 ? (
            <ChaptersArea
              courseId={courseId}
              chapters={chapters}
              onReorder={onReorder}
              onEdit={onEdit}
            />
          ) : (
            <p>No chapters designed yet</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ChaptersField;
