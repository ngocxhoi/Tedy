<script setup lang="ts">
const emit = defineEmits<{ close: [boolean] }>();
import type { TabsItem } from "@nuxt/ui";

const route = useRoute();
const router = useRouter();

const items = ref<TabsItem[]>([
  {
    label: "General",
  },
  {
    label: "Account",
  },
  {
    label: "Security",
  },
]);
const activeTabIndex = ref(0);
const activeTab = computed(
  () => items.value[activeTabIndex.value]?.label ?? "General"
);

const handleClose = () => {
  emit("close", false);
  router.replace({
    path: route.path,
    query: {},
    hash: "",
  });
};

watch(activeTab, (newVal) => {
  router.replace({
    path: route.path,
    query: { tab: newVal.toLowerCase() },
    hash: "#control-active-item",
  });
});
</script>

<template>
  <UModal
    title="Settings"
    :dismissible="false"
    :close="{ onClick: () => handleClose() }"
    class="w-full max-w-3xl h-[500px]"
  >
    <template #body>
      <div class="flex items-start h-full">
        <UTabs
          v-model="activeTabIndex"
          orientation="vertical"
          variant="link"
          :items="items"
        />
        <UCard class="flex-1 ml-4 h-full">
          <template #header>
            <h2 class="text-lg font-semibold">{{ activeTab }}</h2>
          </template>

          <div class="h-full overflow-y-auto space-y-4">
            <SettingTabGeneral v-if="activeTab === 'General'" />
            <SettingTabAccount v-else-if="activeTab === 'Account'" />
            <SettingTabSecurity v-else-if="activeTab === 'Security'" />
          </div>
        </UCard>
      </div>
    </template>
  </UModal>
</template>
