import type { EventHandler, EventHandlerRequest } from "h3";
import { updateApiLimit } from "../api/db/api-limit";

export const defineWrappedResponseHandler = <T extends EventHandlerRequest, D>(
  handler: EventHandler<T, D>
): EventHandler<T, D> =>
  defineEventHandler<T>(async (event) => {
    if (!event.context.userId) {
      throw createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
      });
    }
    let tokens = getCookie(event, "tokens");
    if (!tokens || Number(tokens) <= 0) {
      throw createError({
        statusCode: 500,
        statusMessage: "API limit reached.",
      });
    }
    try {
      const response = await handler(event);
      const token = await updateApiLimit(event.context.userId);

      if (tokens) {
        setCookie(event, "tokens", String(token));
      }
      return response;
    } catch (err) {
      // Error handling
      return { err };
    }
  });
