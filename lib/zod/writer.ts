import * as z from "zod";

export const schemaWriterArticle = z.object({
  topic: z.string().min(3, "Must be at least 3 characters").max(100),
  length: z.enum(["short", "medium", "long"]),
  description: z.string().max(500).nullable(),
});
export type SchemaWriterArticle = z.infer<typeof schemaWriterArticle>;

export const schemaCodeGenerator = z.object({
  prompt: z.string().min(3, "Must be at least 3 characters").max(500),
});
export type SchemaCodeGenerator = z.infer<typeof schemaCodeGenerator>;
