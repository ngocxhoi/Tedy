import { eq } from "drizzle-orm";
import type { EventHandler, EventHandlerRequest } from "h3";
import { userApiLimit } from "~~/lib/drizzle/db/api-limit";

export const defineWrappedResponseHandler = <T extends EventHandlerRequest, D>(
  handler: EventHandler<T, D>
): EventHandler<T, D> =>
  defineEventHandler<T>(async (event) => {
    try {
      const response = await handler(event);

      const protectedRoutes = ["/api/ai", "/api/cloudinary"];
      if (protectedRoutes.some((route) => event.path.startsWith(route))) {
        const { userId } = event.context.auth;
        if (!userId) {
          throw createError({
            statusCode: 401,
            message: "Unauthorized",
          });
        }

        const db = event.context.db;
        if (!db) {
          throw createError({
            statusCode: 500,
            message: "Database not configured",
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
      }
      return { response };
    } catch (err) {
      // Error handling
      return { err };
    }
  });
