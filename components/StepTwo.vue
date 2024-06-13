<template>
  <div>
    <div class="flex flex-col md:flex-row md:gap-3">
      <UFormGroup label="CEP" class="w-full mb-6 md:w-1/2">
        <UInput size="xl" type="text" v-model="state.CEP" @change="handleCEPChange" v-maska data-maska="#####-###" />
        <div v-if="errors.CEP" class="text-red-500 text-xs mt-2 md:text-sm">{{ errors.CEP }}</div>
      </UFormGroup>
      <UFormGroup label="Estado" class="w-full mb-6 md:w-1/2">
        <UInput size="xl" type="text" v-model="state.state" :readonly="isAddressFilled" />
        <div v-if="errors.state" class="text-red-500 text-xs mt-2 md:text-sm">{{ errors.state }}</div>
      </UFormGroup>
    </div>
    <div class="flex flex-col md:flex-row md:gap-3">
      <UFormGroup label="Cidade" class="w-full mb-6 md:w-1/2">
        <UInput size="xl" type="text" v-model="state.city" :readonly="isAddressFilled" />
        <div v-if="errors.city" class="text-red-500 text-xs mt-2 md:text-sm">{{ errors.city }}</div>
      </UFormGroup>
      <UFormGroup label="Bairro" class="w-full mb-6 md:w-1/2">
        <UInput size="xl" type="text" v-model="state.neighborhood" />
        <div v-if="errors.neighborhood" class="text-red-500 text-xs mt-2 md:text-sm">{{ errors.neighborhood }}</div>
      </UFormGroup>
      <UFormGroup label="Rua" class="w-full mb-6 md:w-1/2">
        <UInput size="xl" type="text" v-model="state.street" />
        <div v-if="errors.street" class="text-red-500 text-xs mt-2 md:text-sm">{{ errors.street }}</div>
      </UFormGroup>
    </div>
    <div class="flex flex-col md:flex-row md:gap-3">
      <UFormGroup label="Renda mensal" class="w-full mb-6 md:w-1/2">
        <div class="relative border rounded-md">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-[#474747]">R$</span>
          <UInput
            size="xl"
            type="text"
            v-model="state.monthlyIncome"
            v-maska
            data-maska="###.###.###,##"
            data-maska-tokens="A:[0-9]|B:[0-9]:repeated|C:[0-9]:optional"
            data-maska-reversed
            class="pl-12"
          />
        </div>
        <div v-if="errors.monthlyIncome" class="text-red-500 text-xs mt-2 md:text-sm">{{ errors.monthlyIncome }}</div>
      </UFormGroup>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toRefs, ref } from 'vue';
import { z } from 'zod';
import { RegisterSchema } from '../schemas/RegisterSchema';
import { fetchAddressFromCEP } from '../server/cepService';

const isAddressFilled = ref(false);

function checkAddressFilled() {
  isAddressFilled.value = !!state.value.state && !!state.value.city;
}


const props = defineProps({
  state: {
    type: Object as () => z.output<typeof RegisterSchema>,
    default: () => ({
      fullName: '',
      dateOfBirth: '',
      CPF: '',
      petSpecies: '',
      petBreed: '',
      CEP: '',
      state: '',
      city: '',
      neighborhood: '',
      street: '',
      monthlyIncome: '',
      otherPetBreed: ''
    }),
  },
  errors: {
    type: Object as () => { [key: string]: string },
    default: () => ({}),
  },
});

const { state, errors } = toRefs(props);

async function updateAddressFromCEP() {
  if (state.value.CEP) {
    const parts = state.value.CEP.split('-');
    const joinedParts = parts.join('');
    const addressData = await fetchAddressFromCEP(joinedParts);
    if (addressData) {
      state.value.state = addressData.state;
      state.value.city = addressData.city;
      state.value.neighborhood = addressData.neighborhood;
      state.value.street = addressData.street;

      checkAddressFilled();
    }
  }
}

function handleCEPChange() {
  updateAddressFromCEP();
}
</script>
