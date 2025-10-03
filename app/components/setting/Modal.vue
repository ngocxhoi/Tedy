<script setup lang="ts">
const emit = defineEmits<{ close: [boolean] }>();
</script>

<template>
  <UModal :dismissible="false" :close="{ onClick: () => emit('close', false) }">
    <template #header>
      <h3 class="text-lg font-semibold">Settings</h3>
    </template>

    <div>
      <p class="text-sm text-gray-500">
        This is a placeholder for settings content. You can add your settings
        options here.
      </p>
    </div>

    <template #footer>
      <div class="flex gap-2">
        <UButton
          color="neutral"
          label="Dismiss"
          @click="emit('close', false)"
        />
        <UButton label="Success" @click="emit('close', true)" />
      </div>
    </template>
  </UModal>
</template>
