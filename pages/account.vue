<template>
  <div class="container">
    <div class="account-header">
      <h1>Личный кабинет</h1>
      <button @click="logout" class="logout-btn">Выйти</button>
    </div>
    <ProductFilters @filter="setFilter" />
    <ProductTable :filter="filter" />
  </div>
</template>

<script setup lang="ts">
import type { ProductFilters as ProductFiltersType } from '~/entities/product/types'
import { useAuth } from '~/features/auth/model/useAuth'
import { ref } from 'vue'
import ProductFilters from '~/widgets/ProductFilters.vue'
import ProductTable from '~/widgets/ProductTable.vue'

const { logoutUser } = useAuth()

const filter = ref<ProductFiltersType>({
  name: [],
  brand: [],
  status: [],
  price: {},
  date_created: {}
})

function logout() {
  logoutUser()
}
function setFilter(val: ProductFiltersType) {
  filter.value = val
}
</script>

<style scoped lang="scss">
.account-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;
}
.logout-btn {
  background: #e53935;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 15px;
  cursor: pointer;
}
</style>
