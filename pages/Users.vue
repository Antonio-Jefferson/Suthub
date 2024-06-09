<template>
  <div class="sm:px-3 md:px-6 lg:px-8 xl:px-10">
    <UContainer>
      <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
        <UInput size="xl" v-model="q" placeholder="Buscar usuário..." />
      </div>

      <UTable
        :empty-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }"
        class="w-full mb-24"
        :rows="filteredRows"
        :columns="columns"
      >
        <template #photo-data="{ row }">
          <img :src="row.photo" alt="Imagem do usuário" class="rounded-full h-10 w-10" />
        </template>

        <template #location-data="{ row }">
          <UButton @click="handleLocationClick(row.location.lat, row.location.lng)">
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

const q = ref('');
const columns = [
  { key: 'photo', label: 'Imagem' },
  { key: 'name', label: 'Nome completo' },
  { key: 'dateOfBirth', label: 'Data de nascimento' },
  { key: 'gender', label: 'Gênero' },
  { key: 'location', label: 'Localização' }
];

const users = ref<UserDisplayInfo[]>([]);

async function fetchDataUsers() {
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

const filteredRows = computed(() => {
  if (!q.value) {
    return users.value;
  }

  const query = q.value.toLowerCase();
  return users.value.filter(user => user.name.toLowerCase().includes(query));
});

function handleLocationClick(lat: number, lng: number) {
  const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  window.open(url, '_blank');
}

onMounted(() => {
  fetchDataUsers();
});
</script>
