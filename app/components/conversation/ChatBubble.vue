<template>
  <div
    class="flex items-start gap-2.5"
    :class="{ 'flex-row-reverse': chat.role === 'user' }"
  >
    <UAvatar
      size="lg"
      :icon="chat.role === 'user' ? 'i-lucide-user' : 'i-lucide-bot'"
      class="border border-gray-700"
      :class="{ 'border-primary': chat.role == 'system' }"
    />
    <div
      class="flex flex-col gap-1 w-fit max-w-[calc(100%-200px)]"
      :class="{ 'items-end': chat.role === 'user' }"
    >
      <div class="flex items-center space-x-2 rtl:space-x-reverse">
        <span class="text-sm font-semibold text-gray-900 dark:text-white">{{
          chat.role === "user" ? "You" : "Bot"
        }}</span>
        <!-- <span class="text-sm font-normal text-gray-500 dark:text-gray-400">{{
          chat.time
        }}</span> -->
      </div>
      <div
        class="flex flex-col leading-1.5 p-4 border-gray-200"
        :class="[
          chat.role === 'system'
            ? 'rounded-xl rounded-ss-none bg-gray-100 dark:bg-gray-700'
            : 'rounded-xl rounded-se-none bg-blue-500',
        ]"
      >
        <div
          v-html="chat.content"
          class="text-sm font-normal text-gray-900 dark:text-white text-left"
          :class="[chat.role === 'user' && 'text-white']"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ChatMessage } from "~~/shared/types";

const props = defineProps<{
  chat: ChatMessage;
}>();
</script>
