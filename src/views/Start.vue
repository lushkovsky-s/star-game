<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

import Playground from '@/components/Playground.vue'
import bg from '@/assets/start_bg.jpeg'
import StartRocket from '@/assets/start_rocket.svg'
</script>

<template>
  <main :style="{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', width: '100%', height: '100%', position: 'relative' }">
      <RouterLink to="/game">
        <button class="start_btn">Начать игру</button>
      </RouterLink>
      <div style="position: absolute; left: 50%; top: 25%; width: 50%; height: 50%;">
        <Playground />
      </div>
    <div style="position: fixed; left; 0; top: 50%; transform: translateY(-50%); z-index: 1;">
      <StartRocket />
    </div>
  </main>
</template>


<style>
/* Should be here - otherwise vue-flow renders not correctly */
@import '@vue-flow/core/dist/style.css';
@import '@vue-flow/core/dist/theme-default.css';

.start_btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 198px;
  background: white;
  border-radius: 60px;
  padding: 22px 40px;
  border: none;
  text-transform: uppercase;
  font-size: 64px;
  cursor: pointer;
  color: #4F0078;
  font-weight: 600;
  z-index: 2;
  line-height: 64px;
}
</style>
