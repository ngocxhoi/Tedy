<template>
  <footer class="rounded-lg shadow-sm dark:bg-gray-900 m-4">
    <div class="container mx-auto p-4 md:py-8">
      <div class="sm:flex sm:items-center sm:justify-between">
        <AppLogo size="large" />
        <ul
          class="flex flex-wrap items-center mb-6 font-medium text-gray-500 sm:mb-0 dark:text-gray-400"
        >
          <li>
            <a href="#" class="hover:underline me-4 md:me-6">About</a>
          </li>
          <li>
            <a href="#" class="hover:underline me-4 md:me-6">Privacy Policy</a>
          </li>
          <li>
            <a href="#" class="hover:underline me-4 md:me-6">Licensing</a>
          </li>
          <li>
            <a href="#" class="hover:underline">Contact</a>
          </li>
        </ul>
      </div>
      <hr
        class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"
      />
      <span
        class="block text-sm text-gray-500 sm:text-center dark:text-gray-400"
        >© 2023
        <a href="https://flowbite.com/" class="hover:underline">Flowbite™</a>.
        All Rights Reserved.</span
      >
    </div>
  </footer>
</template>

<script lang="ts" setup>
import { FooterLinks, SocialLinks } from "~/assets/data/route";

const footerLinks = FooterLinks;
const socialLinks = SocialLinks;
</script>
