<template>
  <div class="flex h-full">
    <!-- Sidebar -->
    <div class="hidden lg:block w-1/4 border-r border-gray-700 mr-4">
      <!-- Sidebar Header -->
      <header
        class="p-4 border-b border-gray-700 flex justify-between items-center bg-indigo-500 text-white"
      >
        <h1 class="text-xl font-semibold">History</h1>
        <div class="relative">
          <button id="menuButton" class="focus:outline-none">
            <UIcon name="i-lucide-menu" size="24" />
          </button>
          <!-- Menu Dropdown -->
        </div>
      </header>

      <!-- Contact List -->
      <div
        class="overflow-y-auto h-full py-3 pr-1 mb-9 pb-20 text-left no-scroll"
      >
        <template v-if="!chatLoading">
          <ConversationContactListItem v-for="el in 4" />
        </template>
        <template v-else>
          <div class="text-center p-4">
            <UIcon name="i-lucide-loader" size="24" class="animate-spin" />
          </div>
        </template>
      </div>
    </div>

    <!-- Main Chat Area -->
    <div class="flex-1 relative h-full">
      <!-- Chat Header -->
      <header class="p-4 text-gray-700 dark:text-gray-200">
        <h1 class="text-2xl font-semibold">Chatting</h1>
      </header>

      <!-- Chat Messages -->
      <div
        class="custom-border h-full max-h-[400px] overflow-y-auto p-4 no-scroll mt-4 space-y-1"
      >
        <ConversationChatBubble
          v-for="(chat, index) in chats"
          :key="`${chat.role}-${index}`"
          :chat="chat"
        />

        <ConversationChatBubble v-if="chatSending" :chat="chatbotThinking" />

        <div ref="messagesEndRef" class="mt-22" />
      </div>

      <!-- Chat Input -->
      <footer
        class="w-full border-t bg-white dark:bg-gray-800 border-gray-700 p-4 absolute bottom-0"
      >
        <div class="flex items-center w-full">
          <input
            v-model="input"
            type="text"
            placeholder="Type a message..."
            class="flex-1 p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
            @keyup.enter="addChat(input)"
          />
          <button
            :disabled="!input"
            @click="addChat(input)"
            class="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2 disabled:bg-gray-400"
          >
            Send
          </button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  chatLoading: boolean;
}>();
const toast = useToast();

const messagesEndRef = ref<HTMLDivElement>();
const chatSending = ref(false);
const input = ref("");
const chats = shallowRef<ChatMessage[]>([
  {
    role: "system",
    content: "<p>Hello, I am a bot. How can I help you?</p>",
  },
]);
const chatbotThinking: ChatMessage = {
  role: "system",
  content: "Thinking...",
};

async function addChat(inp: string) {
  try {
    chatSending.value = true;
    const userChat: ChatMessage = {
      role: "user",
      content: inp,
    };
    input.value = "";
    chats.value.push(userChat);
    scrollToBottom();

    const data = await $fetch("/api/ai/gemini/conversation/chat", {
      method: "POST",
      body: {
        inp,
      },
    });
    if (data) {
      chats.value.push(data);
    }
  } catch (error: any) {
    console.error(error);
    toast.add({
      title: "Failed to send message",
      description: error.message,
      color: "error",
      icon: "i-lucide-circle-x",
    });
  } finally {
    chatSending.value = false;
    scrollToBottom();
  }
}

function scrollToBottom() {
  messagesEndRef.value?.scrollIntoView({
    behavior: "smooth",
  });
}

onMounted(() => {
  scrollToBottom();
});
</script>
