<template>
  <div
    class="flex items-center gap-2 mb-4 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 p-2 rounded-md"
  >
    <UAvatar icon="i-lucide-message-circle" size="2xl" class="border" />
    <div class="flex-1">
      <h2 class="text-base font-semibold">{{ data?.name }}</h2>
      <p class="text-gray-600 text-sm line-clamp-2">{{ data?.content }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const data = inject<{ name: string; content: string }>("contact");
</script>
