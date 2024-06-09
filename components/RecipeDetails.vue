<template>
  <div class="flex flex-col md:flex-row gap-8">
    <div class="w-full md:w-52">
      <img class="rounded-md w-full" :src="recipe.image" :alt="recipe.name">
    </div>
    <div class="w-full md:w-80">
      <h1 class="text-xl font-semibold">{{ recipe.name }}</h1>
      <ul>
        <li><strong>Tempo de preparação:</strong> {{ recipe.prepTimeMinutes }} minutos</li>
        <li><strong>Tempo de cozimento:</strong> {{ recipe.cookTimeMinutes }} minutos</li>
        <li><strong>Dificuldade:</strong> {{ recipe.difficulty }}</li>
        <li><strong>Calorias por porção:</strong> {{ recipe.caloriesPerServing }}</li>
        <li><strong>Porções:</strong> <template v-for="portion in recipe.servings">🍽️</template></li>
      </ul>
      <div class="flex flex-wrap gap-2 mb-4 mt-3">
        <UBadge v-for="tag in recipe.tags" :key="tag" size="xs" color="orange" variant="solid">{{ tag }}</UBadge>
      </div>
    </div>
  </div>
  <IngredientList :ingredients="recipe.ingredients" />
  <InstructionList :instructions="recipe.instructions" />
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import type { Recipe } from '../@types/recipesTypes';

const props = defineProps<{
  recipe: Recipe;
}>();
</script>
