import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '~/entities/user/types'

export const useUsersStore = defineStore('users', () => {
  const users = ref<User[]>([])

  async function fetchUsers() {
    users.value = await $fetch('/api/users')
  }

  return { users, fetchUsers }
})
