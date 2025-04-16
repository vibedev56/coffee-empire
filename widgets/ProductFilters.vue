<template>
  <div class="filters">
    <div class="filter-group">
      <h2>Название:</h2>
      <div class="checkbox-list">
        <label v-for="val in nameOptions" :key="val">
          <input type="checkbox" :value="val" v-model="filters.name" @change="emitFilter">{{ val }}</label>
      </div>
    </div>
    <div class="filter-group">
      <h2>Бренд:</h2>
      <div class="checkbox-list">
        <label v-for="val in brandOptions" :key="val">
          <input type="checkbox" :value="val" v-model="filters.brand" @change="emitFilter">{{ val }}</label>
      </div>
    </div>
    <div class="filter-group">
      <h2>Статус:</h2>
      <div class="radio-list">
        <label>
          <input type="radio" value="" v-model="statusRadio" @change="onStatusRadioChange"> Все
        </label>
        <label v-for="val in statusOptions" :key="val">
          <input type="radio" :value="val" v-model="statusRadio" @change="onStatusRadioChange">{{ val === 'available' ? 'Доступен' : 'Недоступен' }}</label>
      </div>
    </div>
    <div class="filter-group">
      <label>
        <h2>Цена от:</h2>
        <input type="number" v-model.number="filters.price!.min" @input="onPriceInput('min')" placeholder="мин.">
      </label>
      <label>
        <h2>до:</h2>
        <input type="number" v-model.number="filters.price!.max" @input="onPriceInput('max')" placeholder="макс.">
      </label>
    </div>  
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useProductsStore } from '~/entities/product/model/productsStore'
import type { ProductFilters } from '~/entities/product/types'
const emit = defineEmits(['filter'])

const productsStore = useProductsStore()

const filters = ref<ProductFilters>({
  name: [],
  brand: [],
  status: [],
  price: { min: undefined, max: undefined },
})

const statusRadio = ref('')

const nameOptions = computed(() => Array.from(new Set(productsStore.products.map(p => p.name))))
const brandOptions = computed(() => Array.from(new Set(productsStore.products.map(p => p.brand))))
const statusOptions = computed(() => Array.from(new Set(productsStore.products.map(p => p.status))))

function emitFilter() {
  emit('filter', { ...filters.value })
}

function onPriceInput(type: 'min' | 'max') {
  if (!filters.value.price) return;
  const val = filters.value.price[type];
  filters.value.price[type] = val == null ? undefined : val;
  emitFilter();
}

function onStatusRadioChange() {
  filters.value.status = statusRadio.value ? [statusRadio.value] : []
  emitFilter()
}

onMounted(() => {
  emitFilter()
})

watch(filters, emitFilter, { deep: true })
</script>

<style scoped lang="scss">
.filters {
  display: flex;
  gap: 32px;
  margin-bottom: 22px;
}
.filter-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  label {
    font-weight: 500;
  }
  select, input[type="date"], input[type="number"] {
    padding: 6px 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 15px;
  }
  .checkbox-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 4px;
  }
  .radio-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 4px;
  }
}
</style>
