export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.server) return;

  const { getSession, session } = useMyAuthStore();
  let isLoggedIn = undefined;

  if (session) {
    isLoggedIn = true;
  } else {
    const data = await getSession();
    isLoggedIn = !!data;
  }

  if (!isLoggedIn && to.path == "/auth/verify") return;

  if (!isLoggedIn && to.path != "/" && to.path != "/auth") {
    return navigateTo("/auth");
  }

  if (isLoggedIn && to.path.startsWith("/auth")) {
    return navigateTo("/dashboard");
  }
});
