<template>
  <div class="min-h-screen w-full relative">
    <div
      class="fixed inset-0 z-0"
      style="
        background: '#ffffff';
        background-image: radial-gradient(
          circle at top center,
          rgba(70, 130, 180, 0.5),
          transparent 70%
        );
        filter: 'blur(80px)';
        background-repeat: 'no-repeat';
      "
    />
    <UApp>
      <NuxtRouteAnnouncer />
      <div v-if="route.path == '/'">
        <LayoutHeader />
        <NuxtPage />
        <LayoutFooter />
      </div>
      <template v-else>
        <NuxtPage />
      </template>
    </UApp>
  </div>
</template>

<script lang="ts" setup>
const appConfig = useAppConfig();
useHead({
  titleTemplate: (titleChunk: string | undefined): any => {
    return titleChunk ? `${titleChunk} / ${appConfig.title}` : appConfig.title;
  },
});

const route = useRoute();
</script>
