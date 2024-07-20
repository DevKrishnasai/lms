"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { descriptionSchema, titleSchema } from "@/schema/zod-schemes";
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
import { updateTheField } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";

interface DescriptionFieldProps {
  description: string;
  courseId: string;
}

const DescriptionField = ({ courseId, description }: DescriptionFieldProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof descriptionSchema>>({
    resolver: zodResolver(descriptionSchema),
    defaultValues: {
      description: description ? description : "",
    },
  });
  const {
    formState: { isSubmitting, isValid },
  } = form;

  async function onSubmit(values: z.infer<typeof descriptionSchema>) {
    await updateTheField(values, `/api/teacher/update/${courseId}`);
    setEdit((prev) => !prev);
    router.refresh();
  }
  const [edit, setEdit] = React.useState(false);
  return (
    <div className=" shadow-md border p-4 space-y-3">
      <div className="flex justify-between">
        <p className="font-bold text-xl">
          Description <span className="text-red-600">*</span>
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
              name="description"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormControl>
                    <Textarea
                      placeholder="e.g. This is a Full Stack couurse where you find all the chapters orginized and structed..."
                      {...field}
                      value={field.value}
                    />
                  </FormControl>
                  <FormDescription>
                    Write a description that will help students understand what
                    they will learn in this course
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
      ) : description === "" ? (
        <p className="text-gray-500">No description </p>
      ) : (
        <p className="truncate hover:text-clip text-balance">{description}</p>
      )}
    </div>
  );
};

export default DescriptionField;
