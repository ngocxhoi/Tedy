import * as z from "zod";
import { getImageConstraints } from "@/assets/data/const";

export const schemaFilePDF = z.object({
  pdf: z
    .instanceof(File, {
      message: "Please select a PDF file.",
    })
    .refine((file) => file.size <= getImageConstraints().maxFileSize, {
      message: `The file is too large. Please choose a file smaller than ${formatByte(
        getImageConstraints().maxFileSize
      )}.`,
    })
    .refine(
      (file) => getImageConstraints().acceptedPdfTypes.includes(file.type),
      {
        message: "Please upload a valid file (PDF).",
      }
    ),
});

export type SchemaFilePDF = z.infer<typeof schemaFilePDF>;
