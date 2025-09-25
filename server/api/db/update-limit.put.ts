import { eq } from "drizzle-orm";
import db from "~~/lib/drizzle";
import { userApiLimit } from "~~/lib/drizzle/db/api-limit";

export default defineEventHandler(async (event): Promise<number> => {
  const { userId } = event.context.auth;
  if (!userId) {
    throw createError({
      statusCode: 401,
      message: "Unauthorized",
    });
  }

  const apiLimit = await db
    .select({ count: userApiLimit.count })
    .from(userApiLimit)
    .where(eq(userApiLimit.userId, userId));

  const { count } = apiLimit[0];
  if (!count || count === 0) {
    throw createError({
      statusCode: 400,
      message: "API limit reached.",
    });
  }

  await db
    .update(userApiLimit)
    .set({ count: count - 1 })
    .where(eq(userApiLimit.userId, userId));

  return count ?? 0;
});
