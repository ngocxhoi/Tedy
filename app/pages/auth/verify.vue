<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <div
      class="bg-main-card dark:bg-dark-main-card p-6 rounded-lg shadow-md text-center"
    >
      <div class="w-full flex items-center justify-center">
        <AppLogo size="medium" />
      </div>
      <h2 class="text-2xl font-bold mb-4">Verify Your Email</h2>
      <p class="text-gray-600 mb-6">
        We have sent a verification link to your email. Please check your inbox
        and follow the instructions to verify your account.
      </p>
      <UButton
        :loading="countDown > 0"
        :disabled="countDown > 0"
        color="primary"
        size="lg"
        @click="resendEmailVerification"
      >
        Resend Verification Email
      </UButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useMyAuthStore } from "~/stores/auth";

definePageMeta({
  layout: "auth",
});
useSeoMeta({
  title: "Verify",
});

const route = useRoute();
const { resendEmailVerification, init } = useMyAuthStore();
const countDown = ref(60);

onMounted(async () => {
  const token = route.query?.token as string;
  console.log("Token: ", token);
  if (token) {
    try {
      await $fetch(`/api/auth/verify-email?token=${token}`);
      await init();
      await navigateTo("/dashboard");
    } catch (error: any) {
      console.log("Error from verify: ", error);
    }
  }
});
</script>
