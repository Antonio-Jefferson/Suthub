<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-slate-100 p-6 rounded shadow-lg w-11/12 md:w-1/3">
      <h2 class="text-xl text-center text-black font-bold mb-4">Dados Cadastrados</h2>
      <ul>
        <li class="text-slate-900"><strong>Nome completo:</strong> {{ data.fullName }}</li>
        <li class="text-slate-900"><strong>Data de nascimento:</strong> {{ data.dateOfBirth }}</li>
        <li class="text-slate-900"><strong>CPF:</strong> {{ data.CPF }}</li>
        <li class="text-slate-900"><strong>Espécie do pet:</strong> {{ data.petSpecies }}</li>
        <li class="text-slate-900"><strong>Raça do pet:</strong> {{ data.petBreed }}</li>
        <li v-if="data.petBreed === 'Outro'"><strong>Outra raça:</strong> {{ data.otherPetBreed }}</li>
        <li class="text-slate-900"><strong>CEP:</strong> {{ data.CEP }}</li>
        <li class="text-slate-900"><strong>Estado:</strong> {{ data.state }}</li>
        <li class="text-slate-900"><strong>Cidade:</strong> {{ data.city }}</li>
        <li class="text-slate-900"><strong>Bairro:</strong> {{ data.neighborhood }}</li>
        <li class="text-slate-900"><strong>Rua:</strong> {{ data.street }}</li>
        <li class="text-slate-900"><strong>Renda mensal:</strong> {{ data.monthlyIncome }}</li>
      </ul>
      <div class="flex gap-10">
        <button @click="finish" class="mt-4 bg-blue-500 text-white p-2 rounded">Finalizar Cadastro</button>
        <button @click="cancel"  class="mt-4 bg-red-700 text-white p-2 rounded">Fechar</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits} from 'vue';

const props = defineProps<{
  show: boolean,
  data: Record<string, any>
}>();

const emits = defineEmits(['close', 'finalizar']);

function finish() {
  emits('finalizar');
}

function cancel() {
  emits('close');
}
</script>