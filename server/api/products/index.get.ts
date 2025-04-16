import { readFileSync } from 'fs'
import { defineEventHandler } from 'h3'
import { join } from 'path'
import type { Product } from '~/entities/product/types'

export default defineEventHandler(() => {
  const file = readFileSync(join(process.cwd(), 'products.json'), 'utf-8')
  const products: Product[] = JSON.parse(file)
  return products
})
