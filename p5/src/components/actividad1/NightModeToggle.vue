<script setup lang="ts">
import { ref } from 'vue'

const isNight = ref<boolean>(false)
</script>

<template>
  <div class="night-mode-container">
    <h3>Modo Noche</h3>
    <div 
      class="toggle" 
      :class="{ 'night': isNight }"
      @click="isNight = !isNight"
    >
      <div class="toggle-circle"></div>
    </div>
  </div>
</template>

<style scoped>
.night-mode-container {
  padding: 20px;
}

.toggle {
  width: 80px;
  height: 40px;
  background-color: #87CEEB;
  border-radius: 20px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.4s ease;
}

.toggle.night {
  background-color: #1a1a3e;
}

.toggle-circle {
  width: 32px;
  height: 32px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  top: 4px;
  left: 4px;
  transition: transform 0.4s ease;
}

.toggle.night .toggle-circle {
  transform: translateX(40px);
}
</style>
