<template>
  <div>
    <UButton size="md" v-if="step <= 2" class="mr-4 cursor-pointer bg-[#46A1F6]" @click="$emit('previous-step')">
      Voltar
    </UButton>
    <UButton size="md" v-if="step < 2" class="cursor-pointer bg-[#46A1F6]" @click="$emit('next-step')">
      Próximo
    </UButton>
    <UButton size="md" v-if="step === 2" class="cursor-pointer" @click="$emit('open-modal')">
      Conferir dados
    </UButton>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  step: Number
});
</script>
