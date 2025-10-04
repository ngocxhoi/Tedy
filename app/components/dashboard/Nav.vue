<template>
  <nav
    class="fixed top-0 z-50 h-24 w-full border-b border-gray-200 dark:border-gray-700 min-w-lg"
    :class="
      sticky
        ? 'shadow-lg bg-white/80 dark:bg-dark-main-card/80 py-3'
        : 'shadow-none bg-transparent py-3'
    "
  >
    <div class="px-3 py-3 lg:px-5 lg:pl-3">
      <div class="flex w-full items-center justify-between">
        <AppLogo size="small" />

        <div class="flex gap-4 items-center">
          <div
            class="relative hidden xl:mr-10 2xl:mr-60 isolate lg:flex flex-nowrap items-center gap-x-6 overflow-hidden bg-gray-800/50 px-6 py-2.5 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10 sm:px-3.5 sm:before:flex-1 ml-40 rounded-full border-2 border-dashed border-gray-400 dark:border-gray-700"
          >
            <div
              class="absolute top-1/2 left-[max(-7rem,calc(50%-52rem))] -z-10 -translate-y-1/2 transform-gpu blur-2xl"
              aria-hidden="true"
            >
              <div
                class="aspect-577/310 w-144.25 bg-linear-to-r from-[#ff80b5] to-[#9089fc] opacity-40"
                style="
                  clip-path: polygon(
                    74.8% 41.9%,
                    97.2% 73.2%,
                    100% 34.9%,
                    92.5% 0.4%,
                    87.5% 0%,
                    75% 28.6%,
                    58.5% 54.6%,
                    50.1% 56.8%,
                    46.9% 44%,
                    48.3% 17.4%,
                    24.7% 53.9%,
                    0% 27.9%,
                    11.9% 74.2%,
                    24.9% 54.1%,
                    68.6% 100%,
                    74.8% 41.9%
                  );
                "
              />
            </div>
            <div
              class="absolute top-1/2 left-[max(45rem,calc(50%+8rem))] -z-10 -translate-y-1/2 transform-gpu blur-2xl"
              aria-hidden="true"
            >
              <div
                class="aspect-577/310 w-144.25 bg-linear-to-r from-[#ff80b5] to-[#9089fc] opacity-40"
                style="
                  clip-path: polygon(
                    74.8% 41.9%,
                    97.2% 73.2%,
                    100% 34.9%,
                    92.5% 0.4%,
                    87.5% 0%,
                    75% 28.6%,
                    58.5% 54.6%,
                    50.1% 56.8%,
                    46.9% 44%,
                    48.3% 17.4%,
                    24.7% 53.9%,
                    0% 27.9%,
                    11.9% 74.2%,
                    24.9% 54.1%,
                    68.6% 100%,
                    74.8% 41.9%
                  );
                "
              />
            </div>
            <div class="flex flex-wrap items-center gap-x-4 gap-y-2">
              <p class="text-sm/6 text-gray-100 truncate">
                <strong class="font-semibold">GeneriCon 2023</strong
                ><svg
                  viewBox="0 0 2 2"
                  class="mx-2 inline size-0.5 fill-current"
                  aria-hidden="true"
                >
                  <circle cx="1" cy="1" r="1" />
                </svg>
                >Join us in Denver from June 7 – 9 to see what’s coming next.
              </p>
              <a
                href="#"
                class="hidden xl:flex flex-none rounded-full bg-white/10 px-3.5 py-1 text-sm font-semibold text-white shadow-xs inset-ring-white/20 hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >Register now <span aria-hidden="true">&rarr;</span></a
              >
            </div>
            <div class="flex flex-1 justify-end">
              <button
                type="button"
                class="-m-3 p-3 focus-visible:-outline-offset-4"
              >
                <span class="sr-only">Dismiss</span>
                <UIcon
                  name="i-lucide-x"
                  class="size-5 text-gray-100"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
          <ColorMode />
          <UDropdownMenu
            :items="items"
            :content="{
              align: 'end',
              side: 'bottom',
              sideOffset: 8,
            }"
            :ui="{
              content: 'w-48',
            }"
          >
            <UBadge
              color="neutral"
              variant="subtle"
              class="gap-2 select-none cursor-pointer"
            >
              <UAvatar
                size="md"
                class="border border-gray-700"
                icon="i-lucide-user"
                alt="User avatar"
              />
              <p class="text-base font-medium">{{ user?.name }}</p>
            </UBadge>
          </UDropdownMenu>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import type { DropdownMenuItem } from "@nuxt/ui";
import { LazySettingModal } from "#components";

const { user } = storeToRefs(useMyAuthStore());

const overlay = useOverlay();

const modal = overlay.create(LazySettingModal);
const items = ref<DropdownMenuItem[]>([
  {
    label: "Profile",
    icon: "i-lucide-user",
  },
  {
    label: "Settings",
    icon: "i-lucide-cog",
    onClick: () => {
      modal.open();
    },
  },
  {
    label: "Sign Out",
    icon: "i-lucide-log-out",
    onClick: () => {
      useMyAuthStore().signOut();
    },
    color: "error",
  },
]);
const sticky = ref(false);

const handleScroll = () => {
  sticky.value = window.scrollY >= 80;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
