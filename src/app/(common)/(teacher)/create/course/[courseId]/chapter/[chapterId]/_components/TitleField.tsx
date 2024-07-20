"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { titleSchema } from "@/schema/zod-schemes";
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
import { Input } from "@/components/ui/input";

interface TitleFieldProps {
  title: string;
  courseId: string;
  chapterId: string;
}

const TitleField = ({ courseId, title, chapterId }: TitleFieldProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof titleSchema>>({
    resolver: zodResolver(titleSchema),
    defaultValues: {
      title,
    },
  });
  const {
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: z.infer<typeof titleSchema>) {
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
        <p className="font-bold text-xl">
          Title <span className="text-red-600">*</span>
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
              name="title"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormControl>
                    <Input
                      placeholder="e.g. Full Stack Development..."
                      {...field}
                      value={field.value}
                    />
                  </FormControl>
                  <FormDescription>
                    This is the title of your course. It should be descriptive
                    and concise.
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
        <p className="">{title}</p>
      )}
    </div>
  );
};

export default TitleField;
