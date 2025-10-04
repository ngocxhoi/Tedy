import { eq } from "drizzle-orm";
import db from "~~/lib/drizzle";
import { userApiLimit } from "~~/lib/drizzle/db/api-limit";

const getApiLimit = async (userId: string) => {
  if (!userId) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
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
      statusMessage: "API limit reached.",
    });
  }

  return count;
};

const updateApiLimit = async (userId: string) => {
  if (!userId) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  const count = await getApiLimit(userId);

  await db
    .update(userApiLimit)
    .set({ count: count - 1 })
    .where(eq(userApiLimit.userId, userId));

  return count - 1;
};

const subscribeApiLimit = async (
  userId: string,
  tokens: number,
  plan: string
) => {
  if (!userId) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  const apiLimit = await db
    .select({ count: userApiLimit.count })
    .from(userApiLimit)
    .where(eq(userApiLimit.userId, userId));
  const { count } = apiLimit[0];

  await db
    .update(userApiLimit)
    .set({
      count: (count || 0) + tokens,
      pricingPlan: plan as "free" | "pro" | "custom",
      updatedAt: new Date(),
    })
    .where(eq(userApiLimit.userId, userId));

  return (count || 0) + tokens;
};

export { getApiLimit, updateApiLimit, subscribeApiLimit };
