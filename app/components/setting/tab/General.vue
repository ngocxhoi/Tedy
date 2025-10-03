<template>
  <div
    class="flex items-center justify-between box-border p-1 border-b dark:border-gray-700"
  >
    <p class="text-sm">Theme</p>
    <USelect
      v-model="mode"
      :items="itemsMode"
      :icon="iconMode"
      class="w-32"
      size="sm"
      variant="ghost"
    />
  </div>

  <div
    class="flex items-center justify-between box-border p-1 border-b dark:border-gray-700"
  >
    <p class="text-sm">Color</p>
    <USelect
      v-model="color"
      :items="itemsColor"
      :icon="iconColor"
      class="w-32"
      size="sm"
      variant="ghost"
    />
  </div>

  <div
    class="flex items-center justify-between box-border p-1 dark:border-gray-700"
  >
    <p class="text-sm">Language</p>
    <USelect
      v-model="language"
      :items="itemsLanguage"
      :icon="iconLanguage"
      class="w-32"
      size="sm"
      variant="ghost"
    />
  </div>
</template>

<script lang="ts" setup>
const itemsMode = [
  { label: "Light", value: "light", icon: "i-lucide-sun" },
  { label: "Dark", value: "dark", icon: "i-lucide-moon" },
  { label: "System", value: "system", icon: "i-lucide-laptop" },
];
const itemsColor = [
  { label: "Red", value: "red", icon: "i-ion-ellipse" },
  { label: "Green", value: "green", icon: "i-ion-ellipse" },
  { label: "Blue", value: "blue", icon: "i-ion-ellipse" },
  { label: "Purple", value: "purple", icon: "i-ion-ellipse" },
  { label: "Pink", value: "pink", icon: "i-ion-ellipse" },
  { label: "Orange", value: "orange", icon: "i-ion-ellipse" },
];
const itemsLanguage = [
  { label: "English", value: "en", icon: "i-twemoji-flag-united-states" },
  { label: "Spanish", value: "es", icon: "i-twemoji-flag-spain" },
  { label: "French", value: "fr", icon: "i-twemoji-flag-france" },
  { label: "German", value: "de", icon: "i-twemoji-flag-germany" },
  { label: "Chinese", value: "zh", icon: "i-twemoji-flag-china" },
  { label: "Japanese", value: "ja", icon: "i-twemoji-flag-japan" },
];

const mode = ref("system");
const color = ref("green");
const language = ref("en");

const iconMode = computed(
  () => itemsMode.find((item) => item.value === mode.value)?.icon
);
const iconColor = computed(
  () => itemsColor.find((item) => item.value === color.value)?.icon
);
const iconLanguage = computed(
  () => itemsLanguage.find((item) => item.value === language.value)?.icon
);
</script>
