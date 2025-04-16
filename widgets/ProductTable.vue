<template>
  <div>
    <table class="products-table">
      <thead>
        <tr>
          <th>Название</th>
          <th>Бренд</th>
          <th>Статус</th>
          <th>Цена</th>
          
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in filteredProducts" :key="product.id">
          <td>{{ product.name }}</td>
          <td>{{ product.brand }}</td>
          <td>{{ product.status === 'available' ? 'Есть в наличии' : 'Нету в наличии' }}</td>
          <td>{{ product.price }} р.</td>
          
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useProductsStore } from '~/entities/product/model/productsStore'
import type { ProductFilters } from '~/entities/product/types'

const props = defineProps<{ filter: ProductFilters }>()

const store = useProductsStore()

onMounted(() => {
  if (!store.products.length) store.fetchProducts()
})

const filteredProducts = computed(() => {
  let result = store.products

  if (props.filter.name?.length) {
    result = result.filter(p => props.filter.name!.includes(p.name))
  }

  if (props.filter.brand?.length) {
    result = result.filter(p => props.filter.brand!.includes(p.brand))
  }

  if (props.filter.status?.length) {
    result = result.filter(p => props.filter.status!.includes(p.status))
  }

  if (props.filter.price && (props.filter.price.min !== undefined || props.filter.price.max !== undefined)) {
    if (props.filter.price.min !== undefined && props.filter.price.min !== null) {
      result = result.filter(p => p.price >= Number(props.filter.price!.min))
    }
    if (props.filter.price.max !== undefined && props.filter.price.max !== null) {
      result = result.filter(p => p.price <= Number(props.filter.price!.max))
    }
  }

  if (props.filter.date_created) {
    if (props.filter.date_created.from) {
      result = result.filter(p => new Date(p.dateCreated) >= new Date(props.filter.date_created!.from!))
    }
    if (props.filter.date_created.to) {
      result = result.filter(p => new Date(p.dateCreated) <= new Date(props.filter.date_created!.to!))
    }
  }

  return result
})
</script>

<style scoped lang="scss">
.products-table {
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
