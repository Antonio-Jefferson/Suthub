<template>
  <div class="flex justify-center items-center min-h-screen z-10">
    <UContainer class="w-full md:w-[800px] h-auto md:h-[700px] p-0">
      <UCard>
        <h1 class="text-center font-bold text-xl">
          Formulário de Cadastro
        </h1>
        <div class="m-6 flex items-center flex-wrap justify-center">
          <div v-for="stepNumber in 3" :key="stepNumber" class="flex items-center">
            <div
              :class="{ 'bg-green-500': step >= stepNumber, 'bg-gray-300': step < stepNumber }"
              class="md:h-12 w-12 flex justify-center items-center rounded-full"
            >
              {{ stepNumber }}
            </div>
            <div v-if="stepNumber < 3" :class="{ 'bg-green-500': step >= stepNumber, 'bg-gray-300': step < stepNumber }" class="w-12 sm:w-28 md:w-56 h-1 my-2 md:my-0"></div>
          </div>
        </div>
        <UForm :schema="RegisterSchema" :state="state" class="space-y-4" @submit.prevent="onSubmit">
          <div v-if="step === 1">
            <UFormGroup class="mb-6" label="Nome completo" required>
              <UInput type="text" v-model="state.fullName" />
              <div v-if="errors.fullName" class="text-red-500">{{ errors.fullName }}</div>
            </UFormGroup>
            <div class="flex flex-col md:flex-row md:gap-3">
              <UFormGroup label="Data de nascimento" required class="w-full mb-6 md:w-1/2">
                <UInput type="date" v-model="state.dateOfBirth" />
                <div v-if="errors.dateOfBirth" class="text-red-500">{{ errors.dateOfBirth }}</div>
              </UFormGroup>
              <UFormGroup label="CPF" required class="w-full mb-6 md:w-1/2">
                <UInput type="cpf" v-model="state.CPF" />
                <div v-if="errors.CPF" class="text-red-500">{{ errors.CPF }}</div>
              </UFormGroup>
            </div>
            <div class="flex flex-col md:flex-row md:gap-3">
              <UFormGroup label="Espécie do pet" class="w-full mb-6 md:w-1/2">
                <UInputMenu
                  v-model="state.petSpecies"
                  :options="pets"
                  @change="updateBreeds"
                />
                <div v-if="errors.petSpecies" class="text-red-500">{{ errors.petSpecies }}</div>
              </UFormGroup>
              <UFormGroup label="Raça do pet" class="w-full md:w-1/2">
              <UInputMenu
                v-model="state.petBreed"
                :options="breeds"
              />
              <div v-if="state.petBreed === 'Outro'" class="mt-4">
                <UFormGroup label="Outro" class="w-full">
                  <UInput type="text" v-model="state.otherPetBreed" />
                </UFormGroup>
              </div>
              <div v-if="errors.otherPetBreed" class="text-red-500">{{ errors.otherPetBreed}}</div>
            </UFormGroup>
            </div>
          </div>

          <div v-if="step === 2">
            <div class="flex flex-col md:flex-row md:gap-3">
              <UFormGroup label="CEP" class="w-full mb-6 md:w-1/2">
                <UInput type="text" v-model="state.CEP" @change="handleCEPChange" />
                <div v-if="errors.CEP" class="text-red-500">{{ errors.CEP }}</div>
              </UFormGroup>
              <UFormGroup label="Estado" class="w-full mb-6 md:w-1/2">
                <UInput type="text" v-model="state.state" />
                <div v-if="errors.state" class="text-red-500">{{ errors.state }}</div>
              </UFormGroup>
            </div>
            <div class="flex flex-col md:flex-row md:gap-3">
              <UFormGroup label="Cidade" class="w-full mb-6 md:w-1/2">
                <UInput type="text" v-model="state.city" />
                <div v-if="errors.city" class="text-red-500">{{ errors.city }}</div>
              </UFormGroup>
              <UFormGroup label="Bairro" class="w-full mb-6 md:w-1/2">
                <UInput type="text" v-model="state.neighborhood" />
                <div v-if="errors.neighborhood" class="text-red-500">{{ errors.neighborhood }}</div>
              </UFormGroup>
              <UFormGroup label="Rua" class="w-full mb-6 md:w-1/2">
                <UInput type="text" v-model="state.street" />
                <div v-if="errors.street" class="text-red-500">{{ errors.street }}</div>
              </UFormGroup>
            </div>
            <div class="flex flex-col md:flex-row md:gap-3">
              <UFormGroup label="Renda mensal" class="w-full mb-6 md:w-1/2">
                <UInput type="text" v-model="state.monthlyIncome" />
                <div v-if="errors.monthlyIncome" class="text-red-500">{{ errors.monthlyIncome }}</div>
              </UFormGroup>
            </div>
          </div>

          <div v-if="step === 3">
            <div class="text-center">
              Cadastro realizado com sucesso!
            </div>
            <div class="flex justify-center">
              <UButton to="/Recipes"  class="mt-4">
                Ir para página Home
              </UButton>
            </div>
          </div>
          <div class="flex justify-end">
            <UButton v-if="step <= 2" class="mr-4 cursor-pointer" @click="previousStep">
              Voltar
            </UButton>
            <UButton v-if="step < 2" class="cursor-pointer" @click="nextStep">
              Próximo
            </UButton>
            <UButton v-if="step === 2" class="cursor-pointer" @click="openModal">
              Continuar
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
  petSpecies: 'cão',
  petBreed: '',
  CEP: '',
  state: '',
  city: '',
  neighborhood: '',
  street: '',
  monthlyIncome: '',
  otherPetBreed: ''
});

const errors = reactive<{ [key: string]: string }>({});

function onSubmit(event: Event) {
  event.preventDefault();
  if (isStepValid(step, state, errors)) {
    if (step.value === 2) {
      step.value++;
    }
  }
}

function openModal() {
  if (isStepValid(step, state, errors)) {
    showModal.value = true;
  }
}
const breeds = ref<string[]>(breedsDogs);

function updateBreeds() {
  breeds.value = state.petSpecies === 'cão' ? breedsDogs : state.petSpecies === 'gato' ? breedsCats : [];
}

const step = ref(1);

function finishRegistration() {
  step.value = 3;
  showModal.value = false;
}
function cancelModal(){
  showModal.value = false
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
