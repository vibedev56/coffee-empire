import { useUserSessionStore } from '~/features/auth/model/userSessionStore'
import { useRouter } from 'vue-router'
import type { LoginResponse } from './useAuth.types'
import type { User } from '~/entities/user/types'
import type { AuthUser } from './useAuth.types'

function mapAuthUserToUser(authUser: AuthUser): User {
  return {
    id: Number(authUser.id),
    login: authUser.username || '',
    password: authUser.password || '',
    status: authUser.status || 'active',
    date_created: authUser.date_created || new Date().toISOString(),
    name: authUser.name || '',
    email: authUser.email || '',
    role: authUser.role || 'user',
  };
}

export function useAuth() {
  const store = useUserSessionStore()
  const router = useRouter()

  async function loginUser(login: string, password: string): Promise<boolean> {
    const res: LoginResponse = await $fetch('/api/users/login', {
      method: 'POST',
      body: { login, password },
    })
    if (res && res.success && res.user) {
      store.setUser(mapAuthUserToUser(res.user))
      return true
    }
    return false
  }

  function logoutUser() {
    store.clearUser()
    router.push('/login')
  }

  return { loginUser, logoutUser }
}
