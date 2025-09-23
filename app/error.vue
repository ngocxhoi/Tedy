<script setup lang="ts">
import type { NuxtError } from "#app";

const route = useRoute();
// const error = route.query.error || "An error occurred";
const props = defineProps({
  error: Object as () => NuxtError as any,
});
</script>

<template>
  <div
    class="flex items-center justify-center h-screen bg-main-bg dark:bg-dark-main-bg text-main-text dark:text-dark-main-text"
  >
    <div class="text-center space-y-4">
      <h1 class="text-6xl font-bold text-red-500">{{ error?.statusCode }}</h1>
      <h2 class="text-3xl font-bold mb-4">
        Oh no! {{ error?.message || error }}
      </h2>
      <p class="text-lg text-gray-600 mb-8">
        {{ error || "Sorry, something went wrong. Please try again later." }}
      </p>
      <NuxtLink
        to="/"
        class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
        >Go back home</NuxtLink
      >
    </div>
  </div>
</template>
