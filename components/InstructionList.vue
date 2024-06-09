<template>
  <div class="mt-4">
    <h3 class="text-xl font-semibold">Instruções:</h3>
    <ol>
      <li v-for="(instruction, i) in instructions" :key="i"><strong>{{ i + 1 }}. </strong>{{ instruction }}</li>
    </ol>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

const props = defineProps<{
  instructions: string[];
}>();
</script>
