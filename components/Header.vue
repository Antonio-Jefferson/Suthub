<template #header>
  <UCard>
    <div class="flex justify-between items-center">
        <div class="w-28  sm:w-44 ">
          <img  src="/assets/images/logo-suthub-white.png" alt="logo">
        </div>
      <div>
        <UHorizontalNavigation :links="links">
          <template #default="{ link }">
            <span class="group-hover:text-primary relative">{{ link.label }}</span>
          </template>
        </UHorizontalNavigation>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute()

const links = [{
  label: 'Receitas',
  to: `${route.path.startsWith('/dev') ? '/dev' : ''}/Recipes`
}, {
  label: 'Usuários',
  to: '/users'
},]
</script>