"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { durationSchema } from "@/schema/zod-schemes";
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

interface DurationFieldProps {
  duration: number;
  courseId: string;
}

const DurationField = ({ courseId, duration }: DurationFieldProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof durationSchema>>({
    resolver: zodResolver(durationSchema),
    defaultValues: {
      duration,
    },
  });
  const {
    formState: { isSubmitting, isValid },
  } = form;

  async function onSubmit(values: z.infer<typeof durationSchema>) {
    await updateTheField(values, `/api/teacher/update/${courseId}`);
    setEdit((prev) => !prev);
    router.refresh();
  }
  const [edit, setEdit] = React.useState(false);
  return (
    <div className=" shadow-md border p-4 space-y-3">
      <div className="flex justify-between">
        <p className="font-bold text-xl">
          Duration of the course (in hours)
          <span className="text-red-600">*</span>
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
              name="duration"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormControl>
                    <Input
                      placeholder="e.g. 10"
                      {...field}
                      value={field.value}
                      type="number"
                    />
                  </FormControl>
                  <FormDescription>
                    approximate duration of the course in hours
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
        <p className="">{duration}</p>
      )}
    </div>
  );
};

export default DurationField;
