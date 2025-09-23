<template>
  <div
    class="relative"
    onMouseEnter="{handleMouseEnter}"
    onMouseLeave="{handleMouseLeave}"
  >
    <NuxtLink
      :to="item.href"
      class="text-lg flex font-medium hover:text-primary capitalized"
      :class="route.path === item.href && 'text-primary'"
    >
      {{ item.label }}
      <svg
        v-if="item.submenu"
        xmlns="http://www.w3.org/2000/svg"
        width="1.5em"
        height="1.5em"
        viewBox="0 0 24 24"
      >
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="m7 10l5 5l5-5"
        />
      </svg>
    </NuxtLink>
    <div
      v-if="submenuOpen"
      class="absolute py-2 left-0 mt-0.5 w-60 dark:text-white shadow-lg rounded-lg"
    >
      <NuxtLink
        v-for="subItem in item.submenu"
        :key="subItem.href"
        :to="subItem.href"
        class="block px-4 py-2 text-black dark:text-white hover:bg-primary"
        :class="
          route.path === subItem.href
            ? 'bg-primary text-white'
            : 'text-black dark:text-white hover:bg-primary'
        "
      >
        {subItem.label}
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  item: headerItem;
}>();

const route = useRoute();

const submenuOpen = ref(false);
</script>
