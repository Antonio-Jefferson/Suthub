<template>
  <div>
    <UFormGroup class="mb-6 md:w-3/4" label="Nome completo" required>
      <UInput size="xl" type="text" v-model="state.fullName" />
      <div v-if="errors.fullName" class="text-red-500 text-xs mt-2 md:text-sm">{{ errors.fullName }}</div>
    </UFormGroup>
    <div class="flex flex-col md:flex-row md:gap-3">
      <UFormGroup label="Data de nascimento" required class="w-full mb-6 md:w-1/2">
        <UInput size="xl" type="date" v-model="state.dateOfBirth" />
        <div v-if="errors.dateOfBirth" class="text-red-500 text-xs mt-2 md:text-sm">{{ errors.dateOfBirth }}</div>
      </UFormGroup>
      <UFormGroup label="CPF" required class="w-full mb-6 md:w-1/2">
        <UInput size="xl" type="cpf" v-model="state.CPF" v-maska data-maska="###.###.###-##" />
        <div v-if="errors.CPF" class="text-red-500 text-xs mt-2 md:text-sm">{{ errors.CPF }}</div>
      </UFormGroup>
    </div>
    <div class="flex flex-col md:flex-row md:gap-3">
      <UFormGroup label="Espécie do pet" class="w-full mb-6 md:w-1/2">
        <UInputMenu size="xl" v-model="state.petSpecies" :options="pets" @change="updateBreeds" />
        <div v-if="errors.petSpecies" class="text-red-500 text-xs mt-2 md:text-sm">{{ errors.petSpecies }}</div>
      </UFormGroup>
        <UFormGroup label="Raça do pet" class="w-full md:w-1/2">
        <UInputMenu size="xl" v-model="state.petBreed" :options="breeds" required />
        <div v-if="errors.petBreed" class="text-red-500 text-xs mt-2 md:text-sm">{{ errors.petBreed }}</div>
        <div v-if="state.petBreed === 'Outro'" class="mt-4">
          <UFormGroup label="Outro" class="w-full">
          <UInput size="xl" type="text" v-model="state.otherPetBreed" />
        <div v-if="errors.otherPetBreed" class="text-red-500 text-xs mt-2 md:text-sm">{{ errors.otherPetBreed }}</div>
      </UFormGroup>
  </div>
</UFormGroup>

    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs } from 'vue';
import { z } from 'zod';
import { RegisterSchema } from '../schemas/RegisterSchema';

const props = defineProps({
  state: Object as () => z.output<typeof RegisterSchema>,
  errors: Object as () => { [key: string]: string },
  updateBreeds: Function,
});

const { state, errors, updateBreeds } = toRefs(props);

const pets = ['cão', 'gato'];
const breedsDogs = [
  'Labrador Retriever',
  'Golden Retriever',
  'German Shepherd',
  'Beagle',
  'Bulldog',
  'Outro'
];

const breedsCats = [
  'Persa',
  'Maine Coon',
  'Siamese',
  'Ragdoll',
  'British Shorthair',
  'Outro'
];

const breeds = computed(() => (state.value.petSpecies === 'cão' ? breedsDogs : state.value.petSpecies === 'gato' ? breedsCats : []));
</script>
