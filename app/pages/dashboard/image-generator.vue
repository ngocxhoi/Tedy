<template>
  <LayoutDashboard>
    <DashboardTitle
      title="Image Generator"
      description="Generate images with our AI assistant. Get personalized recommendations,
        schedule your posts, and track your performance."
    />

    <div class="custom-border w-full min-h-[calc(100vh-22rem)] xl:flex gap-4">
      <UForm
        :schema="schemaImageGenerator"
        :state="state"
        @submit.prevent="handleSubmit"
        class="space-y-4 w-full lg:w-96"
      >
        <UFormField label="Prompt" name="prompt" required>
          <UTextarea
            v-model="state.prompt"
            :rows="4"
            autoresize
            size="xl"
            placeholder="Ex: Write a blog about the latest trends in AI"
            class="w-full"
          />
        </UFormField>
        <UFormField label="Image Type" name="type" required>
          <USelect
            v-model="state.type"
            size="xl"
            :items="optionsType"
            placeholder="Select a value"
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

      <UFormField label="Review" class="flex-1 mt-8 xl:mt-0">
        <div class="custom-border w-full h-full min-h-[500px] xl:mt-0 flex-1">
          <NuxtImg
            v-if="image"
            :src="image"
            alt="Generated image"
            class="w-full h-full object-cover"
          />
          <USkeleton v-if="isLoading" class="w-96 aspect-video" />
        </div>
      </UFormField>
    </div>
  </LayoutDashboard>
</template>

<script lang="ts" setup>
import {
  type SchemaImageGenerator,
  schemaImageGenerator,
} from "~~/lib/zod/image";
useSeoMeta({
  title: "Image Generator",
});

const toast = useToast();

const isLoading = ref(false);
const state = reactive<Partial<SchemaImageGenerator>>({
  prompt: undefined,
  type: undefined,
});
const optionsType = [
  { label: "16/9", value: "16/9" },
  { label: "1/1", value: "1/1" },
  { label: "4/3", value: "4/3" },
  { label: "3/2", value: "3/2" },
];
const image = ref();

async function handleSubmit() {
  try {
    isLoading.value = true;
    const data = await $fetch("/api/ai/gemini/image/generate", {
      method: "POST",
      body: state,
    });
    if (data) {
      toast.add({
        title: "Image generated",
        description: "Your image has been generated successfully",
        color: "success",
        icon: "i-lucide-check",
      });
      image.value = data;
    }
  } catch (error: any) {
    console.error(error);
    toast.add({
      title: "Failed to generate image",
      description: error.message,
      color: "error",
      icon: "i-lucide-circle-x",
    });
  } finally {
    isLoading.value = false;
  }
}
</script>
