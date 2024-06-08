<template>
  <UCard class="bg-[#46A1F6] rounded-none">
    <template #header>
      <div class="flex justify-between items-center">
        <NuxtLink to="/">
          <div class="w-28 cursor-pointer sm:w-44 " to="/" >
            <img  src="/assets/images/logo-suthub-white.png" alt="logo">
          </div>
        </NuxtLink>
      <div>
        <UHorizontalNavigation  :links="links" :ui="{active: 'text-gray-900 dark:text-white after:bg-primary-500 dark:after:bg-primary-400 after:rounded-full'}">
          <template #default="{ link }">
            <span class="text-[#ffffff] font-semibold text-base group-hover:text-black relative">{{ link.label }}</span>
          </template>
        </UHorizontalNavigation>
      </div>
    </div>
    </template>
  </UCard>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute()

const links = [{
  label: 'Receitas',
  to: `${route.path.startsWith('/dev') ? '/dev' : ''}/recipes`
}, {
  label: 'Usuários',
  to: '/users'
},]
</script>