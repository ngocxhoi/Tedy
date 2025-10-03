<template>
  <div class="flex size-full gap-2 overflow-y-auto">
    <div class="space-y-4 w-5/12">
      <div class="flex items-center justify-start">
        <UAvatar
          size="2xl"
          :src="avatar || ''"
          class="border border-gray-700 size-16"
          icon="i-lucide-user"
          alt="User avatar"
        />
        <input type="file" hidden ref="avatarInput" accept="image/*" />
        <UButton
          @click="handleAvatarChange"
          label="Change Avatar"
          class="ml-4 cursor-pointer"
          size="sm"
          color="primary"
          variant="outline"
        />
      </div>
      <UFormField label="Username">
        <UInput
          :default-value="user?.name"
          placeholder="Your username"
          size="lg"
          class="w-full"
        />
      </UFormField>
      <UFormField label="Email">
        <UInput
          :default-value="user?.email"
          placeholder="Your email"
          size="lg"
          class="w-full"
        />
      </UFormField>
    </div>

    <UCard class="flex-1 h-full">
      <template #header>
        <h2 class="text-base font-semibold">Change Password</h2>
      </template>

      <div class="h-full overflow-y-auto space-y-4">
        <UFormField label="New Password">
          <UInput
            type="password"
            placeholder="New Password"
            size="lg"
            class="w-full"
          />
        </UFormField>
        <UFormField label="Confirm New Password">
          <UInput
            type="password"
            placeholder="Confirm New Password"
            size="lg"
            class="w-full"
          />
        </UFormField>
        <div class="pt-4">
          <UButton label="Update Password" color="neutral" />
        </div>
      </div>
    </UCard>
  </div>
</template>

<script lang="ts" setup>
const { user } = useMyAuthStore();

const avatar = ref<string | null>(null);
const avatarInput = ref<HTMLInputElement | null>(null);

const handleAvatarChange = () => {
  avatarInput.value?.click();
  avatarInput.value?.addEventListener("change", (event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files ? target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        avatar.value = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  });
};
</script>
