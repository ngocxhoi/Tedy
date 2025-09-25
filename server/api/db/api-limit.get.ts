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

  return count ?? 0;
});
