"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { contentSchema } from "@/schema/zod-schemes";
import { updateTheField } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Editor from "@/components/Editor";
import Preview from "@/components/Preview";

interface ContentFieldProps {
  content: string;
  courseId: string;
  chapterId: string;
}

const ContentField = ({ courseId, content, chapterId }: ContentFieldProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof contentSchema>>({
    resolver: zodResolver(contentSchema),
    defaultValues: {
      content,
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: z.infer<typeof contentSchema>) {
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
    <div className="shadow-md border p-4 space-y-3">
      <div className="flex justify-between">
        <p className="font-bold text-xl">
          Chapter Content <span className="text-red-600">*</span>
        </p>
        <button onClick={() => setEdit(!edit)} className="hover:underline">
          {edit ? "Cancel" : "Edit"}
        </button>
      </div>
      {edit ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormControl>
                    <Editor
                      content={field.value}
                      onChange={(newContent) => field.onChange(newContent)}
                    />
                  </FormControl>
                  <FormDescription>
                    Write a detailed content for the chapter
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end items-center">
              <Button type="submit" disabled={isSubmitting}>
                Save
              </Button>
            </div>
          </form>
        </Form>
      ) : content === "" ? (
        <p className="text-gray-500">No Content</p>
      ) : (
        <Preview content={content} />
      )}
    </div>
  );
};

export default ContentField;
