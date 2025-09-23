import { extractText, getDocumentProxy } from "unpdf";
import gemini from "~~/shared/utils/tools/gemini";

export default defineEventHandler(async (event) => {
  const formData = await readFormData(event);
  const file = formData.get("pdf") as File;
  if (!file) {
    throw createError({
      statusCode: 400,
      message: "No image file provided",
    });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const documentProxy = await getDocumentProxy(new Uint8Array(buffer));
  const { text } = await extractText(documentProxy, { mergePages: true });

  const inp = `Review the following resume and provide constructive feedback on its strength and weaknesses. Resume content: ${text}`;

  const res = await gemini.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        role: "model",
        parts: [
          {
            text: "You are a helpful assistant. Your response content should be beautiful HTML with tailwindcss for style of UI to display has background transparent and alway has two type light and dark mode.",
          },
        ],
      },
      { role: "user", parts: [{ text: inp }] },
    ],
  });

  return htmlFormat(res.candidates?.[0]?.content?.parts?.[0]?.text || "");
});
