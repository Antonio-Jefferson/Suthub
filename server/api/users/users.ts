import { ref } from 'vue';
import { formatDate } from '~/utils/formatDate';
import type { UserDisplayInfo } from '~/@types/userType';

const users = ref<UserDisplayInfo[]>([]);

export async function fetchUsers() {
  try {
    const response = await fetch('http://dummyjson.com/users');
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
    } else {
      throw new Error('Failed to fetch users');
    }
  } catch (error) {
    console.error('Failed to fetch users:', error);
  }
}

export function getUsers() {
  return users;
}
