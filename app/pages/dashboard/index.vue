<template>
  <LayoutDashboard>
    <div
      class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14 text-center"
    >
      <h2 class="text-4xl text-main-text dark:text-dark-main-text font-bold">
        Explore the power of AI
      </h2>
      <p class="text-lg text-gray-600 dark:text-gray-300">
        Get started with our AI-powered platform and unlock the full potential
        of your business.
      </p>
    </div>

    <div
      class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14 text-center grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 xl:gap-8"
    >
      <UCard
        class="h-80 hover:scale-105 transition-transform"
        v-for="el in 14"
      />
    </div>
  </LayoutDashboard>
</template>

<script lang="ts" setup>
useSeoMeta({
  title: "Dashboard",
});
</script>
