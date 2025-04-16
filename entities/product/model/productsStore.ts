import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Product } from '~/entities/product/types'

export const useProductsStore = defineStore('products', () => {
  const products = ref<Product[]>([])

  async function fetchProducts() {
    products.value = await $fetch('/api/products')
  }

  return { products, fetchProducts }
})
