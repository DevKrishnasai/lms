"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { categorySchema, titleSchema } from "@/schema/zod-schemes";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateTheField } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface CategoryFieldProps {
  category: string;
  courseId: string;
}

const CategoryField = ({ courseId, category }: CategoryFieldProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      category: category ? category : "",
    },
  });
  const {
    formState: { isSubmitting, isValid },
  } = form;

  async function onSubmit(values: z.infer<typeof categorySchema>) {
    await updateTheField(values, `/api/teacher/update/${courseId}`);
    setEdit((prev) => !prev);
    router.refresh();
  }
  const [edit, setEdit] = React.useState(false);
  return (
    <div className=" shadow-md border p-4 space-y-3">
      <div className="flex justify-between">
        <p className="font-bold text-xl">Category</p>
        <button onClick={() => setEdit(!edit)} className="hover:underline">
          {edit ? "Cancel" : "Edit"}
        </button>
      </div>

      {edit ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormControl>
                    <Input
                      placeholder="e.g. Technology..."
                      {...field}
                      value={field.value}
                    />
                  </FormControl>
                  <FormDescription>
                    Create a category to showup the course when a student
                    searches with this category.
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
      ) : category ? (
        <p className="">{category}</p>
      ) : (
        <p className="text-gray-500">No Category </p>
      )}
    </div>
  );
};

export default CategoryField;
