<template>
  <LayoutDashboard>
    <DashboardTitle
      title="Coming Soon!"
      cl-name="text-red-400 dark:text-red-400"
    />
    <DashboardTitle title="Code Generator" />

    <div class="custom-border w-full min-h-[calc(100vh-22rem)] gap-4">
      <UFormField label="Review" class="flex-1 mt-8 xl:mt-0">
        <div
          class="custom-border w-full h-[500px] xl:mt-0 flex-1 overflow-y-auto no-scroll"
        >
          <code v-html="code"></code>
        </div>
      </UFormField>

      <UForm
        :schema="schemaCodeGenerator"
        :state="state"
        @submit.prevent="handleSubmit"
        class="space-y-4 w-full relative"
      >
        <UFormField label="Prompt" name="prompt" required>
          <UTextarea
            v-model="state.prompt"
            :rows="4"
            size="xl"
            placeholder="Ex: Write a blog about the latest trends in AI"
            class="w-full"
          />

          <div class="flex justify-start w-full cursor-pointer">
            <UButton
              :disabled="isLoading"
              :loading="isLoading"
              type="submit"
              color="neutral"
              label="Submit"
            />
          </div>
        </UFormField>
      </UForm>
    </div>
  </LayoutDashboard>
</template>

<script lang="ts" setup>
import {
  type SchemaCodeGenerator,
  schemaCodeGenerator,
} from "~~/lib/zod/writer";
useSeoMeta({
  title: "Code Generator",
});

const toast = useToast();

const isLoading = ref(false);
const state = reactive<Partial<SchemaCodeGenerator>>({
  prompt: undefined,
});
const optionsType = [
  { label: "16/9", value: "16/9" },
  { label: "1/1", value: "1/1" },
  { label: "4/3", value: "4/3" },
  { label: "3/2", value: "3/2" },
];
const code = ref();

async function handleSubmit() {
  try {
    isLoading.value = true;
    const data = await $fetch("/api/ai/gemini/code/generate", {
      method: "POST",
      body: state,
    });
    if (data) {
      toast.add({
        title: "Code generated",
        description: "Your code has been generated successfully",
        color: "success",
        icon: "i-lucide-check",
      });
      code.value = data;
    }
  } catch (error: any) {
    console.error(error);
    toast.add({
      title: "Failed to generate code",
      description: formatErrorMessage(error.message),
      color: "error",
      icon: "i-lucide-circle-x",
    });
  } finally {
    isLoading.value = false;
  }
}
</script>
