<template>
  <div class="h-full min-w-md">
    <section class="py-20 px-4">
      <div class="max-w-7xl mx-auto text-center">
        <h1
          class="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
        >
          Out Pricing Plans
        </h1>
        <p class="text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
          Choose the perfect plan for your needs. All plans include a 14-day
          free trial.
        </p>
        <p class="text-sm text-muted-foreground">
          No credit card required • Cancel anytime
        </p>
      </div>
    </section>

    <section class="pb-20 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="grid md:grid-cols-3 gap-8 items-start">
          <UCard
            v-for="(plan, index) in pricingPlans"
            :key="index"
            class="relative overflow-hidden transition-all duration-300 hover:scale-105"
            :class="
              plan.featured ? 'border-2 border-primary shadow-lg' : 'border'
            "
          >
            <div>
              <div
                v-if="plan.featured"
                class="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-primary to-secondary"
              />
              <h2 class="text-center text-2xl font-bold py-8">
                <UBadge
                  v-if="plan.featured"
                  label="Popular"
                  class="absolute top-4 right-4 bg-gradient-to-r from-primary to-secondary border-0"
                />
              </h2>

              <h1 class="text-3xl font-extrabold mb-2">
                {{ plan.title }}
              </h1>
              <p class="text-base text-muted-foreground mb-6">
                {{ plan.description }}
              </p>
              <div class="mt-6">
                <div class="flex items-baseline justify-center gap-2">
                  <span class="text-5xl font-bold tracking-tight">{{
                    plan.price
                  }}</span>
                  <span class="text-muted-foreground text-lg"
                    >/{{ plan.period }}</span
                  >
                </div>
              </div>
            </div>

            <div class="mt-8">
              <ul class="space-y-3">
                <li
                  v-for="(feature, index) in plan.features"
                  :key="index"
                  class="flex items-start gap-3"
                >
                  <UIcon
                    name="i-lucide-check"
                    class="h-5 w-5 text-primary shrink-0 mt-0.5"
                  />
                  <span class="text-sm">{{ feature }}</span>
                </li>
              </ul>
            </div>

            <template #footer>
              <UButton
                @click="
                  handlePlanSelect(plan.plan as 'free' | 'pro' | 'custom')
                "
                :loading="
                  (plan.plan === 'free' && loadingFree) ||
                  (plan.plan === 'pro' && loadingPro)
                "
                :variant="plan.featured ? 'solid' : 'outline'"
                size="xl"
                block
              >
                {{ plan.buttonText }}
              </UButton>
            </template>
          </UCard>
        </div>
      </div>
    </section>

    <div v-if="openContact" class="max-w-2xl mx-auto">
      <div class="text-center mb-12">
        <h1
          class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
        >
          Contact Sales
        </h1>
        <p class="text-lg text-muted-foreground">
          Let's discuss how we can help your business grow
        </p>
      </div>

      <div
        class="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-8 shadow-lg"
      >
        <UForm
          :schema="contactSchema"
          :state="contactForm"
          @submit="onSubmit"
          class="space-y-4"
        >
          <UFormField label="Full Name" name="name" required>
            <UInput
              v-model="contactForm.name"
              size="lg"
              placeholder="John Doe"
              class="w-full [&>input]:bg-transparent"
            />
          </UFormField>
          <UFormField label="Email" name="email" required>
            <UInput
              v-model="contactForm.email"
              size="lg"
              placeholder="john@company.com"
              class="w-full [&>input]:bg-transparent"
            />
          </UFormField>
          <UFormField label="Company" name="company" required>
            <UInput
              v-model="contactForm.company"
              size="lg"
              placeholder="Your Company Inc."
              class="w-full [&>input]:bg-transparent"
            />
          </UFormField>
          <UFormField label="Message" name="message" required>
            <UTextarea
              v-model="contactForm.message"
              size="lg"
              autoresize
              :rows="8"
              placeholder="Tell us about your needs..."
              class="w-full [&>textarea]:bg-transparent"
            />
          </UFormField>

          <UButton type="submit" variant="solid" block size="xl">
            Send Message
          </UButton>
        </UForm>
      </div>
    </div>

    <section class="py-16 px-4 bg-muted/30">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="text-3xl font-bold mb-4">Have questions?</h2>
        <p class="text-muted-foreground mb-6">
          Our team is here to help you find the right plan for your needs.
        </p>
        <UButton size="lg" variant="outline"> Contact Support </UButton>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { pricingPlans } from "@/assets/data/static";
import type { FormSubmitEvent } from "@nuxt/ui";
import { contactSchema, type ContactFormData } from "~~/lib/zod/contact";

const emit = defineEmits<{
  close: [bol: boolean];
}>();

const toast = useToast();

const openContact = ref(false);
const loadingFree = ref(false);
const loadingPro = ref(false);
const contactForm = reactive<Partial<ContactFormData>>({
  name: "",
  email: "",
  company: "",
  message: "",
});

const handlePlanSelect = async (plan: "free" | "pro" | "custom") => {
  if (plan == "custom") {
    openContact.value = true;
    return;
  }
  try {
    if (plan === "free") loadingFree.value = true;
    if (plan === "pro") loadingPro.value = true;
    const selectedPlan = pricingPlans.find((p) => p.plan === plan);
    if (!selectedPlan) throw new Error("Invalid plan");

    await $fetch("/api/db/subscribe", {
      method: "POST",
      body: { tokens: selectedPlan.token, plan: selectedPlan.plan },
    });

    toast.add({
      title: "Success",
      description: `You have successfully subscribed to the ${selectedPlan.title} plan.`,
      icon: "i-lucide-circle-check",
      color: "primary",
    });
  } catch (error: any) {
    console.error("Error selecting plan:", error);
    toast.add({
      title: "Error",
      description:
        (error as Error).message ||
        "An error occurred while selecting the plan. Please try again.",
      icon: "i-lucide-circle-alert",
      color: "error",
    });
  } finally {
    loadingFree.value = false;
    loadingPro.value = false;
    // Close the modal or give feedback to the user
    emit("close", false);
  }
};

const onSubmit = (event: FormSubmitEvent<ContactFormData>) => {
  console.log(event.data);
};
</script>
