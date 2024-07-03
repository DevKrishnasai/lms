import { z } from "zod";

export const titleSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Title is too short",
    })
    .max(50, {
      message: "Title is too long",
    }),
});

export const descriptionSchema = z.object({
  description: z.string().min(10, {
    message: "description is too short",
  }),
});

export const thumbnailSchema = z.object({
  thumbnail: z.string({
    message: "thumbnail is required",
  }),
});

export const categorySchema = z.object({
  category: z.string({
    message: "category is required",
  }),
});

export const isFreeSchema = z.object({
  isFree: z.boolean(),
  price: z.number(),
});

export const contentSchema = z.object({
  content: z.string().min(50, {
    message: "content is too short",
  }),
});

export const isChapterFreeSchema = z.object({
  isFree: z.boolean(),
});

export const videoSchema = z.object({
  videoUrl: z.string({
    message: "video is required",
  }),
});

export const searchSchema = z.object({
  search: z
    .string()
    .min(3, {
      message: "type more to get best courses",
    })
    .max(50, {
      message: "too long search query",
    }),
});

export const addUsersToDBSchema = z.object({
  email: z.string().email({
    message: "Invalid email",
  }),
});

export const enrollUsersToACourseSchema = z.object({
  email: z.string().email({
    message: "Invalid email",
  }),
  courseId: z.string(),
});
