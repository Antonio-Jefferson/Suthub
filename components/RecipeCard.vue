<template>
  <UCard class="mb-4 shadow-lg  hover:bg-green-100" @click="openModal">
    <div class="items-center md:flex gap-4 cursor-pointer">
      <div class="w-full md:w-1/3">
        <img class="w-full h-full object-cover rounded-md" :src="recipe.image" :alt="recipe.name">
      </div>
      <div class="w-full md:w-2/3">
        <h2 class="text-xl font-extrabold text-slate-700">{{ recipe.name }}</h2>
        <div>
          <li class="text-sm md:text-base"><strong>Tempo de preparação:</strong> {{ props.recipe.prepTimeMinutes }} minutos</li>
          <li class="text-sm md:text-base"><strong>Tempo de cozimento:</strong> {{ props.recipe.cookTimeMinutes }} minutos</li>
          <li class="text-sm md:text-base"><strong>Dificuldade:</strong> {{ props.recipe.difficulty }}</li>
        </div>
        <div class="flex flex-wrap gap-2 mt-2">
          <UBadge v-for="tag in recipe.tags" :key="tag" size="xs" color="orange" variant="solid">{{ tag }}</UBadge>
        </div>
      </div>
    </div>
  </UCard>
  <UModal v-model="isOpen" prevent-close :ui="{width: 'w-full sm:m-w-lg',}">
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800', base: 'h-full w-full flex flex-col' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            Receita
          </h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isOpen = false"/>
        </div>
      </template>
      <template #default>
        <div class="flex flex-col md:flex-row gap-8">
          <div class="w-full md:w-52">
            <img class="rounded-md w-full" :src="props.recipe.image" :alt="props.recipe.name">
          </div>
          <div class="w-full md:w-80">
            <h1 class="text-xl font-semibold">{{ props.recipe.name }}</h1>
            <ul>
              <li><strong>Tempo de preparação:</strong> {{ props.recipe.prepTimeMinutes }} minutos</li>
              <li><strong>Tempo de cozimento:</strong> {{ props.recipe.cookTimeMinutes }} minutos</li>
              <li><strong>Dificuldade:</strong> {{ props.recipe.difficulty }}</li>
              <li><strong>Calorias por porção:</strong> {{ props.recipe.caloriesPerServing }}</li>
              <li><strong>Porções:</strong> <template v-for="portion in recipe.servings">🍽️</template></li>
            </ul>
            <div class="flex flex-wrap gap-2 mb-4 mt-3">
              <UBadge v-for="tag in props.recipe.tags" :key="tag" size="xs" color="orange" variant="solid">{{ tag }}</UBadge>
            </div>
          </div>
        </div>
        <div>
          <h3 class="text-xl font-semibold">Ingredientes:</h3>
          <ol>
            <li v-for="(ingredient, i) in recipe.ingredients" :key="i"><strong>{{ i + 1}}. </strong>{{ ingredient }}</li>
          </ol>
        </div>
        <div class="mt-4">
          <h3 class="text-xl font-semibold">Instruções:</h3>
          <ol>
            <li v-for="(instruction, i) in recipe.instructions" :key="i"><strong>{{ i + 1}}. </strong>{{ instruction }}</li>
          </ol>
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<script lang="ts" setup>
import { defineProps, ref } from 'vue';
import type { Recipe } from '../@types/recipesTypes';

const isOpen = ref(false);

const props = defineProps<{
  recipe: Recipe;
}>();

const openModal = () => {
  isOpen.value = true;
};
</script>
