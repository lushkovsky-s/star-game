<script setup>
import { RouterLink, RouterView } from 'vue-router'

import bg from '@/assets/bg.png'
import sad from '@/assets/404.svg'
</script>

<template>
  <main :style="{ backgroundImage: 'url(' + bg + ')', backgroundSize: 'cover', width: '100%', height: '100%', position: 'relative' }">
    <div style="position: absolute; top: 10%; left: 50%; transform: translateX(-50%); width: 80%; height: 80%;">
      <sad />
      <RouterLink to="/">
        <button style="position: absolute; top: 80%; left: 198px; background: white; border-radius: 46.8px; padding: 31px 41px; border: none; text-transform: uppercase; font-size: 36px; cursor: pointer; color: #4F0078; font-weight: 600;">перейти к главной странице</button>
      </RouterLink>
    </div>
  </main>
</template>
