<template>
  <UFormField
    label="API Rate Limit (requests per minute)"
    class="border-b dark:border-gray-700 pb-2"
  >
    <p class="mt-2 text-sm text-gray-500">
      Set the maximum number of API requests allowed per minute to prevent
      exceeding the rate limit.
    </p>
    <UInput v-model="rateLimit" type="number" min="1" />
  </UFormField>
  <UFormField
    label="MFA (Multi-Factor Authentication)"
    class="border-b dark:border-gray-700 pb-2"
  >
    <div class="flex items-start justify-between">
      <p class="mt-2 text-sm text-gray-500">
        Enable Multi-Factor Authentication for added security.
      </p>
      <USwitch v-model="mfaEnabled" size="xl" />
    </div>
  </UFormField>
  <UFormField
    label="Logout from all devices"
    class="border-b dark:border-gray-700 pb-2"
  >
    <div class="flex items-start justify-between">
      <p class="mt-2 text-sm text-gray-500">
        Enable this option to log out from all devices.
      </p>
      <UButton
        label="Logout"
        variant="outline"
        color="error"
        @click="logoutFromAllDevices"
        class="rounded-full px-4"
      />
    </div>
  </UFormField>
</template>

<script lang="ts" setup>
const rateLimit = ref(60);
const mfaEnabled = ref(false);

const logoutFromAllDevices = () => {
  // Implement logout logic here
  alert("Logged out from all devices");
};
</script>
