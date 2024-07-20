"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { isChapterFreeSchema } from "@/schema/zod-schemes";
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
import { Checkbox } from "@/components/ui/checkbox";

interface ChapterAccessFieldProps {
  isFree: boolean;
  courseId: string;
  chapterId: string;
}

const ChapterAccessField = ({
  courseId,
  isFree,
  chapterId,
}: ChapterAccessFieldProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof isChapterFreeSchema>>({
    resolver: zodResolver(isChapterFreeSchema),
    defaultValues: {
      isFree,
    },
  });
  const {
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: z.infer<typeof isChapterFreeSchema>) {
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
        <p className="font-bold text-xl">Chapter access</p>
        <button onClick={() => setEdit(!edit)} className="hover:underline">
          {edit ? "Cancel" : "Edit"}
        </button>
      </div>

      {edit ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="isFree"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormControl>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          onCheckedChange={(value) => {
                            field.onChange(!value);
                          }}
                          checked={!field.value}
                          className="ml-2"
                        />
                        Paid
                      </div>

                      <Button type="submit" disabled={isSubmitting}>
                        save
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      ) : (
        <p className="">
          {isFree
            ? "This chapter is free for preview"
            : "This chapter is only for paid users"}
        </p>
      )}
    </div>
  );
};

export default ChapterAccessField;
