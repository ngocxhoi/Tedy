<template>
  <UForm
    :state="state"
    :schema="schemaRegister"
    @submit.prevent="onSubmit"
    class="space-y-4 w-80 md:w-96"
  >
    <div class="flex gap-2">
      <UFormField required label="First Name" name="firstName">
        <UInput
          v-model="state.firstName"
          size="lg"
          placeholder="John"
          icon="i-lucide-user"
          class="w-full [&>input]:bg-transparent"
        />
      </UFormField>
      <UFormField required label="Last Name" name="lastName">
        <UInput
          v-model="state.lastName"
          size="lg"
          placeholder="Doe"
          icon="i-lucide-user"
          class="w-full [&>input]:bg-transparent"
        />
      </UFormField>
    </div>

    <UFormField required label="Email Address" name="email">
      <UInput
        v-model="state.email"
        size="lg"
        placeholder="eg: 8o0Yw@example.com"
        type="email"
        icon="i-lucide-mail"
        class="w-full [&>input]:bg-transparent"
      />
    </UFormField>

    <UFormField required label="Password" name="password">
      <UInput
        v-model="state.password"
        size="lg"
        placeholder="******"
        :type="showPassword ? 'text' : 'password'"
        icon="i-lucide-lock"
        class="w-full [&>input]:bg-transparent"
      >
        <template #trailing>
          <div @click="showPassword = !showPassword">
            <UIcon v-if="showPassword" name="i-lucide-eye" />
            <UIcon v-else name="lucide:eye-off" />
          </div>
        </template>
      </UInput>
    </UFormField>

    <UFormField required label="Confirm Password" name="confirmPassword">
      <UInput
        v-model="state.confirmPassword"
        size="lg"
        placeholder="******"
        :type="showConfirmPassword ? 'text' : 'password'"
        icon="i-lucide-lock"
        class="w-full [&>input]:bg-transparent"
      >
        <template #trailing>
          <div @click="showConfirmPassword = !showConfirmPassword">
            <UIcon v-if="showConfirmPassword" name="i-lucide-eye" />
            <UIcon v-else name="lucide:eye-off" />
          </div>
        </template>
      </UInput>
    </UFormField>

    <div className="flex items-center">
      <input
        type="checkbox"
        id="terms"
        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        required
      />
      <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
        I agree to the{{ " " }}
        <button type="button" className="text-blue-600 hover:text-blue-700">
          Terms of Service</button
        >{{ " " }}and{{ " " }}
        <button type="button" className="text-blue-600 hover:text-blue-700">
          Privacy Policy
        </button>
      </label>
    </div>

    <UButton
      type="submit"
      block
      size="xl"
      class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium transition-all duration-200 transform hover:scale-[1.02]"
      :disabled="isLoading"
      :loading="isLoading"
    >
      Sign Up
    </UButton>

    <div class="relative">
      <div class="absolute inset-0 flex items-center">
        <span class="w-full border-t border-gray-200" />
      </div>
      <div class="relative flex justify-center text-xs uppercase">
        <span
          class="bg-white dark:bg-dark-main-card px-2 text-second-text dark:text-dark-second-text"
          >Or sign up with</span
        >
      </div>
    </div>

    <div class="grid grid-cols-2 gap-3">
      <UButton
        type="button"
        variant="outline"
        color="neutral"
        size="xl"
        class="bg-transparent flex items-center justify-center"
        disabled
      >
        <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="currentColor"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="currentColor"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="currentColor"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        Google
      </UButton>
      <UButton
        type="button"
        color="neutral"
        variant="outline"
        size="xl"
        class="bg-transparent flex items-center justify-center cursor-pointer"
        :loading="loading"
        :disabled="loading"
      >
        <svg
          class="w-5 h-5 mr-2"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 0.297C5.37 0.297 0 5.667 0 12.297c0 5.289 3.438 9.773 8.205 11.364.6.111.82-.261.82-.578 0-.285-.011-1.04-.017-2.042-3.338.726-4.042-1.61-4.042-1.61-.546-1.388-1.333-1.758-1.333-1.758-1.09-.745.082-.73.082-.73 1.205.084 1.839 1.236 1.839 1.236 1.07 1.833 2.807 1.304 3.492.997.108-.776.418-1.305.76-1.605-2.665-.305-5.466-1.332-5.466-5.931 0-1.31.469-2.382 1.236-3.222-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.49 11.49 0 0 1 3.003-.404c1.02.005 2.047.137 3.003.404 2.29-1.552 3.297-1.23 3.297-1.23.655 1.652.243 2.873.119 3.176.77.84 1.236 1.912 1.236 3.222 0 4.61-2.804 5.624-5.475 5.921.43.371.813 1.102.813 2.222 0 1.605-.015 2.898-.015 3.293 0 .319.216.694.825.576C20.565 22.065 24 17.582 24 12.297c0-6.63-5.37-12-12-12"
          />
        </svg>
        Github
      </UButton>
    </div>
  </UForm>
</template>

<script lang="ts" setup>
import type { FormSubmitEvent } from "@nuxt/ui";
import { schemaRegister, type SchemaRegister } from "~~/lib/zod/auth";

const toast = useToast();
const { signUpWithEmail } = useMyAuthStore();

const loading = ref(false);

const state = reactive<Partial<SchemaRegister>>({
  firstName: undefined,
  lastName: undefined,
  email: undefined,
  password: undefined,
  confirmPassword: undefined,
});
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const isLoading = ref(false);

async function onSubmit(event: FormSubmitEvent<SchemaRegister>) {
  const credentials = {
    name: event.data.firstName + " " + event.data.lastName,
    email: event.data.email,
    password: event.data.password,
  };

  try {
    isLoading.value = true;
    const res = await signUpWithEmail(credentials);
    if (res.error) throw res.error;

    toast.add({
      title: "Success",
      description: "User has been registered.",
      color: "success",
    });
  } catch (error: any) {
    toast.add({
      title: error.code || "Error",
      description: error.message || "Something went wrong.",
      color: "error",
    });
    if (error.code == "EMAIL_NOT_VERIFIED") navigateTo("/auth/verify");
  } finally {
    isLoading.value = false;
  }
}
</script>
