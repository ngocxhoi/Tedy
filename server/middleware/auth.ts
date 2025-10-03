import { auth } from "~~/lib/better-auth/auth";
// import { updateApiLimit } from "../api/db/api-limit";

export default defineEventHandler(async (event) => {
  const protectedRoutes = ["/api/ai", "/api/cloudinary", "/api/db"];

  if (protectedRoutes.some((route) => event.path.startsWith(route))) {
    const session = await auth.api.getSession(event);
    if (session) {
      event.context.userId = session?.user.id;
      // const token = await updateApiLimit(event.context.userId);
      // event.context.tokens = token;
    } else {
      if (!event.path.startsWith("/api/auth"))
        return createError({
          statusCode: 401,
          statusMessage: "Unauthorized",
          message: "You must be logged in to access this resource.",
        });
    }
  }

  return; // Cho phép route frontend tiếp tục, client sẽ xử lý
});
