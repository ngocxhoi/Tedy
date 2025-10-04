<template>
  <div class="min-h-screen w-full flex flex-1">
    <div
      class="relative h-full w-full lg:w-1/2 flex items-center justify-center md:p-4 bg-zinc-100 dark:bg-zinc-800"
    >
      <div
        class="min-h-screen bg-gradient-to-br flex items-center justify-center p-4"
      >
        <div class="w-full max-w-md">
          <div class="text-center mb-8">
            <div class="flex justify-center">
              <AppLogo size="small" />
            </div>
            <h1 class="text-3xl font-bold my-2">
              {{ isLoginForm ? "Welcome You Back" : "Create Your Account" }}
            </h1>
            <p class="text-second-text dark:text-dark-second-text">
              {{
                isLoginForm
                  ? "Sign in to your account to continue"
                  : "Join us and start your journey today"
              }}
            </p>
          </div>

          <div
            class="dark:bg-dark-main-card rounded-2xl shadow-xl border border-main-border dark:border-dark-main-border p-8"
          >
            <div class="space-y-6">
              <div
                class="flex shadow-custom dark:shadow-custom-dark border-main-border rounded-lg p-1"
              >
                <button
                  @click="isLoginForm = true"
                  class="flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200"
                  :class="[
                    isLoginForm
                      ? 'bg-second-card dark:bg-white text-gray-900 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700',
                  ]"
                >
                  Sign In
                </button>
                <button
                  @click="isLoginForm = false"
                  class="flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200"
                  :class="[
                    isLoginForm
                      ? 'text-gray-500 hover:text-gray-700'
                      : ' bg-second-card dark:bg-white text-gray-900 shadow-sm',
                  ]"
                >
                  Sign Up
                </button>
              </div>

              <div class="transition-all duration-300 ease-in-out">
                <template v-if="isLoginForm">
                  <AuthLogin />
                </template>
                <template v-else>
                  <AuthRegister />
                </template>
              </div>
            </div>
          </div>

          <div class="text-center mt-6">
            <p class="text-sm text-gray-500">
              {{
                isLoginForm
                  ? "Don't have an account? "
                  : "Already have an account? "
              }}
              <button
                @click="isLoginForm = !isLoginForm"
                class="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                {{ isLoginForm ? "Sign up" : "Sign in" }}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="w-1/2 items-center justify-center md:p-4 hidden lg:flex">
      <div class="max-w-80">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea quas
        perspiciatis, voluptates minima libero aliquid ipsum minus facilis ad
        dolore nobis culpa similique nostrum saepe sunt obcaecati placeat?
        Voluptas, ab.
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
useSeoMeta({
  title: "Auth",
});

const route = useRoute();
const router = useRouter();

const isLoginForm = ref(
  !route.query.form ? true : route.query.form === "login"
);

watch(isLoginForm, (newVal) => {
  const query = { form: newVal ? "login" : "register" };
  router.replace({ query });
});
</script>
