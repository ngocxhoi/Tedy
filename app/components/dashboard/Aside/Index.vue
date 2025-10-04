<template>
  <aside
    id="logo-sidebar"
    class="flex flex-col items-center justify-between fixed top-0 left-0 z-40 w-64 h-screen pt-28 transition-transform -translate-x-full border-r border-gray-200 sm:translate-x-0 dark:border-gray-700"
    aria-label="Sidebar"
  >
    <div class="h-full px-3 pb-4 overflow-y-auto">
      <ul class="space-y-3 font-medium">
        <DashboardAsideLink
          v-for="(item, index) in asideLinks"
          :key="index"
          :item="item"
        />
      </ul>
      <div
        id="dropdown-cta"
        class="p-4 mt-6 rounded-lg bg-blue-50 dark:bg-blue-900"
        role="alert"
      >
        <div class="flex items-center mb-3">
          <span
            class="bg-orange-100 text-orange-800 text-sm font-semibold me-2 px-2.5 py-0.5 rounded-sm dark:bg-orange-200 dark:text-orange-900"
            >Beta</span
          >
          <button
            type="button"
            class="ms-auto -mx-1.5 -my-1.5 bg-blue-50 inline-flex justify-center items-center w-6 h-6 text-blue-900 rounded-lg focus:ring-2 focus:ring-blue-400 p-1 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-400 dark:hover:bg-blue-800"
            data-dismiss-target="#dropdown-cta"
            aria-label="Close"
          >
            <span class="sr-only">Close</span>
            <svg
              class="w-2.5 h-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
        <p class="mb-3 text-sm text-blue-800 dark:text-blue-400">
          Preview the new Flowbite dashboard navigation! You can turn the new
          navigation off for a limited time in your profile.
        </p>
        <a
          class="text-sm text-blue-800 underline font-medium hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
          href="#"
          >Turn new navigation off</a
        >
      </div>
    </div>

    <div
      class="w-full border-t py-6 px-3 border-gray-200 sm:translate-x-0 dark:border-gray-700 space-y-3"
    >
      <p class="text-xs text-gray-600 dark:text-gray-300">
        {{ token }} / {{ maxTokens }} tokens left
      </p>
      <UProgress
        :model-value="Number(token)"
        :max="maxTokens"
        color="neutral"
        size="sm"
      />
      <UModal
        v-model:open="plansModal"
        :close="{ onClick: () => (plansModal = false) }"
        fullscreen
      >
        <UButton
          block
          label="Get more token"
          variant="subtle"
          class="cursor-pointer"
          @click="plansModal = true"
        />
        <template #body>
          <DashboardPricingPlans @close="plansModal = false" />
        </template>
      </UModal>
    </div>
  </aside>
</template>

<script lang="ts" setup>
import { AsideLinks } from "~/assets/data/route";

const asideLinks = AsideLinks;
const token = useCookie("tokens");
const plansModal = ref(false);
const plan = useCookie("plan");
const maxTokens = computed(() =>
  plan.value === "free" ? 15 : plan.value === "pro" ? 30 : 100
);
</script>
