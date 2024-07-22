/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import Link from "next/link";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { titleSchema } from "@/schema/zod-schemes";

const page = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof titleSchema>>({
    resolver: zodResolver(titleSchema),
    defaultValues: {
      title: "",
    },
  });

  async function onSubmit(values: z.infer<typeof titleSchema>) {
    toast.loading("Creating course...", {
      id: "course-creation",
    });
    try {
      const res = await axios.post("/api/teacher/create", values);
      if (res.status === 201) {
        toast.success("Course created successfully", {
          id: "course-creation",
        });
        router.push(`/create/course/${res.data.id}`);
      } else {
        toast.error(
          "Failed to create course (already course with this title present)",
          {
            id: "course-creation",
          }
        );
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        toast.error(error.response.data.message || "something went wrong", {
          id: "course-creation",
        });
      } else {
        toast.error("An unexpected error occurred", {
          id: "course-creation",
        });
      }
    }
  }

  return (
    <div className="w-full mt-[20%] flex justify-center items-center ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 h-full   "
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-2xl">Title</FormLabel>
                <FormControl>
                  <Input
                    className="w-full"
                    placeholder="e.g. Full Stack Development..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is your public display course title.(it can be changed
                  later)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between">
            <Button
              type="submit"
              variant={"default"}
              disabled={form.formState.isSubmitting}
            >
              Submit
            </Button>
            <Link href="/course-studio">
              <Button
                type="button"
                variant={"outline"}
                disabled={form.formState.isSubmitting}
              >
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default page;
