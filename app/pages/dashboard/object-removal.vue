<template>
  <LayoutDashboard>
    <DashboardTitle title="Object Removal" />

    <div class="custom-border w-full min-h-[calc(100vh-22rem)] lg:flex gap-4">
      <UForm
        ref="formRef"
        :schema="schemaImageObjectRemoval"
        :state="state"
        class="space-y-4 w-full"
        @submit="onSubmit"
        @error="onError"
      >
        <UFormField name="title" label="Object to remove" required>
          <UInputTags
            v-model="state.title"
            size="xl"
            placeholder="Ex: Remove user in the right corner"
            class="w-full [&_input]:bg-transparent max-w-96"
          />
        </UFormField>

        <UFormField
          v-show="false"
          name="image"
          label="Image"
          description="JPG, GIF or PNG. 2MB Max."
        >
          <UFileUpload
            v-model="state.image"
            accept="image/*"
            id="upload-image-to-remove-bg"
          />
        </UFormField>

        <UFormField
          label="Image"
          description="JPG, GIF or PNG. 2MB Max."
          required
          class="w-full"
        >
          <div
            class="w-full flex items-center justify-center gap-4 flex-col xl:flex-row"
          >
            <label
              v-if="!state.image"
              for="upload-image-to-remove-bg"
              class="size-fit select-none"
            >
              <div
                class="custom-border cursor-pointer w-80 h-40 p-0 m-0 flex flex-col gap-2 items-center justify-center"
              >
                <UIcon name="i-lucide-upload" size="24" />
                <span class="text-sm">Click to upload Image</span>
              </div>
            </label>
            <NuxtImg
              v-else
              :src="createUrl(state.image)"
              alt="Image preview"
              class="min-w-96 max-w-[500px] size-fit object-contain select-none custom-border [&_*]:m-0"
            />
            <NuxtImg
              provider="cloudinary"
              v-if="state.image && removedImg"
              :src="removedImg"
              alt="Removed Image preview"
              class="min-w-96 max-w-[500px] size-fit object-contain select-none custom-border [&_*]:m-0"
            />
          </div>
        </UFormField>

        <div v-if="state.image" class="flex items-center justify-center gap-4">
          <UButton
            type="submit"
            label="Enhanced"
            :loading="isLoading"
            :disabled="isLoading"
            class="cursor-pointer"
            color="neutral"
          />

          <UButton
            label="Reload"
            class="cursor-pointer"
            color="neutral"
            icon="i-lucide-rotate-ccw"
            @click="
              () => {
                (state.image = undefined), (removedImg = '');
              }
            "
          />
          <UButton
            v-if="removedImg"
            label="Download"
            class="cursor-pointer"
            color="info"
            icon="i-lucide-download"
            @click="
              () => {
                downloadImage(removedImg);
              }
            "
          />
        </div>
      </UForm>
    </div>
  </LayoutDashboard>
</template>

<script lang="ts" setup>
import {
  schemaImageObjectRemoval,
  type SchemaImageObjectRemoval,
} from "~~/lib/zod/image";
import type { FormSubmitEvent, FormErrorEvent } from "@nuxt/ui";
useSeoMeta({
  title: "Background Removal",
});

const toast = useToast();

const formRef = ref<HTMLFormElement>();
const isLoading = ref(false);
const removedImg = ref("");

const state = reactive<Partial<SchemaImageObjectRemoval>>({
  title: [],
  image: undefined,
});

function createUrl(file: File): string {
  return URL.createObjectURL(file);
}

function downloadImage(url: string) {
  const a = document.createElement("a");
  a.href = url;
  a.download = "removed-bg.jpg";
  a.click();
}

async function onSubmit(event: FormSubmitEvent<SchemaImageObjectRemoval>) {
  if (!event.data.image) return;
  removedImg.value = "";

  const formData = new FormData();
  formData.append("title", event.data.title.join(";"));
  formData.append("image", event.data.image);

  try {
    isLoading.value = true;
    const data = await $fetch<{ message: string; url: string }>(
      "/api/cloudinary/object-removal",
      {
        method: "POST",
        body: formData,
      }
    );
    removedImg.value = data.url;
    toast.add({
      title: "Background removed",
      description: "Your image background has been removed successfully",
      color: "success",
      icon: "i-lucide-circle-check",
    });
  } catch (error: any) {
    console.error(error);
    toast.add({
      title: "Failed to remove background",
      description: error.message,
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
