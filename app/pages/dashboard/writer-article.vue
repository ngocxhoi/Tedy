<template>
  <LayoutDashboard>
    <DashboardTitle
      title="Writer Article"
      description="Write and publish articles with our AI assistant. Get personalized recommendations,
        schedule your posts, and track your performance."
    />

    <div class="custom-border w-full min-h-[calc(100vh-22rem)] xl:flex gap-4">
      <UForm
        :schema="schemaWriterArticle"
        :state="state"
        @submit.prevent="handleSubmit"
        class="space-y-4 w-full lg:w-96"
      >
        <UFormField label="Article Topic" name="topic" required>
          <UInput
            v-model="state.topic"
            size="xl"
            placeholder="Ex: Write a blog about the latest trends in AI"
            class="w-full"
          />
        </UFormField>
        <UFormField label="Article Length" name="length" required>
          <USelect
            v-model="state.length"
            size="xl"
            :items="optionsLength"
            placeholder="Select a value"
            class="w-full"
          />
        </UFormField>
        <UFormField label="Article Description" name="description">
          <UTextarea
            v-model="state.description"
            size="xl"
            autoresize
            :rows="4"
            :maxRows="8"
            placeholder="Ex: A detailed description of the article"
            class="w-full"
          />
        </UFormField>
        <div class="flex justify-start w-full cursor-pointer">
          <UButton
            :disabled="isLoading"
            :loading="isLoading"
            type="submit"
            color="neutral"
            >Submit</UButton
          >
        </div>
      </UForm>

      <div class="custom-border w-full h-full min-h-[500px] xl:mt-0 flex-1">
        <div v-html="article" class="w-full" />
      </div>
    </div>
  </LayoutDashboard>
</template>

<script lang="ts" setup>
import {
  type SchemaWriterArticle,
  schemaWriterArticle,
} from "~~/lib/zod/writer";
useSeoMeta({
  title: "AI Writer Article",
});

const toast = useToast();

const isLoading = ref(false);
const state = reactive<Partial<SchemaWriterArticle>>({
  topic: undefined,
  length: undefined,
  description: null,
});
const optionsLength = [
  { label: "Short (500 - 800 words)", value: "short" },
  { label: "Medium (800 - 1200 words)", value: "medium" },
  { label: "Long (1200+ words)", value: "long" },
];
const article = ref("");

async function handleSubmit() {
  try {
    isLoading.value = true;
    const data = await $fetch("/api/ai/gemini/writer-article", {
      method: "POST",
      body: state,
    });
    if (data) {
      toast.add({
        title: "Article created",
        description: "Your article has been created successfully",
        color: "success",
        icon: "i-lucide-check",
      });
      article.value = data;
    }
  } catch (error: any) {
    console.error(error);
    toast.add({
      title: "Failed to create article",
      description: error.message,
      color: "error",
      icon: "i-lucide-circle-x",
    });
  } finally {
    isLoading.value = false;
    state.topic = undefined;
    state.length = undefined;
    state.description = null;
  }
}
</script>
