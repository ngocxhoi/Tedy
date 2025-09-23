import * as z from "zod";
import { getImageConstraints } from "@/assets/data/const";

export const schemaImageBackgroundRemoval = z.object({
  image: z
    .instanceof(File, {
      message: "Please select an image file.",
    })
    .refine((file) => file.size <= getImageConstraints().maxFileSize, {
      message: `The image is too large. Please choose an image smaller than ${formatByte(
        getImageConstraints().maxFileSize
      )}.`,
    })
    .refine((file) => getImageConstraints().acceptedTypes.includes(file.type), {
      message: "Please upload a valid image file (JPEG, PNG, or WebP).",
    })
    .refine(
      (file) =>
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
              const meetsDimensions =
                img.width >= getImageConstraints().minDimensions.width &&
                img.height >= getImageConstraints().minDimensions.height &&
                img.width <= getImageConstraints().maxDimensions.width &&
                img.height <= getImageConstraints().maxDimensions.height;
              resolve(meetsDimensions);
            };
            img.src = e.target?.result as string;
          };
          reader.readAsDataURL(file);
        }),
      {
        message: `The image dimensions are invalid. Please upload an image between ${
          getImageConstraints().minDimensions.width
        }x${getImageConstraints().minDimensions.height} and ${
          getImageConstraints().maxDimensions.width
        }x${getImageConstraints().maxDimensions.height} pixels.`,
      }
    ),
});

export type SchemaImageBackgroundRemoval = z.infer<
  typeof schemaImageBackgroundRemoval
>;

export const schemaImageObjectRemoval = z.object({
  title: z.array(z.string()).max(3, "Title must be at most 3 objects"),
  image: z
    .instanceof(File, {
      message: "Please select an image file.",
    })
    .refine((file) => file.size <= getImageConstraints().maxFileSize, {
      message: `The image is too large. Please choose an image smaller than ${formatByte(
        getImageConstraints().maxFileSize
      )}.`,
    })
    .refine((file) => getImageConstraints().acceptedTypes.includes(file.type), {
      message: "Please upload a valid image file (JPEG, PNG, or WebP).",
    })
    .refine(
      (file) =>
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
              const meetsDimensions =
                img.width >= getImageConstraints().minDimensions.width &&
                img.height >= getImageConstraints().minDimensions.height &&
                img.width <= getImageConstraints().maxDimensions.width &&
                img.height <= getImageConstraints().maxDimensions.height;
              resolve(meetsDimensions);
            };
            img.src = e.target?.result as string;
          };
          reader.readAsDataURL(file);
        }),
      {
        message: `The image dimensions are invalid. Please upload an image between ${
          getImageConstraints().minDimensions.width
        }x${getImageConstraints().minDimensions.height} and ${
          getImageConstraints().maxDimensions.width
        }x${getImageConstraints().maxDimensions.height} pixels.`,
      }
    ),
});

export type SchemaImageObjectRemoval = z.output<
  typeof schemaImageObjectRemoval
>;

export const schemaImageGenerator = z.object({
  prompt: z.string().min(1, "Prompt is required"),
  type: z.enum(["16/9", "1/1", "4/3", "3/2"]),
});

export type SchemaImageGenerator = z.output<typeof schemaImageGenerator>;
