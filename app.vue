<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style lang="scss">
body {
  font-family: 'Inter', sans-serif;
  background: #f8f9fa;
  margin: 0;
  color: #222;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

input, button, select {
  font-family: inherit;
}

.container {
  max-width: 1200px;
  margin: 40px auto;
  padding: 24px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.04);
}
</style>
