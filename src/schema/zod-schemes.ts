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
