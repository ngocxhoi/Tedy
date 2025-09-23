import { SchemaImageGenerator } from "~~/lib/zod/image";
import gemini from "~~/shared/utils/tools/gemini";
import * as fs from "node:fs";

export default defineEventHandler(async (event) => {
  const { prompt, type } = (await readBody(event)) as SchemaImageGenerator;

  if (!prompt || !type) {
    throw createError({
      statusCode: 400,
      message: "Prompt and type are required",
    });
  }

  const res = await gemini.models.generateContent({
    model: "gemini-2.5-flash-image-preview",
    contents: prompt + `\n\nGenerate image with ${type} aspect ratio`,
  });

  return res.candidates?.[0]?.content?.parts?.[0]?.text;
});
