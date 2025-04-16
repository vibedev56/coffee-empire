<template>
  <div class="container">
    <h1>Вход в аккаунт</h1>
    <form @submit.prevent="onLogin">
      <label class="form-group">
        <h2>Логин</h2>
        <input v-model="login" type="text" required >
      </label>
      <label class="form-group">
        <h2>Пароль</h2>
        <input v-model="password" type="password" required>
      </label>
      <button>Войти</button>
    </form>
    <div v-if="error" class="error-block">Введены неверные данные авторизации. Попробуйте ещё раз.</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '~/features/auth/model/useAuth'
import { useRouter } from 'vue-router'

const login = ref('david.jones@creds.com')
const password = ref('52ccca432ab28afd90969084c061b23c')
const error = ref(false)
const router = useRouter()
const { loginUser } = useAuth()

const onLogin = async () => {
  error.value = false
  const success = await loginUser(login.value, password.value)
  if (success) {
    router.push('/')
  } else {
    error.value = true
  }
}
</script>

<style scoped lang="scss">
form {
  display: grid;
  gap: 16px;
} 
.form-group {
  label {
    display: block;
    margin-bottom: 6px;
  }
  h2  {
    margin: 0 0 10px;
  }
  input {
    display: block;
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 16px;
  }
}
button {
  padding: 10px 28px;
  background: #1e88e5;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 12px;
}
.error-block {
  margin-top: 18px;
  color: #d32f2f;
  background: #ffeaea;
  border-radius: 6px;
  padding: 10px 14px;
  font-size: 15px;
}
</style>
