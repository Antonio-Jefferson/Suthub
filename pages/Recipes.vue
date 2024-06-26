<template>
  <div>
    <UHeader>
      <UCard>
        <div class="w-full md:w-80">
          <USelectMenu size="xl" v-model="selected" :options="tags" multiple placeholder="Categorias" @change="filterRecipes" />
        </div>
      </UCard>
    </UHeader>
    <UContainer>
      <div class="flex flex-wrap gap-4 mt-12 mb-4 md:mt-28">
        <div v-if="isLoading" class="w-full flex flex-wrap gap-4">
          <div v-for="n in 4" :key="n" class="w-full md:w-[calc(50%-0.5rem)]">
            <RecipeSkeleton />
          </div>
        </div>
        <div v-if="paginatedRecipes.length === 0" class="w-full text-center">
          <p class="text-xl text-gray-600 dark:text-gray-400">Nenhuma receita encontrada.</p>
        </div>
        <div v-else v-for="recipe in paginatedRecipes" :key="recipe.id" class="w-full md:w-[600px]">
          <RecipeCard :recipe="recipe" />
        </div>
      </div>
    </UContainer>
    <div class="flex justify-center mb-32 md:mt-4" v-if="filteredRecipes.length > 0">
      <UPagination
        size="xl"
        :active-button="{ variant: 'outline' }"
        :inactive-button="{ color: 'gray' }"
        v-model="currentPage"
        :total="filteredRecipes.length"
        :per-page="4"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue';
import type { Recipe } from '../@types/recipesTypes';

const API_TAGS_URL = 'api/recipes/tags';
const API_RECIPES_URL = 'api/recipes/recipes';
const RECIPES_PER_PAGE = 4;

useHead({
  title: 'SutHub - Receitas',
});

const selected = ref<string[]>([]);
const tags = ref<string[]>([]);
const recipes = ref<Recipe[]>([]);
const filteredRecipes = ref<Recipe[]>([]);
const currentPage = ref<number>(1);
const isLoading = ref(true);

async function fetchDataTags(): Promise<void> {
  try {
    const response = await fetch(API_TAGS_URL);
    if (response.ok) {
      tags.value = await response.json();
    } else {
      console.error('Failed to fetch tags. Status:', response.status);
    }
  } catch (error) {
    console.error('Failed to fetch tags:', error);
  }
}

async function fetchDataRecipes(): Promise<void> {
  try {
    const response = await fetch(API_RECIPES_URL);
    if (response.ok) {
      const responseData = await response.json();
      recipes.value = responseData.recipes;
      filteredRecipes.value = recipes.value;
    } else {
      console.error('Failed to fetch recipes. Status:', response.status);
    }
  } catch (error) {
    console.error('Failed to fetch recipes:', error);
  } finally {
    isLoading.value = false;
  }
}

function filterRecipes(): void {
  isLoading.value = true;
  currentPage.value = 1;

  if (selected.value.length === 0) {
    filteredRecipes.value = recipes.value;
  } else {
    filteredRecipes.value = recipes.value.filter(recipe =>
      recipe.tags.some(tag => selected.value.includes(tag))
    );
  }

  isLoading.value = false;
}

const paginatedRecipes = computed<Recipe[]>(() => {
  const startIndex = (currentPage.value - 1) * RECIPES_PER_PAGE;
  return filteredRecipes.value.slice(startIndex, startIndex + RECIPES_PER_PAGE);
});

onMounted(() => {
  fetchDataTags();
  fetchDataRecipes();
});

watch(selected, filterRecipes);
</script>

