import { defineEventHandler } from 'h3';
import { readFileSync } from 'fs';
import { join } from 'path';

export default defineEventHandler(() => {
  try {
    const file = readFileSync(join(process.cwd(), 'products.json'), 'utf-8');
    return JSON.parse(file);
  } catch (e) {
    console.error('Cannot read products.json:', e);
    return [];
  }
});
