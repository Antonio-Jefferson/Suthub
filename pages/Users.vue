<template>
  <div class="sm:px-3 md:px-6 lg:px-8 xl:px-10">
    <UContainer>
      <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
        <UInput size="xl" v-model="q" placeholder="Buscar usuário..." />
      </div>

      <UTable class="mb-24" :rows="filteredRows" :columns="columns">
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
import { computed, onMounted, ref } from 'vue'
import { formatDate } from '../utils/formatDate';
import type { UserDisplayInfo } from '~/@types/userType';

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
      const formattedUsers = responseData.users.map((user: any) => ({
        photo: user.image,
        name: `${user.firstName} ${user.lastName}`,
        dateOfBirth: formatDate(user.birthDate),
        gender: user.gender,
        location: user.address.coordinates
      }));

      formattedUsers.sort((a: any, b: any) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });

      users.value = formattedUsers;
    }
  } catch (error) {
    console.error('Failed to fetch users:', error);
  }
}

const q = ref('');

const filteredRows = computed(() => {
  if (!q.value) {
    return users.value;
  }

  return users.value.filter((user: UserDisplayInfo) => {
    return Object.values(user).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase())
    })
  });
});

function handleLocationClick(lat: number, lng: number) {
  const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  window.open(url, '_blank');
}

onMounted(() => {
  fetchDataUsers();
});
</script>
