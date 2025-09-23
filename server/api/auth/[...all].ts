import { auth } from "~~/lib/better-auth/auth";

export default defineEventHandler((event) => {
  return auth.handler(toWebRequest(event));
});
