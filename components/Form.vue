<template>
  <div class="flex justify-center items-center min-h-screen">
    <UContainer class="w-full md:w-[800px] h-auto md:h-[700px] p-0">
      <UCard>
        <h1 class="text-center font-bold text-xl">Formulário de Cadastro</h1>
        <div class="m-6 flex items-center flex-wrap justify-center">
          <div v-for="stepNumber in 3" :key="stepNumber" class="flex items-center">
            <div
              :class="{ 'bg-green-500': step >= stepNumber, 'bg-gray-400': step < stepNumber }"
              class="md:h-12 w-12 flex justify-center items-center rounded-full"
            >
              {{ stepNumber }}
            </div>
            <div :class="{ 'bg-green-500': step >= stepNumber, 'bg-gray-400': step < stepNumber }" v-if="stepNumber < 3"  class=" w-12 sm:w-28 md:w-56 h-1 bg-slate-50 my-2 md:my-0"></div>
          </div>
        </div>
        <UForm :state="state" class="space-y-4" @submit="onSubmit">
          <div  v-if="step === 1">
            <UFormGroup class="mb-6" label="Nome completo" required>
              <UInput v-model="state.fullName"></UInput>
            </UFormGroup>
            <div class="flex flex-col md:flex-row md:gap-3">
              <UFormGroup label="Data de nascimento" required class="w-full mb-6 md:w-1/2">
                <UInput v-model="state.dateOfBirth"></UInput>
              </UFormGroup>
              <UFormGroup label="CPF" required class="w-full mb-6 md:w-1/2">
                <UInput v-model="state.CPF" ></UInput>
              </UFormGroup>
            </div>
            <div class="flex flex-col md:flex-row md:gap-3">
              <UFormGroup label="Espécie do pet" class="w-full mb-6 md:w-1/2">
                <UInputMenu
                  v-model="state.petSpecies"
                  :options="pets"
                  @change="updateBreeds"
                />
              </UFormGroup>
              <UFormGroup label="Raça do pet" class="w-full md:w-1/2">
                <UInputMenu
                  v-model="state.petBreed"
                  :options="breeds"
                />
              </UFormGroup>
            </div>
          </div>

          <div v-if="step === 2">
            <div class="flex flex-col md:flex-row md:gap-3">
              <UFormGroup label="CEP" class="w-full mb-6 md:w-1/2">
                <UInput v-model="state.CEP"/>
              </UFormGroup>
              <UFormGroup label="Estado" class="w-full mb-6 md:w-1/2">
                <UInput v-model="state.state" />
              </UFormGroup>
            </div>
            <div class="flex flex-col md:flex-row md:gap-3">
              <UFormGroup label="Cidade" class="w-full mb-6 md:w-1/2">
                <UInput v-model="state.city"/>
              </UFormGroup>
              <UFormGroup label="Bairro" class="w-full mb-6 md:w-1/2">
                <UInput v-model="state.neighborhood" />
              </UFormGroup>
            </div>
            <div class="flex flex-col md:flex-row md:gap-3">
              <UFormGroup label="Rua" class="w-full mb-6 md:w-1/2">
                <UInput v-model="state.street"/>
              </UFormGroup>
            </div>
          </div>

          <div v-if="step === 3">
            <div class="text-center">Cadastro realizado com sucesso!</div>
            <div class="flex justify-center">
              <UButton class="mt-4">Ver dados cadastrados</UButton>
            </div>
          </div>
          <div class="flex justify-end">
            <UButton v-if="step > 1" class="mr-4" @click="previousStep">Voltar</UButton>
            <UButton @click="nextStep" >Próximo</UButton>
          </div>
        </UForm>
      </UCard>
    </UContainer>
  </div>
</template>



<script lang="ts" setup>
import { reactive, ref } from 'vue';
const pets = ['cão', 'gato'];

const breedsDogs = [
  "Labrador Retriever",
  "Golden Retriever",
  "German Shepherd",
  "Beagle",
  "Bulldog",
  "Outro"
];
const breedsCats = [
  "Persian",
  "Maine Coon",
  "Siamese",
  "Ragdoll",
  "British Shorthair",
  "Outro"
];

const state = reactive({
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
  monthlyincome: ''
});

function onSubmit(event: Event) {
  event.preventDefault();
  console.log(state);
}
const breeds = ref<string[]>([]);

function updateBreeds() {
  breeds.value = state.petSpecies === 'cão' ? breedsDogs : state.petSpecies === 'gato' ? breedsCats : [];
}
const step = ref(1);

function nextStep() {
  if (step.value < 3) {
    step.value++;
  }
}

function previousStep() {
  if (step.value > 1) {
    step.value--;
  }
}
</script>

<style lang="css" scoped></style>
