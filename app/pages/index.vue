<template>
  <div class="min-h-screen w-full">
    <!-- Blog section -->
    <div class="w-full py-40 px-4">
      <div class="container mx-auto w-full">
        <div class="relative mx-auto flex flex-col gap-20 lg:flex-row">
          <header
            class="w-2xl top-24 flex h-fit flex-col items-center gap-5 text-center lg:sticky lg:max-w-2xl lg:items-start lg:gap-8 lg:text-left"
          >
            <div class="text-left w-full">
              <h1
                class="text-4xl font-bold text-gray-900 sm:text-5xl dark:text-white"
              >
                Understand user flow and
                <strong class="text-indigo-600"> increase </strong>
                conversions
              </h1>

              <p
                class="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed dark:text-gray-200"
              >
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque,
                nisi. Natus, provident accusamus impedit minima harum corporis
                iusto.
              </p>

              <div class="mt-4 flex gap-4 sm:mt-6">
                <a
                  class="inline-block rounded border border-indigo-600 bg-indigo-600 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
                  href="#"
                >
                  Get Started
                </a>

                <a
                  class="inline-block rounded border border-gray-200 px-5 py-3 font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white"
                  href="#"
                >
                  Learn More
                </a>
              </div>
            </div>
            <div
              data-orientation="horizontal"
              role="none"
              data-slot="separator-root"
              class="bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px"
            ></div>
            <nav>
              <ul
                class="flex flex-wrap items-center justify-center gap-4 lg:flex-col lg:items-start lg:gap-2"
              >
                <li class="text-lg text-primary font-semibold">
                  <NuxtLink to="#">Tools</NuxtLink>
                </li>
                <li class="hover:text-primary hover:underline">
                  <NuxtLink to="/dashboard">Dashboard</NuxtLink>
                </li>
                <li class="hover:text-primary hover:underline">
                  <a href="/dashboard/conversation">Conversation</a>
                </li>
                <li class="hover:text-primary hover:underline">
                  <a href="/dashboard/writer-article">AI Article Writer</a>
                </li>
                <li class="hover:text-primary hover:underline">
                  <a href="/dashboard/background-removal">Background Removal</a>
                </li>
                <li class="hover:text-primary hover:underline">
                  <a href="/dashboard/object-removal">Object Removal</a>
                </li>
              </ul>
            </nav>
          </header>

          <div class="grid gap-4 md:grid-cols-2">
            <a
              href="javascript:void(0)"
              class="group relative isolate h-80 rounded-lg border"
            >
              <div class="z-10 flex h-full flex-col justify-between p-6">
                <p class="group-hover:text-white">May 20, 2024</p>
                <h2
                  class="line-clamp-2 text-xl font-medium duration-500 group-hover:text-white"
                >
                  How to design a website from scratch
                </h2>
              </div>
              <img
                src="https://themedevhub-images.netlify.app/components/images/about-1.jpg"
                class="absolute inset-0 -z-10 size-full rounded-lg object-cover brightness-50 transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] [clip-path:inset(0_0_100%_0)] group-hover:[clip-path:inset(0_0_0%_0)]"
              />
            </a>
            <a
              href="javascript:void(0)"
              class="group relative isolate h-80 rounded-lg border"
            >
              <div class="z-10 flex h-full flex-col justify-between p-6">
                <p class="group-hover:text-white">June 12, 2024</p>
                <h2
                  class="line-clamp-2 text-xl font-medium duration-500 group-hover:text-white"
                >
                  The best tools for web development and design
                </h2>
              </div>
              <img
                src="https://themedevhub-images.netlify.app/components/images/about-1.jpg"
                alt="The best tools for web development and design"
                class="absolute inset-0 -z-10 size-full rounded-lg object-cover brightness-50 transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] [clip-path:inset(0_0_100%_0)] group-hover:[clip-path:inset(0_0_0%_0)]"
              />
            </a>
            <a
              href="javascript:void(0)"
              class="group relative isolate h-80 rounded-lg border"
            >
              <div class="z-10 flex h-full flex-col justify-between p-6">
                <p class="group-hover:text-white">July 5, 2024</p>
                <h2
                  class="line-clamp-2 text-xl font-medium duration-500 group-hover:text-white"
                >
                  How to market your website and get more traffic
                </h2>
              </div>
              <img
                src="https://themedevhub-images.netlify.app/components/images/about-1.jpg"
                alt="How to market your website and get more traffic"
                class="absolute inset-0 -z-10 size-full rounded-lg object-cover brightness-50 transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] [clip-path:inset(0_0_100%_0)] group-hover:[clip-path:inset(0_0_0%_0)]"
              />
            </a>
            <a
              href="javascript:void(0)"
              class="group relative isolate h-80 rounded-lg border"
            >
              <div class="z-10 flex h-full flex-col justify-between p-6">
                <p class="group-hover:text-white">August 18, 2024</p>
                <h2
                  class="line-clamp-2 text-xl font-medium duration-500 group-hover:text-white"
                >
                  The future of web development and design
                </h2>
              </div>
              <img
                src="https://themedevhub-images.netlify.app/components/images/about-1.jpg"
                alt="The future of web development and design"
                class="absolute inset-0 -z-10 size-full rounded-lg object-cover brightness-50 transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] [clip-path:inset(0_0_100%_0)] group-hover:[clip-path:inset(0_0_0%_0)]"
              />
            </a>
            <a
              href="javascript:void(0)"
              class="group relative isolate h-80 rounded-lg border"
            >
              <div class="z-10 flex h-full flex-col justify-between p-6">
                <p class="group-hover:text-white">September 7, 2024</p>
                <h2
                  class="line-clamp-2 text-xl font-medium duration-500 group-hover:text-white"
                >
                  The difference between UI and UX and how to design for both
                </h2>
              </div>
              <img
                src="https://themedevhub-images.netlify.app/components/images/about-1.jpg"
                alt="The difference between UI and UX and how to design for both"
                class="absolute inset-0 -z-10 size-full rounded-lg object-cover brightness-50 transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] [clip-path:inset(0_0_100%_0)] group-hover:[clip-path:inset(0_0_0%_0)]"
              />
            </a>
            <a
              href="javascript:void(0)"
              class="group relative isolate h-80 rounded-lg border"
            >
              <div class="z-10 flex h-full flex-col justify-between p-6">
                <p class="group-hover:text-white">September 23, 2024</p>
                <h2
                  class="line-clamp-2 text-xl font-medium duration-500 group-hover:text-white"
                >
                  Optimizing your website for SEO and getting more traffic from
                  search engines
                </h2>
              </div>
              <img
                src="https://themedevhub-images.netlify.app/components/images/about-1.jpg"
                alt="Optimizing your website for SEO and getting more traffic from search engines"
                class="absolute inset-0 -z-10 size-full rounded-lg object-cover brightness-50 transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] [clip-path:inset(0_0_100%_0)] group-hover:[clip-path:inset(0_0_0%_0)]"
              />
            </a>
            <a
              href="javascript:void(0)"
              class="group relative isolate h-80 rounded-lg border"
            >
              <div class="z-10 flex h-full flex-col justify-between p-6">
                <p class="group-hover:text-white">October 12, 2024</p>
                <h2
                  class="line-clamp-2 text-xl font-medium duration-500 group-hover:text-white"
                >
                  The best tools for web development and design
                </h2>
              </div>
              <img
                src="https://themedevhub-images.netlify.app/components/images/about-1.jpg"
                alt="The best tools for web development and design"
                class="absolute inset-0 -z-10 size-full rounded-lg object-cover brightness-50 transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] [clip-path:inset(0_0_100%_0)] group-hover:[clip-path:inset(0_0_0%_0)]"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
useSeoMeta({
  title: "Home",
});
</script>
