"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { categorySchema } from "@/schema/zod-schemes";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateTheField } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Category } from "@prisma/client";

interface CategoryFieldProps {
  category: string;
  courseId: string;
  availableCategories: Category[];
}

const CategoryField = ({
  courseId,
  category,
  availableCategories,
}: CategoryFieldProps) => {
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
    <div className="shadow-md border p-4 space-y-3">
      <div className="flex justify-between">
        <p className="font-bold text-xl">
          Category <span className="text-red-600">*</span>
        </p>
        <button onClick={() => setEdit(!edit)} className="hover:underline">
          {edit ? "Cancel" : "Edit"}
        </button>
      </div>
      {edit ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <Controller
              name="category"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {availableCategories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.title}>
                          {cat.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select a category for your course.
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
      ) : category ? (
        <p className="">{category}</p>
      ) : (
        <p className="text-gray-500">No Category</p>
      )}
    </div>
  );
};

export default CategoryField;
