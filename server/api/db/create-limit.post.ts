import { userApiLimit } from "~~/lib/drizzle/db/api-limit";

export default defineEventHandler(async (event) => {
  const db = event.context.db;
  if (!db) {
    throw createError({
      statusCode: 500,
      statusMessage: "Database is not available",
    });
  }

  const { userId } = (await readBody(event)) as { userId?: string };

  if (!userId) {
    throw createError({
      statusCode: 400,
      statusMessage: "User ID is required",
    });
  }

  await db.insert(userApiLimit).values({
    id: crypto.randomUUID(),
    userId: userId,
  });
});
