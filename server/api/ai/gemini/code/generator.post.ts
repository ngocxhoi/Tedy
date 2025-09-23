export default defineEventHandler(async (event) => {
  const { prompt } = (await readBody(event)) as { prompt: string };
  return prompt;
});
