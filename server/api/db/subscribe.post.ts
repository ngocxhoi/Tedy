import { subscribeApiLimit } from "./api-limit";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { tokens, plan } = body;
  const userId = event.context.userId;

  if (!userId) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }
  if (!tokens || Number(tokens) <= 0) {
    throw createError({ statusCode: 400, statusMessage: "Invalid tokens" });
  }

  const token = await subscribeApiLimit(userId, Number(tokens), plan);

  if (tokens) {
    setCookie(event, "tokens", String(token));
  }

  return { token };
});
