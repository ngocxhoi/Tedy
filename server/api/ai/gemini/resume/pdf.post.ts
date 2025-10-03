import { extractText, getDocumentProxy } from "unpdf";

export default defineWrappedResponseHandler(async (event) => {
  const { gemini } = event.context;
  if (!gemini) {
    throw createError({
      statusCode: 500,
      statusMessage: "Gemini API is not available",
    });
  }
  const formData = await readFormData(event);
  const file = formData.get("pdf") as File;
  if (!file) {
    throw createError({
      statusCode: 400,
      statusMessage: "No image file provided",
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
