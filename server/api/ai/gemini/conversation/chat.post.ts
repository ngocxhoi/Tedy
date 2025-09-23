import gemini from "~~/shared/utils/tools/gemini";

export default defineEventHandler(async (event): Promise<ChatMessage> => {
  const { inp } = (await readBody(event)) as { inp: string };
  if (!inp) {
    throw createError({
      statusCode: 400,
      message: "Input is required",
    });
  }

  const res = await gemini.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        role: "model",
        parts: [
          {
            text: "You are a helpful assistant. Your response content should be beautiful HTML with tailwindcss for style of UI to display and no background color and alway has two type light and dark mode.",
          },
        ],
      },
      { role: "user", parts: [{ text: inp }] },
    ],
  });

  return {
    role: "system",
    content: htmlFormat(res.candidates?.[0]?.content?.parts?.[0]?.text || ""),
  };
});
