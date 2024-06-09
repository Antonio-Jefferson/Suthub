<template>
  <div>
    <h3 class="text-xl font-semibold">Ingredientes:</h3>
    <ol>
      <li v-for="(ingredient, i) in ingredients" :key="i"><strong>{{ i + 1 }}. </strong>{{ ingredient }}</li>
    </ol>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

const props = defineProps<{
  ingredients: string[];
}>();
</script>
