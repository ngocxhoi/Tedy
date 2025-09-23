<template>
  <LayoutDashboard>
    <DashboardTitle
      title="Conversation"
      description="Start a conversation with our AI assistant to help manage your tasks,
        schedule meetings, and get personalized recommendations. Your virtual
        productivity companion is here to help streamline your workflow."
    />

    <div class="custom-border w-full h-[calc(100vh-22rem)]">
      <ConversationChatLayout :chat-loading="status == 'pending'" />
    </div>
  </LayoutDashboard>
</template>

<script lang="ts" setup>
useSeoMeta({
  title: "Conversation",
});

const { data, status } = await useLazyFetch(
  "/api/ai/gemini/conversation/all-chat",
  {
    onResponse({ response }) {
      console.log(response._data);
    },
  }
);

provide("contact", data);
</script>
