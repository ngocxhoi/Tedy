<template>
  <DashboardNav />
  <DashboardAside />

  <div class="p-4 pt-20 sm:ml-64 min-w-lg relative">
    <div class="size-full [&_*]:z-10 relative">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup></script>
