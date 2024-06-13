<template>
  <div class="px-3 sm:px-6 md:px-8 lg:px-10">
    <UContainer>
      <div class="flex flex-col md:flex-row items-center gap-4 md:gap-8 px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
        <UInput size="xl" v-model="searchQuery" placeholder="Buscar usuário..." class="w-full md:w-auto" />
        <USelect v-model="selectedYear" :options="years" placeholder="Filtrar por ano de nascimento..." class="w-full md:w-auto" />
        <USelect size="sm" v-model="selectedGender" :options="genderOptions" placeholder="Filtrar por gênero..." class="w-full md:w-auto" />
        <UButton size="sm" @click="clearFilters" class="w-full md:w-auto">Limpar Filtros</UButton>
      </div>

      <UTable
        :empty-state="emptyStateMessage"
        class="w-full mb-24"
        :rows="filteredUsers"
        :columns="columns"
      >
        <template #photo-data="{ row }">
          <img :src="row.photo" alt="Imagem do usuário" class="rounded-full h-10 w-10" />
        </template>

        <template #location-data="{ row }">
          <UButton @click="showLocation(row.location.lat, row.location.lng)">
            Ver localização
          </UButton>
        </template>
      </UTable>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import type { UserDisplayInfo } from '~/@types/userType';

useHead({
  title: 'SutHub - Usuários',
})

const searchQuery = ref('');
const selectedYear = ref('');
const selectedGender = ref('');
const years = Array.from({ length: new Date().getFullYear() - 1899 }, (_, i) => 1900 + i);

const columns = [
  { key: 'photo', label: 'Imagem' },
  { key: 'name', label: 'Nome completo' },
  { key: 'dateOfBirth', label: 'Data de nascimento' },
  { key: 'gender', label: 'Gênero' },
  { key: 'location', label: 'Localização' }
];
const users = ref<UserDisplayInfo[]>([]);
const genderOptions = ['male', 'female'];

async function fetchUsers() {
  try {
    const response = await fetch('api/users/users');
    if (response.ok) {
      const responseData = await response.json();
      users.value = responseData;
    } else {
      throw new Error('Failed to fetch users');
    }
  } catch (error) {
    console.error('Failed to fetch users:', error);
  }
}

const filteredUsers = computed(() => {
  let filtered = users.value;
  filtered = filterByName(filtered);
  filtered = filterByYear(filtered);
  filtered = filterByGender(filtered);
  return filtered;
});

function filterByName(users: UserDisplayInfo[]) {
  if (!searchQuery.value.trim()) return users;
  return users.filter(user => user.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
}

function filterByYear(users: UserDisplayInfo[]) {
  if (!selectedYear.value) return users;
  return users.filter(user => user.dateOfBirth.includes(selectedYear.value.toString()));
}

function filterByGender(users: UserDisplayInfo[]) {
  if (!selectedGender.value) return users;
  return users.filter(user => user.gender === selectedGender.value);
}

function clearFilters() {
  searchQuery.value = '';
  selectedYear.value = '';
  selectedGender.value = '';
}

function showLocation(lat: number, lng: number) {
  const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  window.open(url, '_blank');
}

const emptyStateMessage = computed(() => {
  if (filteredUsers.value.length === 0) {
    return { icon: 'i-heroicons-information-circle-20-solid', label: 'Não há dados disponíveis com os filtros selecionados.' };
  } else {
    return { icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' };
  }
});

onMounted(fetchUsers);
</script>

<style scoped>
@media (min-width: 768px) {
  .gap-24 {
    gap: 24px;
  }
}
</style>
