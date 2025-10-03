import { defineStore } from "pinia";
import { authClient } from "~~/lib/better-auth/auth-client";

export const useMyAuthStore = defineStore(
  "auth-store",
  () => {
    const session = ref<SessionGlobal | null>(null);
    const loading = ref(false);

    const user = computed(() => session.value?.user);

    async function getSession() {
      const { data } = await authClient.getSession();
      const token = await $fetch<number>("/api/db/get-limit");
      useCookie("tokens").value = String(token);

      session.value = data;
      return data;
    }

    async function ssrSession() {
      try {
        loading.value = true;
        const data = await authClient.useSession(useFetch);
        return data.data.value;
      } catch (error) {
      } finally {
        loading.value = false;
      }
    }

    async function init() {
      loading.value = true;
      try {
        if (session.value) return;
        const data = await getSession();
        session.value = data;
        return data;
      } catch (error) {
        console.error("Error from store: ", error);
      } finally {
        loading.value = false;
      }
    }

    async function signInWithGithub() {
      await authClient.signIn.social({
        provider: "github",
        errorCallbackURL: "/error",
        fetchOptions: {
          onSuccess: () => {
            navigateTo("/dashboard");
          },
        },
      });

      await init();
    }

    async function signInWithEmail(credentials: {
      email: string;
      password: string;
    }) {
      const data = await authClient.signIn.email({
        ...credentials,
        fetchOptions: {
          onSuccess: () => {
            navigateTo("/dashboard");
          },
        },
      });

      await init();
      await navigateTo("/dashboard");

      return data;
    }

    async function signUpWithEmail(credentials: {
      name: string;
      email: string;
      password: string;
    }) {
      const data = await authClient.signUp.email({
        ...credentials,
        fetchOptions: {
          onSuccess: async ({ data }) => {
            await $fetch("/api/db/create-limit", {
              method: "POST",
              body: {
                userId: data.user?.id,
              },
            });
            await navigateTo("/auth/verify");
          },
        },
      });

      return data;
    }

    async function signOut() {
      await authClient.signOut();

      await navigateTo("/auth");
      session.value = null;
    }

    async function resendEmailVerification() {
      // await authClient.sendVerificationEmail();
    }

    return {
      session,
      loading,
      user,
      init,
      getSession,
      ssrSession,
      signInWithGithub,
      signInWithEmail,
      signUpWithEmail,
      signOut,
      resendEmailVerification,
    };
  },
  {
    // persist: true
  }
);
