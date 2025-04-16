<template>
  <table class="users-table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Имя</th>
        <th>Email</th>
        <th>Роль</th>
        <th>Статус</th>
        <th>Дата создания</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in filteredUsers" :key="user.id">
        <td>{{ user.id }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.role }}</td>
        <td>{{ user.status }}</td>
        <td>{{ user.date_created }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import type { User } from '~/entities/user/types'
import { useUsersStore } from '~/entities/user/model/usersStore'
const props = defineProps<{ filter: { date?: string, roles?: string[] } }>()

const store = useUsersStore()

onMounted(() => {
  if (!store.users.length) store.fetchUsers()
})

const filteredUsers = computed(() => {
  let result = store.users
  if (props.filter.date) {
    result = result.filter((u: User) => u.date_created.startsWith(props.filter.date ?? ""))
  }
  if ((props.filter?.roles?.length ?? 0) > 0) {
    result = result.filter((u: User) => (props.filter?.roles ?? []).includes(u.role))
  }
  return result
})
</script>

<style scoped lang="scss">
.users-table {
  width: 100%;
  border-collapse: collapse;
  background: #fafbfc;
  th, td {
    padding: 10px 12px;
    border-bottom: 1px solid #e0e0e0;
    text-align: left;
  }
  th {
    background: #f1f3f4;
    font-weight: 600;
  }
  tr:last-child td {
    border-bottom: none;
  }
}
</style>
