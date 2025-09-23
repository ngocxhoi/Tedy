<template>
  <div className="relative w-full">
    <NuxtLink
      :to="item.href"
      @click="item.submenu ? handleToggle : undefined"
      className="flex items-center justify-between w-full py-2 text-muted focus:outline-hidden"
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
    <div v-if="item.submenu && submenuOpen" className="bg-white p-2 w-full">
      {item.submenu.map((subItem, index) => (
      <NuxtLink
        v-for="(subItem, index) in item.submenu"
        :key="index"
        :to="subItem.href"
        className="block py-2 text-gray-500 hover:bg-gray-200"
      >
        {{ subItem.label }}
      </NuxtLink>
      ))}
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  item: headerItem;
}>();

const route = useRoute();

const submenuOpen = ref(false);

const handleToggle = () => {
  submenuOpen.value = !submenuOpen.value;
};
</script>
