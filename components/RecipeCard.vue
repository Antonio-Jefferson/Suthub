<template>
  <UCard class="mb-4 shadow-lg hover:bg-green-100" @click="openModal">
    <div class="items-center md:flex gap-4 cursor-pointer">
      <div class="w-full md:w-1/3">
        <img class="w-full h-full object-cover rounded-md" :src="recipe.image" :alt="recipe.name">
      </div>
      <div class="w-full md:w-2/3">
        <h2 class="text-xl font-extrabold text-slate-700">{{ recipe.name }}</h2>
        <div>
          <li class="text-sm md:text-base"><strong>Tempo de preparação:</strong> {{ recipe.prepTimeMinutes }} minutos</li>
          <li class="text-sm md:text-base"><strong>Tempo de cozimento:</strong> {{ recipe.cookTimeMinutes }} minutos</li>
          <li class="text-sm md:text-base"><strong>Dificuldade:</strong> {{ recipe.difficulty }}</li>
        </div>
        <div class="flex flex-wrap gap-2 mt-2">
          <UBadge v-for="tag in recipe.tags" :key="tag" size="xs" color="orange" variant="solid">{{ tag }}</UBadge>
        </div>
      </div>
    </div>
  </UCard>
  <UModal v-model="isOpen"  prevent-close :ui="{ width: 'w-full sm:m-w-lg' }">
    <RecipeModal :recipe="recipe" v-model="isOpen" />
  </UModal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { Recipe } from '../@types/recipesTypes';

const props = defineProps<{
  recipe: Recipe;
}>();

const isOpen = ref(false);

const openModal = () => {
  isOpen.value = true;
};
</script>
