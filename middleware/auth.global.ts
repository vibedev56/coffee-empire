import { useUserSessionStore } from '~/features/auth/model/userSessionStore'
import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app'

export default defineNuxtRouteMiddleware((to) => {
  const store = useUserSessionStore()
  if (process.client) {
    store.loadSession()
    if (!store.user && to.path !== '/login') {
      return navigateTo('/login')
    }
    if (store.user && to.path === '/login') {
      return navigateTo('/account')
    }
    if (store.user && to.path !== '/account' && to.path !== '/login') {
      return navigateTo('/account')
    }
  }
})
