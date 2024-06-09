<template>
  <div>
    <UContainer class="w-full flex justify-center h-auto p-0 md:mt-24">
      <UCard class="shadow-neutral-950 w-full md:mb-12 md:w-3/4 bg-[#E5E5E5] h-screen md:h-auto">
        <h1 class="text-center text-[#4d4b4b] font-bold text-xl md:text-3xl">
          Formulário de Cadastro
        </h1>
        <FormSteps :step="step" />
        <UForm :schema="RegisterSchema" :state="state" class="space-y-4" @submit.prevent="onSubmit">
          <StepOne v-if="step === 1" :state="state" :errors="errors" @updateBreeds="updateBreeds" />
          <StepTwo v-if="step === 2" :state="state" :errors="errors" @handleCEPChange="handleCEPChange" />
          <StepThree v-if="step === 3" />
          <div class="flex justify-end">
            <FormButtons :step="step" @previous-step="previousStep" @next-step="nextStep" @open-modal="openModal" />
          </div>
        </UForm>
      </UCard>
    </UContainer>
    <ModalInfoUser :show="showModal" :data="state" @close="showModal = false" @finalizar="finishRegistration" @cancel="cancelModal"/>
  </div>
</template>

<script lang="ts" setup>
import { z } from 'zod';
import { reactive, ref } from 'vue';
import { RegisterSchema } from '../schemas/RegisterSchema';
import { isStepValid } from '../utils/isStepValid';
import { fetchAddressFromCEP } from '../server/cepService';

const pets = ['cão', 'gato'];
const showModal = ref(false);
const step = ref(1);
const breeds = ref<string[]>();

const state = reactive<z.output<typeof RegisterSchema>>({
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
});

const errors = reactive<{ [K in keyof typeof state]?: string }>({});

function onSubmit() {
  if (isStepValid(step, state, errors)) {
    step.value++;
  }
}

function openModal() {
  if (isStepValid(step, state, errors)) {
    showModal.value = true;
  }
}

function updateBreeds() {
  breeds.value = state.petSpecies === 'cão' ? breedsDogs : state.petSpecies === 'gato' ? breedsCats : [];
}

function finishRegistration() {
  step.value = 3;
  showModal.value = false;
}

function cancelModal() {
  showModal.value = false;
}

function nextStep() {
  if (isStepValid(step, state, errors)) {
    if (step.value < 2) {
      step.value++;
    }
  }
}

function previousStep() {
  if (step.value > 1) {
    step.value--;
  }
}

async function updateAddressFromCEP() {
  if (state.CEP) {
    const parts = state.CEP.split('-');
    const joinedParts = parts.join('');
    const addressData = await fetchAddressFromCEP(joinedParts);
    if (addressData) {
      state.state = addressData.state;
      state.city = addressData.city;
      state.neighborhood = addressData.neighborhood;
      state.street = addressData.street;
    }
  }
}

function handleCEPChange() {
  updateAddressFromCEP();
}
</script>
