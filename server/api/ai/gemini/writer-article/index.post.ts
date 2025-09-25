import { type SchemaWriterArticle } from "~~/lib/zod/writer";

export default defineEventHandler(async (event) => {
  const { gemini } = event.context;
  if (!gemini) {
    throw createError({
      statusCode: 500,
      message: "Gemini API is not available",
    });
  }

  const body = (await readBody(event)) as SchemaWriterArticle;

  if (!body.topic || !body.length) {
    throw createError({
      statusCode: 400,
      message: "Topic and length are required",
    });
  }

  let lengthFormat = "";

  switch (body.length) {
    case "short":
      lengthFormat = "500 - 800 words";
      break;
    case "medium":
      lengthFormat = "800 - 1200 words";
      break;
    case "long":
      lengthFormat = "1200 words or more";
      break;
  }

  const inp = `Topic: ${body.topic}\nLength: ${lengthFormat}\nDescription: ${body.description}`;

  const res = await gemini.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        role: "model",
        parts: [
          {
            text: "You are a helpful article writer. Your response content should be beautiful scientific report about user topic has custom length format. With HTML and Tailwindcss for style of UI to display and no background color and alway has two type light and dark mode.",
          },
        ],
      },
      { role: "user", parts: [{ text: inp }] },
    ],
  });

  return htmlFormat(res.candidates?.[0]?.content?.parts?.[0]?.text || "");
});
