<template>
  <div class="custom-border text-left">
    <h2
      class="text-2xl text-main-text dark:text-dark-main-text font-bold"
      :class="clName"
    >
      {{ title }}
    </h2>
    <p v-if="description" class="text-base text-gray-600 dark:text-gray-300">
      {{ description }}
    </p>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  title: string;
  description?: string;
  clName?: string;
}>();
</script>
