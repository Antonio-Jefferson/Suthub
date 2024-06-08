import { defineEventHandler } from 'h3';
import { $fetch } from 'ofetch';

export default defineEventHandler(async () => {
  try {
    const data = await $fetch('http://dummyjson.com/users');
    return data;
  } catch (error) {
    console.error('Failed to fetch tags:', error);
    return null;
  }
});
