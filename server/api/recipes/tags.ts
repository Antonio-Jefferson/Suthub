import { defineEventHandler } from 'h3';
import { $fetch } from 'ofetch';

export default defineEventHandler(async () => {
  try {
    const data = await $fetch('https://dummyjson.com/recipes/tags');
    return data;
  } catch (error) {
    console.error('Failed to fetch tags:', error);
    return null;
  }
});
