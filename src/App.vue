<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

window.addEventListener('resize', () => {
  const app = document.getElementById('app')
  app!.style.display = 'flex'
  app!.style.justifyContent = 'center'
  app!.style.alignItems = 'center'
})
</script>
<template>
  <RouterView />
</template>