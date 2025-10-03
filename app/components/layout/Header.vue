<template>
  <header
    class="z-40 w-full transition-all fixed top-0 duration-300"
    :class="
      sticky
        ? 'shadow-lg bg-white/80 dark:bg-dark-main-card/80 py-3'
        : 'shadow-none bg-transparent py-3'
    "
  >
    <div>
      <div class="container mx-auto flex items-center justify-between">
        <div>
          <AppLogo size="small" />
        </div>
        <nav
          class="hidden lg:flex grow items-center gap-8 justify-start md:ml-20"
        >
          <LayoutNavigationLink
            v-for="(item, index) in headerData"
            :key="index"
            :item="item"
          />
        </nav>
        <div class="flex items-center gap-4">
          <ColorMode />
          <template v-if="!session">
            <NuxtLink
              to="/auth?form=login"
              class="bg-transparent border border-primary text-primary px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white"
            >
              Sign In
            </NuxtLink>
            <NuxtLink
              to="/auth?form=register"
              class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Sign Up
            </NuxtLink>
          </template>
          <template v-else>
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
              <UAvatar size="2xl" icon="i-lucide-user" alt="User avatar" />
            </UDropdownMenu>

            <UModal
              v-model="openSetting"
              :overlay="false"
              title="Modal without overlay"
            >
              <UButton label="Open" color="neutral" variant="subtle" />

              <template #body>
                <Placeholder class="h-48" />
              </template>
            </UModal>
          </template>

          <button
            @click="navbarOpen = !navbarOpen"
            class="block lg:hidden p-2 rounded-lg"
            aria-label="Toggle mobile menu"
          >
            <span class="block w-6 h-0.5 bg-black"></span>
            <span class="block w-6 h-0.5 bg-black mt-1.5"></span>
            <span class="block w-6 h-0.5 bg-black mt-1.5"></span>
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <div
        v-if="navbarOpen"
        class="fixed top-0 left-0 w-full h-full bg-black/50 z-40"
        @click="navbarOpen = false"
      />
      <div
        ref="{mobileMenuRef}"
        class="lg:hidden fixed top-0 right-0 h-full w-full bg-white dark:bg-dark-main-bg shadow-lg transform transition-transform duration-300 max-w-xs z-50"
        :class="navbarOpen ? 'translate-x-0' : 'translate-x-full'"
      >
        <div class="flex items-center justify-between p-4">
          <h2 class="text-lg font-bold text-midnight_text">
            <AppLogo size="small" />
          </h2>

          <button
            @click="navbarOpen = false"
            class="bg-[url('/images/closed.svg')] bg-no-repeat bg-contain w-5 h-5 absolute top-0 right-0 mr-8 mt-8 dark:invert"
            aria-label="Close menu Modal"
          ></button>
        </div>
        <nav class="flex flex-col items-start p-4">
          <LayoutNavigationMobile
            v-for="(item, index) in headerData"
            :key="index"
            :item="item"
          />
          <div class="mt-4 flex flex-col gap-4 w-full">
            <template v-if="!session">
              <ColorMode />
              <NuxtLink
                href="#"
                class="bg-transparent border border-primary text-primary px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white"
                @click="navbarOpen = false"
              >
                Sign In
              </NuxtLink>
              <NuxtLink
                href="#"
                class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                @click="navbarOpen = false"
              >
                Sign Up
              </NuxtLink>
            </template>
            <template v-else>
              <UAvatar size="xl" icon="i-lucide-user" alt="User avatar" />
            </template>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { HeaderData } from "~/assets/data/route";
import type { DropdownMenuItem } from "@nuxt/ui";

const headerData = HeaderData;
const authStore = useMyAuthStore();
const { session } = storeToRefs(authStore);

const navbarOpen = ref(false);
const sticky = ref(false);
const openSetting = ref(false);

const items = ref<DropdownMenuItem[]>([
  {
    label: "Profile",
    icon: "i-lucide-user",
  },
  {
    label: "Settings",
    icon: "i-lucide-cog",
    onClick: () => {
      openSetting.value = true;
    },
  },
  {
    label: "Sign Out",
    icon: "i-lucide-log-out",
    onClick: () => {
      authStore.signOut();
    },
    color: "error",
  },
]);

const handleScroll = () => {
  sticky.value = window.scrollY >= 80;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

watch(navbarOpen, (val) => {
  if (val) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});
</script>
