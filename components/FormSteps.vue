<template>
  <div class="m-6 flex items-center flex-wrap justify-center">
    <div v-for="stepNumber in 3" :key="stepNumber" class="flex items-center">
      <div
        :class="{
          'bg-[#46A1F6] text-white': step >= stepNumber,
          'bg-gray-300 text-[#9A9393]': step < stepNumber
        }"
        class="md:h-12 w-12 flex justify-center items-center rounded-full font-bold text-[14px] leading-[16px]"
      >
        {{ stepNumber }}
      </div>
      <div v-if="stepNumber < 3" :class="{ 'bg-[#46A1F6]': step >= stepNumber, 'bg-gray-300': step < stepNumber }" class="w-12 sm:w-28 md:w-56 h-1 my-2 md:my-0"></div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  step: Number
});
</script>