<template>
  <div>
    <UContainer class="w-full flex justify-center h-auto p-0  md:mt-24 ">
      <UCard class="shadow-neutral-950 w-full md:mb-12 md:w-3/4 bg-[#E5E5E5] h-screen md:h-auto">
        <h1 class="text-center text-[#655E5E] font-bold text-xl md:text-3xl">
          Formulário de Cadastro
        </h1>
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
        <UForm :schema="RegisterSchema" :state="state" class="space-y-4" @submit.prevent="onSubmit">
          <div v-if="step === 1">
            <UFormGroup class="mb-6 w-3/4" label="Nome completo" required>
              <UInput size="xl" type="text" v-model="state.fullName" />
              <div v-if="errors.fullName" class="text-red-500 text-xs mt-2 md:text-sm">{{ errors.fullName }}</div>
            </UFormGroup>
            <div class="flex flex-col md:flex-row md:gap-3">
              <UFormGroup label="Data de nascimento" required class="w-full mb-6 md:w-1/2">
                <UInput size="xl" type="date" v-model="state.dateOfBirth" />
                <div v-if="errors.dateOfBirth" class="text-red-500 text-xs mt-2 md:text-sm">{{ errors.dateOfBirth }}</div>
              </UFormGroup>
              <UFormGroup label="CPF" required class="w-full mb-6 md:w-1/2">
                <UInput size="xl" type="cpf" v-model="state.CPF" v-mask="'###.###.###-##'" />
                <div v-if="errors.CPF" class="text-red-500 text-xs mt-2 md:text-sm">{{ errors.CPF }}</div>
              </UFormGroup>
            </div>
            <div class="flex flex-col md:flex-row md:gap-3">
              <UFormGroup label="Espécie do pet" class="w-full mb-6 md:w-1/2">
                <UInputMenu
                  size="xl"
                  v-model="state.petSpecies"
                  :options="pets"
                  @change="updateBreeds"
                />
                <div v-if="errors.petSpecies" class="text-red-500 text-xs mt-2 md:text-sm">{{ errors.petSpecies }}</div>
              </UFormGroup>
              <UFormGroup label="Raça do pet" class="w-full md:w-1/2">
                <UInputMenu
                  size="xl"
                  v-model="state.petBreed"
                  :options="breeds"
                />
                <div v-if="state.petBreed === 'Outro'" class="mt-4">
                  <UFormGroup label="Outro" class="w-full">
                    <UInput size="xl" type="text" v-model="state.otherPetBreed" />
                  </UFormGroup>
                </div>
                <div v-if="errors.otherPetBreed" class="text-red-500 text-xs mt-2 md:text-sm">{{ errors.otherPetBreed }}</div>
              </UFormGroup>
            </div>
          </div>

          <div v-if="step === 2">
            <div class="flex flex-col md:flex-row md:gap-3">
              <UFormGroup label="CEP" class="w-full mb-6 md:w-1/2">
                <UInput type="text" v-model="state.CEP" @change="handleCEPChange" />
                <div v-if="errors.CEP" class="text-red-500 text-xs mt-2 md:text-sm">{{ errors.CEP }}</div>
              </UFormGroup>
              <UFormGroup label="Estado" class="w-full mb-6 md:w-1/2">
                <UInput type="text" v-model="state.state" />
                <div v-if="errors.state" class="text-red-500 text-xs mt-2 md:text-sm">{{ errors.state }}</div>
              </UFormGroup>
            </div>
            <div class="flex flex-col md:flex-row md:gap-3">
              <UFormGroup label="Cidade" class="w-full mb-6 md:w-1/2">
                <UInput type="text" v-model="state.city" />
                <div v-if="errors.city" class="text-red-500 text-xs mt-2 md:text-sm">{{ errors.city }}</div>
              </UFormGroup>
              <UFormGroup label="Bairro" class="w-full mb-6 md:w-1/2">
                <UInput type="text" v-model="state.neighborhood" />
                <div v-if="errors.neighborhood" class="text-red-500 text-xs mt-2 md:text-sm">{{ errors.neighborhood }}</div>
              </UFormGroup>
              <UFormGroup label="Rua" class="w-full mb-6 md:w-1/2">
                <UInput type="text" v-model="state.street" />
                <div v-if="errors.street" class="text-red-500 text-xs mt-2 md:text-sm">{{ errors.street }}</div>
              </UFormGroup>
            </div>
            <div class="flex flex-col md:flex-row md:gap-3">
              <UFormGroup label="Renda mensal" class="w-full mb-6 md:w-1/2">
                <UInput type="text" v-model="state.monthlyIncome" />
                <div v-if="errors.monthlyIncome" class="text-red-500 text-xs mt-2 md:text-sm">{{ errors.monthlyIncome }}</div>
              </UFormGroup>
            </div>
          </div>

          <div v-if="step === 3">
            <div class="text-center">
              Cadastro realizado com sucesso!
            </div>
            <div class="flex justify-center">
              <UButton to="/Recipes" class="mt-4">
                Ir para página Home
              </UButton>
            </div>
          </div>
          <div class="flex justify-end">
            <UButton v-if="step <= 2" class="mr-4 cursor-pointer bg-[#46A1F6]" @click="previousStep">
              Voltar
            </UButton>
            <UButton v-if="step < 2" class="cursor-pointer bg-[#46A1F6]" @click="nextStep">
              Próximo
            </UButton>
            <UButton v-if="step === 2" class="cursor-pointer" @click="openModal">
              Conferir dados
            </UButton>
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
import ModalInfoUser from './ModalInfoUser.vue';

const pets = ['cão', 'gato'];
const showModal = ref(false);
const step = ref(1);
const breeds = ref<string[]>();

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
    const addressData = await fetchAddressFromCEP(state.CEP);
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
