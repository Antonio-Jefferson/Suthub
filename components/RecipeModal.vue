<template>
  <UModal :model-value="isOpen" @update:model-value="updateIsOpen" prevent-close :ui="{ width: 'w-full sm:m-w-lg' }">
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800', base: 'h-full w-full flex flex-col' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">Receita</h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="closeModal" />
        </div>
      </template>
      <template #default>
        <RecipeDetails :recipe="recipe" />
      </template>
    </UCard>
  </UModal>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
import RecipeDetails from './RecipeDetails.vue';
import type { Recipe } from '../@types/recipesTypes';

const props = defineProps<{
  recipe: Recipe;
  modelValue: boolean;
}>();

const emit = defineEmits(['update:modelValue']);

const updateIsOpen = (value: boolean) => {
  emit('update:modelValue', value);
};

const closeModal = () => {
  emit('update:modelValue', false);
};
</script>
