import { readFileSync } from 'fs'
import { defineEventHandler } from 'h3'
import { join } from 'path'
import type { User } from '~/entities/user/types'


export default defineEventHandler(() => {
  const file = readFileSync(join(process.cwd(), 'users.json'), 'utf-8')
  const users: User[] = JSON.parse(file)
  return users
})
