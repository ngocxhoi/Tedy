<template>
  <NuxtLink
    v-if="size === 'small'"
    to="/"
    class="flex items-start gap-1 select-none"
  >
    <NuxtImg src="/app_logo.png" sizes="50" alt="Tedy" />
    <span class="text-2xl font-black mt-1 text-[#3873e0]">Tedy</span>
  </NuxtLink>
  <NuxtLink
    v-if="size === 'medium'"
    to="/"
    class="flex items-start gap-1 select-none"
  >
    <NuxtImg src="/app_logo.png" sizes="70" alt="Tedy" />
    <span class="text-3xl font-black mt-2 text-[#3873e0]">Tedy</span>
  </NuxtLink>
  <NuxtLink
    v-if="size === 'large'"
    to="/"
    class="flex items-start gap-1 select-none"
  >
    <NuxtImg src="/app_logo.png" sizes="90" alt="Tedy" />
    <span class="text-4xl font-black mt-4 text-[#3873e0]">Tedy</span>
  </NuxtLink>
</template>

<script lang="ts" setup>
defineProps<{
  size: "small" | "medium" | "large";
}>();
</script>
