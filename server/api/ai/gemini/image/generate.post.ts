import { SchemaImageGenerator } from "~~/lib/zod/image";
import * as fs from "node:fs";

export default defineEventHandler(async (event) => {
  const { gemini } = event.context;
  if (!gemini) {
    throw createError({
      statusCode: 500,
      statusMessage: "Gemini API is not available",
    });
  }

  const { prompt, type } = (await readBody(event)) as SchemaImageGenerator;

  if (!prompt || !type) {
    throw createError({
      statusCode: 400,
      statusMessage: "Prompt and type are required",
    });
  }

  const res = await gemini.models.generateContent({
    model: "gemini-2.5-flash-image-preview",
    contents: prompt + `\n\nGenerate image with ${type} aspect ratio`,
  });

  return res.candidates?.[0]?.content?.parts?.[0]?.text;
});
