import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '~/entities/user/types'

export const useUserSessionStore = defineStore('userSession', () => {
  const user = ref<User | null>(null)

  function setUser(u: User) {
    user.value = u
    localStorage.setItem('userSession', JSON.stringify(u))
  }

  function clearUser() {
    user.value = null
    localStorage.removeItem('userSession')
  }

  function loadSession() {
    const data = localStorage.getItem('userSession')
    if (data) user.value = JSON.parse(data)
  }

  async function login(login: string, password: string) {
    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ login, password }),
        headers: { 'Content-Type': 'application/json' },
      })
      if (!res.ok) {
        let errMsg = 'Auth failed';
        try {
          const err = await res.json();
          if (err && err.message) errMsg = err.message;
        } catch {}
        throw new Error(errMsg);
      }
      const userData = await res.json();
      setUser(userData);
      return userData;
    } catch (e) {
      console.error('Login error:', e);
      throw e;
    }
  }

  const isAuth = computed(() => !!user.value)

  return { user, setUser, clearUser, loadSession, isAuth, login }
})
