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
    <div class="sticky flex items-center justify-center top-0 z-0 h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
    <!-- <div id="background" class="sticky top-0 z-0 h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"> -->
      <RouterView />
    </div>
</template>