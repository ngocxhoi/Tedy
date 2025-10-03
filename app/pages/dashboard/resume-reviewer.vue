<template>
  <LayoutDashboard>
    <DashboardTitle title="Resume Reviewer" />

    <div class="custom-border w-full min-h-[calc(100vh-22rem)] lg:flex gap-4">
      <UForm
        ref="formRef"
        :schema="schemaFilePDF"
        :state="state"
        class="space-y-4 w-full lg:w-96"
        @submit="onSubmit"
        @error="onError"
      >
        <UFormField name="pdf" label="PDF" description="PDF file. 2MB Max.">
          <UFileUpload
            label="Click or drag a PDF file here"
            description="Max 2MB"
            v-model="state.pdf"
            accept="application/pdf"
            id="upload-pdf-to-resume"
            class="w-96 min-h-48"
          />
        </UFormField>

        <div v-if="state.pdf" class="flex items-center justify-center gap-4">
          <UButton
            type="submit"
            label="Submit"
            :loading="isLoading"
            :disabled="isLoading"
            class="cursor-pointer"
            color="neutral"
          />
          <UButton
            v-if="content"
            label="Download"
            class="cursor-pointer"
            color="info"
            icon="i-lucide-download"
            @click="
              () => {
                downloadImage(content);
              }
            "
          />
        </div>
      </UForm>

      <UFormField
        label="Review"
        description="Resume your pdf here"
        class="flex-1 mt-8 xl:mt-0"
      >
        <div class="custom-border w-full h-full min-h-[500px] mt-0 flex-1">
          <div v-html="content" class="w-full" />
        </div>
      </UFormField>
    </div>
  </LayoutDashboard>
</template>

<script lang="ts" setup>
import type { FormErrorEvent, FormSubmitEvent } from "@nuxt/ui";
import { schemaFilePDF, type SchemaFilePDF } from "~~/lib/zod/pdf";
useSeoMeta({
  title: "Background Removal",
});

const toast = useToast();

const formRef = ref<HTMLFormElement>();
const isLoading = ref(false);
const content = ref();

const state = reactive<Partial<SchemaFilePDF>>({
  pdf: undefined,
});

function downloadImage(url: string) {
  const a = document.createElement("a");
  a.href = url;
  a.download = "resume.pdf";
  a.click();
}

async function onSubmit(event: FormSubmitEvent<SchemaFilePDF>) {
  if (!event.data.pdf) return;
  content.value = "";

  const formData = new FormData();
  formData.append("pdf", event.data.pdf);

  try {
    isLoading.value = true;
    const data = await $fetch("/api/ai/gemini/resume/pdf", {
      method: "POST",
      body: formData,
    });
    content.value = data;
    toast.add({
      title: "PDF uploaded",
      description: "Your PDF file has been uploaded successfully",
      color: "success",
      icon: "i-lucide-circle-check",
    });
  } catch (error: any) {
    console.error(error);
    toast.add({
      title: "Failed to remove background",
      description: formatErrorMessage(error.message),
      color: "error",
      icon: "i-lucide-circle-x",
    });
  } finally {
    isLoading.value = false;
  }
}

async function onError(event: FormErrorEvent) {
  if (event?.errors?.[0]?.id) {
    const element = document.getElementById(event.errors[0].id);
    element?.focus();
    toast.add({
      title: event?.errors?.[0]?.name,
      description: event?.errors?.[0]?.message,
      color: "error",
      icon: "i-lucide-circle-x",
    });
  }
}
</script>
