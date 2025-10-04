import { eq } from "drizzle-orm";
import db from "~~/lib/drizzle";
import { userApiLimit } from "~~/lib/drizzle/db/api-limit";

export default defineEventHandler(
  async (
    event
  ): Promise<{ count: number; pricingPlan: "free" | "pro" | "custom" }> => {
    const userId = event.context.userId;
    if (!userId) {
      throw createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
      });
    }

    const apiLimit = await db
      .select({
        count: userApiLimit.count,
        pricingPlan: userApiLimit.pricingPlan,
      })
      .from(userApiLimit)
      .where(eq(userApiLimit.userId, userId));

    const { count, pricingPlan } = apiLimit[0];

    return {
      count: count || 0,
      pricingPlan: pricingPlan || "free",
    };
  }
);
