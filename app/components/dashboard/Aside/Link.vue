<template>
  <li>
    <NuxtLink
      :to="item.href"
      class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
      :class="{
        'bg-gray-100 dark:bg-gray-700 text-primary': item.href === route.path,
      }"
    >
      <UIcon
        :name="item.icon"
        :size="24"
        :class="{ 'text-primary': item.href === route.path }"
      />
      <span
        class="ms-3"
        :class="{ 'text-primary': item.href === route.path }"
        >{{ item.label }}</span
      >
    </NuxtLink>
  </li>
</template>

<script lang="ts" setup>
const props = defineProps<{
  item: asideLinksData;
}>();

const route = useRoute();
</script>
